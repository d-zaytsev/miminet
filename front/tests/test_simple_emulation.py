import pytest
from conftest import MiminetTester
from env.networks import MiminetTestNetwork, compare_nodes, compare_edges
from selenium.webdriver.common.by import By
from env.locators import Locator
from selenium.webdriver.common.keys import Keys


class TestSimpleEmulation:
    @pytest.fixture(scope="class")
    def network(self, selenium: MiminetTester):
        network = MiminetTestNetwork(selenium)

        host_button = selenium.find_element(
            By.CSS_SELECTOR, Locator.Network.DevicePanel.HOST["selector"]
        )

        network.add_node(host_button)
        network.add_node(host_button)

        # edge between hosts
        network.add_edge(network.nodes[0], network.nodes[1])

        # configure host 1
        config0 = network.open_node_config(network.nodes[0])
        config0.fill_link("192.168.1.1", 24)
        config0.add_job(
            1,
            {
                Locator.Network.ConfigPanel.Host.Job.PING_FIELD[
                    "selector"
                ]: "192.168.1.2"
            },
        )
        config0.submit()

        # configure host 2
        config1 = network.open_node_config(network.nodes[1])
        config1.fill_link("192.168.1.2", 24)
        config1.submit()

        yield network

        network.delete()

    def test_ping_emulation(self, selenium: MiminetTester, network: MiminetTestNetwork):
        assert compare_nodes(network.nodes, self.JSON_NODES)
        assert compare_edges(network.edges, self.JSON_EDGES)

    def test_ping_network_copy(
        self, selenium: MiminetTester, network: MiminetTestNetwork
    ):
        selenium.get(network.url)

        nodes = network.nodes
        edges = network.edges

        selenium.find_element(
            By.CSS_SELECTOR, Locator.Network.TopButton.COPY["selector"]
        ).click()
        selenium.wait_until_appear(By.XPATH, Locator.Network.MODAL_DIALOG["xpath"])

        selenium.find_element(
            By.XPATH, Locator.Network.ModalButton.GO_TO_EDITING["xpath"]
        ).click()

        copy_network = MiminetTestNetwork(selenium, selenium.current_url)

        assert selenium.current_url != network.url, "Redirecting wasn't completed"
        assert compare_nodes(nodes, copy_network.nodes)
        assert compare_edges(edges, copy_network.edges)

        selenium.get(network.url)

    JSON_NODES = {
        "classes": ["host"],
        "config": {"default_gw": "", "label": "host_1", "type": "host"},
        "data": {"id": "host_1", "label": "host_1"},
        "interface": [
            {
                "connect": "edge_m3x96snujpyaycfix1",
                "id": "iface_86881674",
                "ip": "192.168.1.1",
                "name": "iface_86881674",
                "netmask": 24,
            }
        ],
        "position": {"x": 58.537498474121094, "y": 99},
    }, {
        "classes": ["host"],
        "config": {"default_gw": "", "label": "host_2", "type": "host"},
        "data": {"id": "host_2", "label": "host_2"},
        "interface": [
            {
                "connect": "edge_m3x96snujpyaycfix1",
                "id": "iface_77541826",
                "ip": "192.168.1.2",
                "name": "iface_77541826",
                "netmask": 24,
            }
        ],
        "position": {"x": 158.5374984741211, "y": 111},
    }

    JSON_EDGES = [
        {
            "data": {
                "id": "edge_m3x96snujpyaycfix1",
                "source": "host_1",
                "target": "host_2",
            }
        }
    ]
