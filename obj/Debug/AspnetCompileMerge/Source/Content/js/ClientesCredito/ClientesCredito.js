$(function () {
  
    //210407__1829 Fase 1 Carga clientes
    $.get("CargaClientesCredito", function (data) {
        crearListadoClientesCredito(data)
    });

});


/**
 * 210407_1030 Evitar nombre de Columnas en codigo Duro
 * @param {any} arrayColumnas se omite nombres de Columnas
 * @param {any} data    Solamente aceptamos data
 */
function crearListadoClientesCredito(data){
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
        if (llaves[i]=="ID") {
            continue;
        }
        contenido += "<th>" + llaves[i] + "</th>";
    }
    contenido += "<th>Detalles</th></tr></thead>";
    

    for (var i = 0; i < dataset['Table'].length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorllave = llaves[j];
            if (llaves[j]=="ID") {
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
        searching: false
    });
}
