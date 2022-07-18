//$(function () {

    ////210407__1829 Fase 1 Carga clientes
    //$.get("CargaClientesCredito", function (data) {
    //    crearListadoClientesCredito(data)
    //});

//});

/**
 * 210407_1030 Evitar nombre de Columnas en codigo Duro
 * @param {any} arrayColumnas se omite nombres de Columnas
 * @param {any} data    Solamente aceptamos data
 */
function crearListadoClientesCredito(data) {
    //alert(data);
    var contenido = "";
    var dataset = JSON.parse(data);
    //alert(JSON.stringify(dataset));
    contenido += "<table id='TableClientesCredito' class='table  table-striped'>";


    var Tables = Object.keys(dataset);
    //alert(Tables);

    var llaves = Object.keys(dataset['Table'][0]);
    //alert(llaves);


    contenido += "<thead class='thead-dark'><tr>";


    for (var i = 0; i < llaves.length; i++) {
        if (llaves[i] == "ID") {
            continue;
        }
        contenido += "<th>" + llaves[i] + "</th>";
    }
    contenido += "<th>Detalles</th></tr></thead>";


    for (var i = 0; i < dataset['Table'].length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorllave = llaves[j];
            if (llaves[j] == "ID") {
                continue;
            }
            contenido += "<td>" + dataset['Table'][i][valorllave] + "</td> ";

        }
        contenido += "<td><button type='button' class='btn btn-info btn-circle btn-lg' data-toggle='modal' data-target='#ModalClienteInfo' onclick=''><i class='fas fa-info-circle'></i></button></td>";
        contenido += "</tr>";
    }


    contenido += "</table>";

    document.getElementById("dataTableClientesCredito").innerHTML = contenido;
    $("#TableClientesCredito").dataTable({
        "paging": false,
        "searching": false
    });
}

$(function () {
   
        $("#txtNombre").keydown(function () {
        }).keyup(function (event) {


            kc = ((typeof (event.charCode) == 'undefined' || event.charCode === 0) ? event.keyCode : event.charCode);
            key = String.fromCharCode(kc);
            if (key == 13 && $("#txtNombre").val() == '') {            //**13-ENTER  27-ESC 8-DEL 46-SUPR   **//
                event.preventDefault();
                console.log('Ingrese Cliente a Buscar');
            } else {


                $('#txtNombre').simpleAutoComplete('GetClients', {
                    autoCompleteClassName: 'autocomplete',
                    selectedClassName: 'sel',
                    attrCallBack: 'rel',
                    identifier: 'ProductoInVenta',
                    extraParamFromInput2: $(this),
                    extraParamFromInput: event
                }, fnCompraCallback);

            }
        });
    
});
function fnCompraCallback(par) {

    document.getElementById("hdnProductoId").value = par[0];
    document.getElementById("txtCostoSinIva").value = par[1];
    GetMessage();

    // document.getElementById("txtProveedor").value = par[1]; //par[0] id
}
function GetMessage() {
    var idProdu = parseInt(document.getElementById("hdnProductoId").value);
    var idTienda = parseInt(document.getElementById("hdnIdTienda").value);
    PageMethods.Message(idProdu, idTienda, OnGetMessageSuccess, OnGetMessageFailure);
}
function OnGetMessageSuccess(result, userContext, methodName) {

    if (parseInt(result) == 0) {
        alert("No Hay Producto" + result);
        return;
    }

    document.getElementById("hdnExistencia").value = result;
    document.getElementById("txtExistencias").value = result;
}
function OnGetMessageFailure(error, userContext, methodName) {
    alert(error.get_message());
}





function GetCustomers(indexaso) {
    //alert("Pagina Cargada con index:" + indexaso);//verificado

    $.ajax({
        type: "GET",
        url: "GetClients",
        data: '{searchTerm:"' + SearchTerm() + '"}',
        contentType: false,  //muy importantes estos valores
        dataType: false,
        success: OnSuccess,
        failure: function (response) {
            alert("failure " + response.d);
        },
        error: function (response) {
            alert("Error " + response.d);
        }
    });

}
function SearchTerm() {
    //alert("Se presionao una tecla" + jQuery.trim($("[id*=txtSearch]").val()));        funciona 20170603 17:57
    return jQuery.trim($("[id*=txtNombre]").val());
}

var row;
function OnSuccess(response) {

    //var dataset = JSON.parse(response);
    //var Tablas = Object.keys(dataset);
    //alert("Tablas: " + Tablas);              //Recordad, funciona como los hashmap   Obj(key,value); Retorna Table, Table1
    //var Headers = Object.keys(dataset['Table'][1]); // Table lo da Tablas, los headers se obtiene con object key, cada {},{},{} -> 0,1,2 no importa el indice, solo debe existir
    ////alert("Headers:" + Headers);

    //alert("Response: \n "+ response);
    var xmlDoc = $.parseXML(response);
    var xml = $(xmlDoc);
    var __clientes = xml.find("Table");

    
  

    if (row == null) {
        row = $("#TableClientesCredito tr:last-child").clone(true);
    }

    $("#TableClientesCredito tr").not($("#TableClientesCredito tr:first-child")).remove();

    alert(__clientes.length);
    
    if (__clientes.length > 0) {
        $.each(__clientes, function () {

            var __uncliente = $(this);
            alert(__uncliente.find("RFC").text());
        });

    }

    $("#TableClientesCredito").append(row);

}