$('#config_host').load("/config_host.html");
$('#config_hub').load("/config_hub.html");
$('#config_switch').load("/config_switch.html");
$('#config_edge').load("/config_edge.html");
$('#config_router').load("/config_router.html");
$('#config_server').load("/config_server.html");
$('#config_vlan').load("/config_vlan.html");
$('#config_vxlan').load("/config_vxlan.html");

const config_content_id = "#config_content";
const config_main_form_id = "#config_main_form";
const config_router_main_form_id = "#config_router_main_form";
const config_server_main_form_id = "#config_server_main_form";
const config_hub_main_form_id = "#config_hub_main_form";
const config_switch_main_form_id = "#config_switch_main_form";
const config_edge_main_form_id = "#config_edge_main_form";
const config_content_save_tag = "#config_content_save";
const config_content_save_id = "config_content_save";

const ClearConfigForm = function (text) {

    let txt = ''

    if (!text) {
        txt = 'Тут будут настройки устройств. Выделите любое на схеме.';
    }

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();
    $(config_content_id).append('<span>' + txt + '</span>');
    document.getElementById(config_content_save_id).style.display='none';
}

const HostWarningMsg = function (msg) {

    let warning_msg = '<div class="alert alert-info alert-dismissible fade show" role="alert">' +
        msg + '<button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button></div>';

    $(config_content_id).prepend(warning_msg);
}

const ServerWarningMsg = function (msg) {

    let warning_msg = '<div class="alert alert-info alert-dismissible fade show" role="alert">' +
        msg + '<button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button></div>';

    $(config_content_id).prepend(warning_msg);
}

