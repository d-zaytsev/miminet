class Locator:
    class NavigationButton:
        """Top buttons for navigating Miminet."""

        # "Мои сети"
        MY_NETWORKS_BUTTON = {"selector": "#my-networks-nav-item"}
        # "Примеры сетей"
        NETWORK_EXAMPLES_BUTTON = {"selector": "#examples-nav-item"}
        # "Тренажер"
        TRAINER_BUTTON = {"selector": "#trainer-nav-item"}
        # "Учебные курсы"
        TRAINING_COURSES_BUTTON = {"selector": "#courses-nav-item"}

    class MyNetworks:
        """User's networks page"""

        # "+ Новая сеть"
        NEW_NETWORK_BUTTON = {"selector": "#new-network-button"}

        @staticmethod
        def get_network_button_xpath(id: int):
            """XPATH for specific network from home page.
            Args:
                id (int): Position of network in networks list. Starts from 0."""
            assert id >= 0, "Network button can't have index less than 0."
            return f"/html/body/section/div/div/div[{id+2}]"

    class Network:
        """Specific network page."""

        # Panel where you can place network devices and connect them
        MAIN_PANEL = {"selector": "#network_scheme"}
        # Network device (or edge) configuration panel
        CONFIG_PANEL = {"selector": "#config_content"}
        # Modal dialog for user warnings
        MODAL_DIALOG = {"xpath": "/html/body/div[5]/div"}
        # "Эмулировать"
        EMULATE_BUTTON = {"selector": "#NetworkEmulateButton", "text": "Эмулировать"}
        # Pause animation button
        EMULATE_PLAYER_PAUSE_BUTTON = {"selector": "#NetworkPlayPauseButton"}
        # Network title
        TITLE_LABEL = {"selector": "#network_title_head"}

        class TopButton:
            """Data for identifying and locating top buttons of network interacting page."""

            # Network settings
            OPTIONS = {"selector": "#net-settings"}
            # Copy network
            COPY = {"selector": "#copy-network"}
            # Share network
            SHARE = {"selector": "#share-network"}

            class ModalButton:
                # Copy
                GO_TO_EDITING = {
                    "xpath": '//*[@id="ModalCopy"]/div/div/div[2]/button[1]'
                }
                # Delete
                DELETE_MODAL_BUTTON = {"selector": "#networkDeleteButton"}
                DELETE_SUBMIT_BUTTON = {"selector": "#networkDeleteSubmitButton"}

        class DevicePanel:
            """Panel with network devices."""

            SWITCH = {"selector": "#l2_switch_device", "device_class": "l2_switch"}
            HOST = {"selector": "#host_device", "device_class": "host"}
            HUB = {"selector": "#l1_hub_device", "device_class": "l1_hub"}
            ROUTER = {"selector": "#l3_router_device", "device_class": "l3_router"}
            SERVER = {"selector": "#server_device", "device_class": "server"}

        class ConfigPanel:
            """Elements in the configuration panel."""

            # *I use XPATH here because every config form has different selectors*
            # Network device name field
            CONFIG_NAME_FIELD = {
                "xpath": "/html/body/main/section/div/div/div[3]/form/div[1]/input"
            }
            DEFAULT_GATEWAY_FIELD = {
                "xpath": "/html/body/main/section/div/div/div[3]/form/div[5]/input"
            }
            # "Сохранить"
            SUBMIT_BUTTON = {
                "xpath": "/html/body/main/section/div/div/div[3]/form/button",
                "text": "Сохранить",
            }
            # "Выполнить команду"
            JOB_SELECT = {
                "xpath": "/html/body/main/section/div/div/div[3]/form/div[2]/select"
            }

            @staticmethod
            def get_ip_field_xpath(id: int = 0):
                """XPATH for specific ip address from config panel.
                Args:
                    id (int): Position of link in links list. Starts from 0."""
                assert id >= 0, "IP field can't have index less than 0."
                return f"/html/body/main/section/div/div/div[3]/form/div[4]/input[{1 + id * 2}]"

            @staticmethod
            def get_mask_field_xpath(id: int = 0):
                """XPATH for specific subnet mask from config panel.
                Args:
                    id (int): Position of link in links list. Starts from 0."""
                assert id >= 0, "Subnet mask field can't have index less than 0."
                return f"/html/body/main/section/div/div/div[3]/form/div[4]/input[{2 + id*2}]"

            class Job:
                """Jobs fields."""

                PING_FIELD = {"selector": "#config_host_ping_c_1_ip"}
                PING_OPTION_FIELD = {
                    "selector": "#config_host_ping_with_options_options_input_field"
                }
                PING_OPTION_IP_FIELD = {
                    "selector": "#config_host_ping_with_options_ip_input_field"
                }


DEVICE_BUTTON_SELECTORS = [
    Locator.Network.DevicePanel.SWITCH["selector"],
    Locator.Network.DevicePanel.HOST["selector"],
    Locator.Network.DevicePanel.HUB["selector"],
    Locator.Network.DevicePanel.ROUTER["selector"],
    Locator.Network.DevicePanel.SERVER["selector"],
]
DEVICE_BUTTON_CLASSES = [
    Locator.Network.DevicePanel.SWITCH["device_class"],
    Locator.Network.DevicePanel.HOST["device_class"],
    Locator.Network.DevicePanel.HUB["device_class"],
    Locator.Network.DevicePanel.ROUTER["device_class"],
    Locator.Network.DevicePanel.SERVER["device_class"],
]
