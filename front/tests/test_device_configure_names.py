import pytest
from conftest import MiminetTester
from env.locators import DEVICE_BUTTON_CLASSES
from env.networks import MiminetTestNetwork


class TestDeviceNameChange:
    @pytest.fixture(scope="class")
    def network(self, selenium: MiminetTester):
        network = MiminetTestNetwork(selenium)
        network.scatter_devices()

        yield network

        network.delete()

    @pytest.mark.parametrize(
        "device_class",
        (DEVICE_BUTTON_CLASSES),
    )
    def test_device_name_change(
        self,
        selenium: MiminetTester,
        network: MiminetTestNetwork,
        device_class: str,
    ):
        """Just change the name of the device"""
        selenium.get(network.url)

        # get first node
        device_node = network.get_nodes_by_class(device_class)[0]
        config = network.open_node_config(device_node)

        # change device name
        new_device_name = "new name!"
        config.change_name(new_device_name)

        # save data
        config.submit()

        # check that name has been updated
        device_node = network.get_nodes_by_class(device_class)[0]

        assert (
            device_node["config"]["label"] == new_device_name
            and config.name == new_device_name
        ), "Failed to change device name."

    @pytest.mark.parametrize(
        "device_class",
        (DEVICE_BUTTON_CLASSES),
    )
    def test_device_name_change_to_long(
        self,
        selenium: MiminetTester,
        network: MiminetTestNetwork,
        device_class: str,
    ):
        """Change device name to long string and checks if it has been cut"""
        device_node = network.get_nodes_by_class(device_class)[0]
        config = network.open_node_config(device_node)

        # change device name
        new_device_name = "a" * 100  # long name
        config.change_name(new_device_name)

        # save changes
        config.submit()
        device_node = network.get_nodes_by_class(device_class)[0]

        # check that the name was cut off
        assert (
            device_node["config"]["label"] != new_device_name
            and new_device_name != config.name
        ), "The device name isn't limited in size."