const ConfigHostForm = function(host_id){
    var form = document.getElementById('config_host_main_form_script').innerHTML;
    var button = document.getElementById('config_host_save_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();

    document.getElementById(config_content_save_id).style.display='block';

    // Add new form
    $(config_content_id).append(form);
    $(config_content_save_tag).append(button);

    // Set host_id
    $('#host_id').val(host_id);
    $('#net_guid').val(network_guid);

    function handleHostClick(event) {
        event.preventDefault();
        let data = $('#config_main_form').serialize();

        // Disable all input fields
        $("#config_main_form :input").prop("disabled", true);

        // Set loading spinner
        $('#config_host_main_form_submit_button').text('');
        $('#config_host_main_form_submit_button').append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ps-3">Сохранение...</span>');

        UpdateHostConfiguration(data, host_id);
    }

    $('#config_host_main_form_submit_button, #config_host_end_form').on('click', handleHostClick);
}

const ConfigRouterForm = function (router_id) {
    var form = document.getElementById('config_router_main_form_script').innerHTML;
    var button = document.getElementById('config_router_save_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();

    document.getElementById(config_content_save_id).style.display='block';

    // Add new form
    $(config_content_id).append(form);
    $(config_content_save_tag).append(button);

    // Set host_id
    $('#router_id').val(router_id);
    $('#net_guid').val(network_guid);

    function handleRouterClick(event) {
        event.preventDefault();
        let data = $('#config_main_form').serialize();

        // Disable all input fields
        $("#config_main_form :input").prop("disabled", true);

        // Set loading spinner
        $('#config_router_main_form_submit_button').text('');
        $('#config_router_main_form_submit_button').append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ps-3">Сохранение...</span>');

        UpdateRouterConfiguration(data, router_id);
    }

    $('#config_router_main_form_submit_button, #config_router_end_form').on('click', handleRouterClick);
}

const ConfigServerForm = function (server_id) {
    var form = document.getElementById('config_server_main_form_script').innerHTML;
    var button = document.getElementById('config_server_save_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();

    document.getElementById(config_content_save_id).style.display='block';

    // Add new form
    $(config_content_id).append(form);
    $(config_content_save_tag).append(button);

    // Set host_id
    $('#server_id').val(server_id);
    $('#net_guid').val(network_guid);

    function handleServerClick(event) {
        event.preventDefault();
        let data = $('#config_main_form').serialize();

        // Disable all input fields
        $("#config_main_form :input").prop("disabled", true);

        // Set loading spinner
        $('#config_server_main_form_submit_button').text('');
        $('#config_server_main_form_submit_button').append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ps-3">Сохранение...</span>');

        UpdateServerConfiguration(data, server_id);
    }

    $('#config_server_main_form_submit_button, #config_server_end_form').on('click', handleServerClick);
}

const ConfigHubForm = function (hub_id) {
    var form = document.getElementById('config_hub_main_form_script').innerHTML;
    var button = document.getElementById('config_hub_save_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();

    document.getElementById(config_content_save_id).style.display='block';

    // Add new form
    $(config_content_id).append(form);
    $(config_content_save_tag).append(button);

    // Set host_id
    $('#hub_id').val(hub_id);
    $('#net_guid').val(network_guid);

    function handleHubClick(event) {
        event.preventDefault();
        let data = $('#config_hub_main_form').serialize();

        // Disable all input fields
        $("#config_hub_main_form :input").prop("disabled", true);

        // Set loading spinner
        $('#config_hub_main_form_submit_button').text('');
        $('#config_hub_main_form_submit_button').append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ps-3">Сохранение...</span>');

        UpdateHubConfiguration(data, hub_id);
    }

    $('#config_hub_main_form_submit_button, #config_hub_end_form').on('click', handleHubClick);
}

const ConfigSwitchForm = function (switch_id) {
    var form = document.getElementById('config_switch_main_form_script').innerHTML;
    var button = document.getElementById('config_switch_save_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();

    document.getElementById(config_content_save_id).style.display='block';

    // Add new form
    $(config_content_id).append(form);
    $(config_content_save_tag).append(button);

    // Add href for mimishark
    // var url = "/MimiShark?guid="+network_guid
    // $(needhref).attr('href',url)

    // Set host_id
    $('#switch_id').val(switch_id);
    $('#net_guid').val(network_guid);

    function handleSwitchClick(event) {
        $("#config_switch_main_form [name='config_rstp_stp']").val($('#config_button_rstp').val());
        event.preventDefault();
        let data = $('#config_switch_main_form').serialize();

        // Disable all input fields
        $("#config_switch_main_form :input").prop("disabled", true);

        // Set loading spinner
        $('#config_switch_main_form_submit_button').text('');
        $('#config_switch_main_form_submit_button').append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ps-3">Сохранение...</span>');

        UpdateSwitchConfiguration(data, switch_id);
    }

    $('#config_switch_main_form_submit_button, #config_switch_end_form').on('click', handleSwitchClick);
}

const ConfigEdgeForm = function (edge_id) {
    let edgeSaveXHR = null;
    var form = document.getElementById('config_edge_main_form_script').innerHTML;
    var button = document.getElementById('config_edge_save_script').innerHTML;


    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();

    document.getElementById(config_content_save_id).style.display='block';

    // Add new form
    $(config_content_id).append(form);
    $(config_content_save_tag).append(button);

    // Set host_id
    $('#edge_id').val(edge_id);
    $('#net_guid').val(network_guid);

    function handleEdgeClick(event) {
        event.preventDefault();

        if (edgeSaveXHR) {
            edgeSaveXHR.abort();
        }

        let data = $('#config_edge_main_form').serialize();
        const edge = edges.find(e => e.data.id === edge_id);
        console.log(edge);
        const lossValue = $("#edge_loss").val();

        if (edge)
            edge.data.loss_percentage = lossValue;

        const inputsToDisable = $('#edge_loss, #config_edge_main_form_submit_button');
        inputsToDisable.prop("disabled", true);

        $('#config_edge_main_form_submit_button').html(
            '<span class="spinner-border spinner-border-sm" role="status"></span> Сохранение...'
        );

        edgeSaveXHR = UpdateEdgeConfiguration(data);
        inputsToDisable.prop("disabled", false);
    }

    $('#config_edge_main_form_submit_button, #config_edge_end_form').off('click').on('click', handleEdgeClick);
}

const ConfigHubName = function (hostname) {

    var text = document.getElementById('config_hub_name_script').innerHTML;

    $(config_hub_main_form_id).prepend((text));
    $('#config_hub_name').val(hostname);
}

const ConfigEdgePercentage = function (edge_loss) {

    var text = document.getElementById('config_edge_save_loss_script').innerHTML;

    $(config_edge_main_form_id).prepend(text);
    $('#edge_loss').val(edge_loss);
}

const ConfigEdgeEndpoints = function (edge_source, edge_target) {

    var text = document.getElementById('config_edge_edpoint_script').innerHTML;

    $(config_edge_main_form_id).prepend((text));
    $('#edge_source').val(edge_source);
    $('#edge_target').val(edge_target);
}

const ConfigSwitchName = function (hostname) {

    var text = document.getElementById('config_switch_name_script').innerHTML;

    $(config_switch_main_form_id).prepend((text));
    $('#switch_name').val(hostname);
}

const ConfigSwtichSTP = function (stp) {
    var elem = document.getElementById('config_switch_checkbox_stp_script');

    $(elem.innerHTML).insertBefore('#config_switch_end_form');

    if (stp === 1) {
        $('#config_switch_stp').attr('checked', 'checked');
    }

    var warning_text = document.getElementById('config_switch_warning_stp_script').innerHTML;
    $('#config_switch_stp').on('click', function () {
        if ($(this).is(':checked')) {
            $(warning_text).insertBefore('#config_switch_end_form');
        } else {
            $('#config_warning_stp').remove();
        }
    });
}

const ConfigSwtichRSTP = function (rstp) {
    var elem = document.getElementById('config_switch_checkbox_rstp_script');

    $(elem.innerHTML).insertBefore('#config_switch_end_form');

    if (rstp === 1) {
        $('#config_switch_rstp').attr('checked', 'checked');
    }

    var warning_text = document.getElementById('config_switch_warning_rstp_script').innerHTML;
    $('#config_switch_rstp').on('click', function () {
        if ($(this).is(':checked')) {
            $(warning_text).insertBefore('#config_switch_end_form');
        } else {
            $('#config_warning_rstp').remove();
        }
    });
}

const SharedConfigHostForm = function(host_id){
    var form = document.getElementById('config_host_main_form_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();
    document.getElementById(config_content_save_id).style.display='none';

    // Add new form
    $(config_content_id).append(form);

    // Set host_id
    $('#host_id').val( host_id );
    $('#net_guid').val( network_guid );
    $('#config_host_main_form_submit_button').prop('disabled', true);
}

const SharedConfigRouterForm = function (router_id) {
    var form = document.getElementById('config_router_main_form_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();
    document.getElementById(config_content_save_id).style.display='none';

    // Add new form
    $(config_content_id).append(form);

    // Set host_id
    $('#router_id').val(router_id);
    $('#net_guid').val(network_guid);

    $('#config_router_main_form_submit_button').prop('disabled', true);
}

const SharedConfigServerForm = function (router_id) {
    var form = document.getElementById('config_server_main_form_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();
    document.getElementById(config_content_save_id).style.display='none';

    // Add new form
    $(config_content_id).append(form);

    // Set host_id
    $('#router_id').val(router_id);
    $('#net_guid').val(network_guid);

    $('#config_server_main_form_submit_button').prop('disabled', true);
}

const SharedConfigHubForm = function (hub_id) {
    var form = document.getElementById('config_hub_main_form_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();
    document.getElementById(config_content_save_id).style.display='none';

    // Add new form
    $(config_content_id).append(form);
    $('#config_hub_main_form_submit_button').prop('disabled', true);
}

const SharedConfigSwitchForm = function (switch_id) {
    var form = document.getElementById('config_switch_main_form_script').innerHTML;

    // Clear all child
    $(config_content_id).empty();
    $(config_content_save_tag).empty();
    document.getElementById(config_content_save_id).style.display='none';

    // Add new form
    $(config_content_id).append(form);
    $('#config_switch_main_form_submit_button').prop('disabled', true);
}

const ConfigHostName = function (hostname) {

    var text = document.getElementById('config_host_name_script').innerHTML;

    $(config_main_form_id).prepend((text));
    $('#config_host_name').val(hostname);
}

const ConfigRouterName = function (hostname) {

    var text = document.getElementById('config_router_name_script').innerHTML;

    $(config_main_form_id).prepend((text));
    $('#config_router_name').val(hostname);
}

const ConfigServerName = function (hostname) {

    var text = document.getElementById('config_server_name_script').innerHTML;

    $(config_main_form_id).prepend((text));
    $('#config_server_name').val(hostname);
}

const ConfigItemInterface = function (name, ip, netmask, connected_to, item) {

    let conf_item = 'config_' + item;
    let elem = document.getElementById(conf_item + '_interface_script');
    let eth = jQuery.extend({}, elem);

    if (!name) {
        return;
    }

    let ids = ["_iface_name_label_", "_iface_name_", "_ip_", "_mask_"];
    ids.forEach(function (id) {
        eth.innerHTML = eth.innerHTML.replace(RegExp(conf_item + id + 'example', "g"), conf_item + id + name);
    });

    let tag = '#' + conf_item;
    let text = eth.innerHTML;
    $(text).insertBefore(tag + '_end_form');

    $('<input type="hidden" name="' + conf_item + '_iface_ids[]" value="' + name + '"/>').insertBefore(tag + ids[1] + name);
    $(tag + ids[1] + name).attr("placeholder", connected_to);
    $(tag + ids[2] + name).val(ip);
    $(tag + ids[3] + name).val(netmask);

    if (Array.isArray(pcaps) && pcaps.includes(name)) {
        $(tag + '_iface_name_label_' + name).html('Линк к (<a href="/' + item + '/mimishark?guid=' + network_guid + '&iface=' + name + '" target="_blank">pcap</a>)');
    } else {
        console.warn('pcaps не определен или не является массивом:', pcaps);
    }
}

const ConfigHostInterface = function (name, ip, netmask, connected_to) {
    ConfigItemInterface(name, ip, netmask, connected_to, "host");
}

const ConfigRouterInterface = function (name, ip, netmask, connected_to) {
    ConfigItemInterface(name, ip, netmask, connected_to, "router");
}

const ConfigServerInterface = function (name, ip, netmask, connected_to) {
    ConfigItemInterface(name, ip, netmask, connected_to, "server");
}

const ConfigHubInterface = function (name, ip, netmask, connected_to) {
    ConfigItemInterface(name, ip, netmask, connected_to, "hub");
}

const ConfigSwitchInterface = function (name, ip, netmask, connected_to) {
    ConfigItemInterface(name, ip, netmask, connected_to, "switch");
}

const ConfigItemIndent = function (item) {
    let conf_item = 'config_' + item
    let text = document.getElementById(conf_item + '_indent_script').innerHTML;
    $(text).insertBefore('#' + conf_item + '_end_form');
}

const ConfigHubIndent = function () {
    ConfigItemIndent("hub");
}

const ConfigSwitchIndent = function () {
    ConfigItemIndent("switch");
}

const ConfigHostJobOnChange = function (evnt) {

    let elem = null;
    let host_job_list = null;

    switch (evnt.target.value) {
        case '1':
            elem = document.getElementById('config_host_ping_c_1_script').innerHTML;
            host_job_list = document.getElementById('config_host_job_list');

            if (!elem || !host_job_list) {
                return;
            }

            $('div[name="config_host_select_input"]').remove();
            $(elem).insertBefore(host_job_list);
            break;

        case '2':
            elem = document.getElementById('config_host_ping_with_options_script').innerHTML;
            host_job_list = document.getElementById('config_host_job_list');

            if (!elem || !host_job_list) {
                return;
            }

            $('div[name="config_host_select_input"]').remove();
            $(elem).insertBefore(host_job_list);
            break;

        case '3':
            elem = document.getElementById('config_host_send_udp_data_script').innerHTML;
            host_job_list = document.getElementById('config_host_job_list');

            if (!elem || !host_job_list) {
                return;
            }

            $('div[name="config_host_select_input"]').remove();
            $(elem).insertBefore(host_job_list);
            break;

        case '4':
            elem = document.getElementById('config_host_send_tcp_data_script').innerHTML;
            host_job_list = document.getElementById('config_host_job_list');

            if (!elem || !host_job_list) {
                return;
            }

            $('div[name="config_host_select_input"]').remove();
            $(elem).insertBefore(host_job_list);
            break;

        case '5':
            elem = document.getElementById('config_host_traceroute_with_options_script').innerHTML;
            host_job_list = document.getElementById('config_host_job_list');

            if (!elem || !host_job_list) {
                return;
            }

            $('div[name="config_host_select_input"]').remove();
            $(elem).insertBefore(host_job_list);
            break;

        case '102':
            elem = document.getElementById('config_host_add_route_script').innerHTML;
            host_job_list = document.getElementById('config_host_job_list');

            if (!elem || !host_job_list) {
                return;
            }

            $('div[name="config_host_select_input"]').remove();
            $(elem).insertBefore(host_job_list);
            break;

        case '103':
            elem = document.getElementById('config_host_add_arp_cache_script').innerHTML;
            host_job_list = document.getElementById('config_host_job_list');

            if (!elem || !host_job_list) {
                return;
            }

            $('div[name="config_host_select_input"]').remove();
            $(elem).insertBefore(host_job_list);
            break;

        case '0':
            $('div[name="config_host_select_input"]').remove();
            break;

        default:
            console.log("Unknown target.value");
    }

}

const ConfigHostJob = function (host_jobs, shared = 0) {

    let elem = document.getElementById('config_host_job_script').innerHTML;
    let host_id = document.getElementById('host_id');

    if (!elem || !host_id) {
        return;
    }

    $(elem).insertBefore(host_id);

    // Set onchange
    document.getElementById('config_host_job_select_field').addEventListener('change', ConfigHostJobOnChange);

    elem = document.getElementById('config_host_job_list_script').innerHTML;
    if (!elem) {
        return;
    }

    $(elem).insertBefore(host_id);

    // Print jobs if we have
    if (!host_jobs) {
        return;
    }

    $.each(host_jobs, function (i) {
        let jid = host_jobs[i].id;

        if (i == 0) {
            $('#config_host_job_list').append('<label class="text-sm">Команды</label>');
        }

        elem = document.getElementById('config_host_job_list_elem_script');

        if (!elem) {
            return;
        }

        let job_elem = jQuery.extend({}, elem);
        job_elem.innerHTML = job_elem.innerHTML.replace(/config_host_job_delete/g, 'config_host_job_delete_' + jid);
        job_elem.innerHTML = job_elem.innerHTML.replace(/justify-content-between align-items-center\">/, 'justify-content-between align-items-center\"><small>' + host_jobs[i].print_cmd + '</small>');

        let text = job_elem.innerHTML;
        //$(text).insertBefore(host_id);
        $('#config_host_job_list').append(text);

        $('#config_host_job_delete_' + jid).click(function (event) {
            event.preventDefault();
            if (!shared) {
                DeleteJobFromHost(host_id.value, jid, network_guid);
            }
        });

    });
}

const ConfigHostGateway = function (gw) {

    var text = document.getElementById('config_host_default_gw_script').innerHTML;

    $(text).insertBefore('#config_host_end_form');
    $('#config_host_default_gw').val(gw);
}

const ConfigRouterGateway = function (gw) {

    var text = document.getElementById('config_router_default_gw_script').innerHTML;

    $(text).insertBefore('#config_router_end_form');
    $('#config_router_default_gw').val(gw);
}

const ConfigServerGateway = function (gw) {

    var text = document.getElementById('config_server_default_gw_script').innerHTML;

    $(text).insertBefore('#config_server_end_form');
    $('#config_server_default_gw').val(gw);
}

const ConfigRouterJobOnChange = function(evnt) {

    switch (evnt.target.value) {
        case '0':
            $('div[name="config_router_select_input"]').remove();

            break;
        case '1':
            UpdateRouterForm('config_router_ping_c_1_script');
        
            break;
        case '100':
            UpdateRouterForm('config_router_add_ip_mask_script');
            FillRouterSelect("#config_router_add_ip_mask_iface_select_field", "Выберите линк", false);
        
            break;
        case '101':
            UpdateRouterForm('config_router_add_nat_masquerade_script');
            FillRouterSelect("#config_router_add_nat_masquerade_iface_select_field", "Выберите линк", false);

            break;
        case '102':
            UpdateRouterForm('config_router_add_route_script');

            break;  
        case '104':
            UpdateRouterForm('config_router_add_subinterface_script');
            FillRouterSelect("#config_router_add_subinterface_iface_select_field", "Выберите линк" ,false);

            break;
        case '105':
            UpdateRouterForm('config_router_add_ipip_tunnel_script');
            FillRouterSelect("#config_router_add_ipip_tunnel_iface_select_ip_field");

            break;
        case '106':
            UpdateRouterForm('config_router_add_gre_interface_script');
            FillRouterSelect("#config_router_add_gre_interface_select_ip_field");

            break;
        case '107':
            UpdateRouterForm('config_router_add_arp_proxy_script');
            FillRouterSelect("#config_router_add_arp_proxy_iface_select_field", "Выберите линк", false);

            break;
        default:
            console.log("Unknown target.value");
    }
}

const ConfigRouterJob = function (router_jobs, shared = 0) {

    let elem = document.getElementById('config_router_job_script').innerHTML;
    let router_id = document.getElementById('router_id');

    if (!elem || !router_id) {
        return;
    }

    $(elem).insertBefore(router_id);

    // Set onchange
    document.getElementById('config_router_job_select_field').addEventListener('change', ConfigRouterJobOnChange);

    elem = document.getElementById('config_router_job_list_script').innerHTML;
    if (!elem) {
        return;
    }

    $(elem).insertBefore(router_id);

    // Print jobs if we have
    if (!router_jobs) {
        return;
    }

    $.each(router_jobs, function (i) {
        let jid = router_jobs[i].id;

        if (i == 0) {
            $('#config_router_job_list').append('<label class="text-sm">Команды</label>');
        }

        elem = document.getElementById('config_router_job_list_elem_script');

        if (!elem) {
            return;
        }

        let job_elem = jQuery.extend({}, elem);
        job_elem.innerHTML = job_elem.innerHTML.replace(/config_router_job_delete/g, 'config_router_job_delete_' + jid);
        job_elem.innerHTML = job_elem.innerHTML.replace(/justify-content-between align-items-center\">/, 'justify-content-between align-items-center\"><small>' + router_jobs[i].print_cmd + '</small>');

        let text = job_elem.innerHTML;
        //$(text).insertBefore(host_id);
        $('#config_router_job_list').append(text);

        $('#config_router_job_delete_' + jid).click(function (event) {
            event.preventDefault();
            if (!shared) {
                DeleteJobFromRouter(router_id.value, jid, network_guid);
            }
        });
    });
}

const ConfigServerJob = function (server_jobs, shared = 0) {

    let elem = document.getElementById('config_server_job_script').innerHTML;
    let server_id = document.getElementById('server_id');

    if (!elem || !server_id) {
        return;
    }

    $(elem).insertBefore(server_id);

    // Set onchange
    document.getElementById('config_server_job_select_field').addEventListener('change', ConfigServerJobOnChange);

    elem = document.getElementById('config_server_job_list_script').innerHTML;
    if (!elem) {
        return;
    }

    $(elem).insertBefore(server_id);

    // Print jobs if we have
    if (!server_jobs) {
        return;
    }

    $.each(server_jobs, function (i) {
        let jid = server_jobs[i].id;

        if (i == 0) {
            $('#config_server_job_list').append('<label class="text-sm">Команды</label>');
        }

        elem = document.getElementById('config_server_job_list_elem_script');

        if (!elem) {
            return;
        }

        let job_elem = jQuery.extend({}, elem);
        job_elem.innerHTML = job_elem.innerHTML.replace(/config_server_job_delete/g, 'config_server_job_delete_' + jid);
        job_elem.innerHTML = job_elem.innerHTML.replace(/justify-content-between align-items-center\">/, 'justify-content-between align-items-center\"><small>' + server_jobs[i].print_cmd + '</small>');

        let text = job_elem.innerHTML;
        //$(text).insertBefore(host_id);
        $('#config_server_job_list').append(text);

        $('#config_server_job_delete_' + jid).click(function (event) {
            event.preventDefault();

            if (!shared) {
                DeleteJobFromServer(server_id.value, jid, network_guid);
            }

        });
    });
}

const ConfigServerJobOnChange = function (evnt) {

    let elem = null;
    let server_job_list = null;
    let n = null;
    let server_id = null;

    switch (evnt.target.value) {
        case '0':
            $('div[name="config_server_select_input"]').remove();
            break;

        case '1':
            elem = document.getElementById('config_server_ping_c_1_script').innerHTML;
            server_job_list = document.getElementById('config_server_job_list');

            if (!elem || !server_job_list) {
                return;
            }

            $('div[name="config_server_select_input"]').remove();
            $(elem).insertBefore(server_job_list);
            break;

        case '200':
            elem = document.getElementById('config_server_start_udp_server_script').innerHTML;
            server_job_list = document.getElementById('config_server_job_list');

            if (!elem || !server_job_list) {
                return;
            }

            $('div[name="config_server_select_input"]').remove();
            $(elem).insertBefore(server_job_list);
            break;

        case '201':
            elem = document.getElementById('config_server_start_tcp_server_script').innerHTML;
            server_job_list = document.getElementById('config_server_job_list');

            if (!elem || !server_job_list) {
                return;
            }

            $('div[name="config_server_select_input"]').remove();
            $(elem).insertBefore(server_job_list);
            break;

        case '202':
            elem = document.getElementById('config_server_block_tcp_udp_port_script').innerHTML;
            server_job_list = document.getElementById('config_server_job_list');

            if (!elem || !server_job_list) {
                return;
            }

            $('div[name="config_server_select_input"]').remove();
            $(elem).insertBefore(server_job_list);
            break;

        default:
            console.log("Unknown target.value");
    }

}

const DisableFormInputs = function () {
    let s = config_content_id + ' :input';
    $(s).prop("disabled", true);
    $(config_content_save_tag + ' :input').prop("disabled", true);
}

const DisableVLANInputs = function (n) {
    var modalId = 'VlanModal_' + n.data.id;

    $(document).ready(function () {
        $('#config_button_vlan').prop('disabled', false);
        $('#' + modalId + ' :input').not('.btn-close').prop('disabled', true);
        $('#' + modalId + ' .form-check-input, ' + modalId + ' .form-switch input').prop('disabled', true);
    });
};

const UpdateRouterForm = function(name) {
    /**
     * Replace old form with new one
     */
    elem = document.getElementById(name).innerHTML;
    router_job_list = document.getElementById('config_router_job_list');

    if (!elem || !router_job_list){
        return;
    }

    $('div[name="config_router_select_input"]').remove();
    $(elem).insertBefore(router_job_list);
}

const FillRouterSelect = function(select_id, field_msg = 'Интерфейс начальной точки', return_ip = true) {
    /**
    * Fill select element with network hosts.
    * @param  {String} select_id ID(name) of the element to which you need to add data.
    * @param  {String} field_msg Message that will be displayed in the select list by default.
    * @param  {Boolean} return_ip True if replace user's input with ip and False if replace it with element's id.
   */

    // configured router id
    router_id = $('#router_id')[0].value;

    if (!router_id) {
        console.log("Не нашел router_id");
        return
    }

    router_node = nodes.find(n => n.data.id === router_id);
    
    if (!router_node) {
        console.log("Не нашел router_node");
        return;
    }

    if (!router_node.interface.length) {
        $(select_id).append('<option selected value="0">Мало интерфейсов</option>');
        return;
    } else {
        $(select_id).append(`<option selected value="0">${field_msg}</option>`);
    }

    $(select_id).on('change', function () {
        let selectedOption = $(this).find('option:selected'); // Получаем выбранный элемент
        let selectedLabel = selectedOption.text(); // Получаем текст выбранного элемента
        document.getElementById('router_connection_host_label_hidden').value = selectedLabel; // Записываем его в скрытое поле
    });

    router_node.interface.forEach(function(iface) {
        // iterating over the router interfaces

        let iface_id = iface.id;
        let iface_ip = iface.ip;

        if (!iface_id || (return_ip && !iface_ip)) {
            console.log("Не нашел ip/id у интерфейса");
            return;
        }

        let connect_id = iface.connect;
        if (!connect_id) {
            console.log("Не нашел подключение у интерфейса");
            return;
        }

        let edge = edges.find(e => e.data.id === connect_id);

        if (!edge) {
            console.log("Не нашел ребро по подключению интерфейса");
            return;
        }

        let edge_source = edge.data.source;
        let edge_target = edge.data.target;

        if (!edge_source || !edge_target) {
            console.log("Не получилось найти target и source у ребра");
            return;
        }

        let router_connection = (router_node.data.id === edge_target) ? edge_source : edge_target;

        let router_connection_host_node = nodes.find(n => n.data.id === router_connection);
        let router_connection_host_label = (router_connection_host_node) ? router_connection_host_node.data.label : "Unknown";

        $(select_id).append('<option value="' + (return_ip ? iface_ip : iface_id) + '">' + router_connection_host_label + '</option>');

    });
}

const DisableVXLANInputs = function (n) {
    var modalId = 'VxlanConfigModal' + n.data.id;

    $(document).ready(function () {
        $('#config_button_vxlan').prop('disabled', false);
        $('#' + modalId + ' :input').not('.btn-close').prop('disabled', true);
        $('#' + modalId + ' .form-check-input, #' + modalId + ' .form-switch input').prop('disabled', true);
        $('<style>')
            .prop('type', 'text/css')
            .html(`
        .network-interface .btn-danger,
        .client-interface .btn-danger {
            display: none !important;
        }
    `)
            .appendTo('head');

        $('#' + modalId).off('hidden.bs.modal.myNamespace');
    });
};
