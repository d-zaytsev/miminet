import pytest
import requests
from requests import Session
from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains


class environment_setting:
    domain = "localhost"
    chrome_driver_path = "/usr/local/bin/chromedriver"
    window_size = "1920,1080"
    auth_data = {"email": "selenium-email", "password": "password"}


MAIN_PAGE = f"http://{environment_setting.domain}"
HOME_PAGE = f"{MAIN_PAGE}/home"


class MiminetTester(Chrome):
    """
    Extends the selenium.webdriver.Chrome class,
    adding new methods for convenient element interaction.
    """

    def wait_and_click(self, by: By, element: str, timeout=20):
        """
        Waits for the specified element to become clickable before clicking it.

        Args:
            by (By): The locator strategy (e.g., By.ID, By.XPATH).
            element (str): The element locator (e.g., "myElementId", "//button[text()='Click Me']").
            timeout (int): The maximum time in seconds to wait for the element to become clickable (default: 20).
        """
        WebDriverWait(self, timeout).until(
            EC.element_to_be_clickable((by, element))
        ).click()

    def drag_and_drop(self, source: WebElement, target: WebElement, x: int, y: int):
        """Performs a drag-and-drop action from a source element to a target element.

        Args:
            source (WebElement): The source element to be dragged.
            target (WebElement): The target element to drop the source element onto.
            x (int): The x-offset to move to.
            y (int): The y-offset to move to.
        """
        actions_chain = ActionChains(self)

        actions_chain.click_and_hold(source)
        actions_chain.move_to_element_with_offset(target, x, y)
        actions_chain.release()
        actions_chain.perform()

    def wait_until_appear(self, by: By, element: str, timeout=20):
        WebDriverWait(self, timeout).until(
            EC.visibility_of_element_located((by, element))
        )

    def wait_until_disappear(self, by: By, element: str, timeout=20):
        web_element = self.find_element(by, element)

        WebDriverWait(self, timeout).until(EC.invisibility_of_element(web_element))

    def wait_until_text(self, by: By, element: str, text: str, timeout=20):
        """Wait until text appears in element"""
        WebDriverWait(self, timeout).until(
            EC.text_to_be_present_in_element((by, element), text)
        )

    def wait_for(self, condition, timeout=20):
        WebDriverWait(self, timeout=timeout).until(lambda _: condition)

    def select_by_value(self, by: By, element: str, value: int):
        select = Select(self.find_element(by, element))
        select.select_by_value(str(value))


@pytest.fixture(scope="session")
def chrome_driver():
    """Headless WebBrowser instance for testing (authorization here is not passed)."""
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=%s" % environment_setting.window_size)
    chrome_options.add_argument("--no-sandbox")

    service = Service(environment_setting.chrome_driver_path)

    webdriver.Remote("http://selenium:4444/wd/hub", options=chrome_options)
    tester = MiminetTester(service=service, options=chrome_options)

    yield tester

    tester.close()
    tester.quit()


@pytest.fixture(scope="session")
def requester():
    """Request session, used to send requests (GET, POST, etc...) and process their results.

    **[!]** Selenium is much slower than Requester! If you can test something by just making a request, without using Selenium, do it.
    """

    # Send a POST request to the http://XXXX.YY/auth/login.html
    # perform authorization with this and save cookies in session
    # use these cookies for other requests!

    session = requests.Session()

    response = session.get(MAIN_PAGE)

    if response.status_code != 200:
        raise Exception(
            "Miminet is not running or its address is incorrect: unable to get home page!"
        )

    response = session.post(
        f"{MAIN_PAGE}//auth/login.html",
        data=environment_setting.auth_data,
    )

    if response.status_code != 200:
        raise Exception("Unable to send authorization request!")

    yield session

    session.close()


@pytest.fixture(scope="session")
def selenium(chrome_driver: MiminetTester, requester: Session):
    chrome_driver.get(MAIN_PAGE)
    cookies = requester.cookies

    for cookie in cookies:
        if cookie.name and cookie.value and cookie.expires:
            selenium_cookie = {
                "domain": environment_setting.domain,
                "expiry": cookie.expires,
                "httpOnly": False,
                "name": cookie.name,
                "path": "/",
                "sameSite": "Lax",
                "secure": False,
                "value": cookie.value,
            }
            chrome_driver.add_cookie(selenium_cookie)

    # return configured chrome driver
    return chrome_driver
