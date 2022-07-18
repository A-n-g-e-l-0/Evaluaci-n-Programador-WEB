
$(function () {
    //$.get("ListadoEntradas", function (data) {
    //    crearListadoEmpleadosqueChecan(["Empleado", "Sucursal", "Registro Entrada", "Registro Salida", "Detalles"], data)
    //});

    //210316__1829 Fase 1 Reporte
    $.get("Reporteador", function (data) {
        crearListadoDias(data)
    });

});


function Action_Empleado(flag) {
    
    var keycode = flag.keyCode;

   if (keycode == '13') {
        // alert(keycode);
      //alert("Entro y ademoas mide: " + document.getElementById("txtCBCheckIn").value.length + " ahora el code is :" + keycode);
       if (document.getElementById("txtCBCheckIn").value.length==2
        //    $("#chkboxActiveBaja").is(':checked')
        ) {
            if ($("input[name='exampleRadios']:radio").is(':checked')) {
                if ($('input:radio[name=exampleRadios]:checked').val() == 0) {
                    //alert("ID!!! In ID=" + document.getElementById("txtCBCheckIn").value);
                    EnviarDatosaSQL("ID", 3);


                } else {
                     //alert("ID!!! Out ID=" + document.getElementById("txtCBCheckIn").value);
                    EnviarDatosaSQL("ID", 4)
                }
            }
        } else {
            if ($("input[name='exampleRadios']:radio").is(':checked')) {
                if ($('input:radio[name=exampleRadios]:checked').val() == 0) {
                    //alert("CB!!! In CB=" + document.getElementById("txtCBCheckIn").value);
                    EnviarDatosaSQL("CB", 1)
                } else {
                    //alert("CB!!! Out CB=" + document.getElementById("txtCBCheckIn").value);
                    EnviarDatosaSQL("CB", 2)
                }
            }
        } 
    } else {
        //alert("No entro y ademoas mide: " + document.getElementById("txtCBCheckIn").length + " ahora el code is :" + keycode);
    }

    
}


function EnviarDatosaSQL(CBorID, InOut) {
    if (DatosObligatorios() == true) {
        var frm = new FormData();
        /****/
        if (CBorID == "ID") {
            var valIdEmpleado = document.getElementById("txtCBCheckIn").value;
            frm.append("IdEmpleado", valIdEmpleado);
            frm.append("CBEmpleado", 0);
        } else {
            var valCB = document.getElementById("txtCBCheckIn").value;
            frm.append("CBEmpleado", valCB);
            frm.append("IdEmpleado", 0);
        }

        frm.append("InOut", InOut);
            $.ajax({
                type: "POST",
                url: "Registrar",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                   
                    if (data.length >= 1) {
                        /////***Retornaremos uns Lista de Entradas***/////

                        $.get("Reporteador", function (data) {
                            crearListadoDias(data)
                        });
                      
                    } else {
                        alert("Falla");
                    }


                }
            });
        



    } else {
        alert("Datos Obligatorios Faltantes");
    }
}

function DatosObligatorios() {
    var ControlesObligatorios = document.getElementsByClassName("obligatorio");
    var Result = true;
    for (var i = 0; i < ControlesObligatorios.length; i++) {
        if (ControlesObligatorios[i].value == "") {
            //alert("Campos Obligatorios en : [" + ControlesObligatorios.length + "]");
            ControlesObligatorios[i].parentNode.classList.add("required");
            Result = false;
        }
    }

    for (var i = 0; i < ControlesObligatorios.length; i++) {
        if (Result == true) {
            // alert("Obligatorios:[" + ControlesObligatorios.length + "]");
            ControlesObligatorios[i].parentNode.classList.remove("required");
        }

    }
    return Result;

}



/**AOSM 201117 Nuevo js para controlar empleados CHECADOR
 * La data viene deL EXEC in controller Entradas
 * @param {any} data
 */
function crearListadoEmpleadosqueChecan(arrayColumnas, data) {
    //alert(JSON.stringify(data));
    var contenido = "";

    document.getElementById("txtCBCheckIn").value = "";

    contenido += "<table id='tabla_empleadosChecan' class='table'>";
    contenido += "<thead>              ";
    contenido += "<tr>                 ";

    /**200819_1625 Adding Dinamc Columns**/
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>" + arrayColumnas[i] + "</td>";
    }

    contenido += "</tr>                ";
    contenido += "</thead>             ";
/**200819_1620 Manejo de Objeto Dinamico para las columnas**/



    var llaves = Object.keys(data[0]);
    //alert(llaves);
    contenido += "<tbody>              ";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorllave = llaves[j];
            if (valorllave == "IdRegistroEntrada" || valorllave == "IdEmpleado")
                continue
            else if (valorllave == "RegistroEntrada")
                    contenido += "<td>" + data[i].RegistroEntrada + "</td>";
                  //  + formatDate(new Date(parseInt((data[i].RegistroEntrada).substr(6))), false) + "</td>";
            else if (valorllave == "RegistroSalida")
                    contenido += "<td>" + data[i].RegistroSalida + "</td>";
                    //+ formatDate(new Date(parseInt((data[i].RegistroSalida).substr(6))), false) + "</td>";
            else
            contenido += "<td>" + data[i][valorllave] + "</td> ";
        }
        var llaveId = llaves[0];
        contenido += "<td>";
        contenido += "<button type='button' class='btn btn-info btn-circle btn-lg' data-toggle='modal'";
        contenido += " data-target='#ModalEmpleado' onclick=''>";
        contenido += "<i class='fas fa-info-circle'></i>";
        contenido += "</button>";
        contenido += "</td>";

        contenido += "</tr>     ";
    }
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("dataTableEmpleadosChecan").innerHTML = contenido;

    //$("#tabla_empleadosChecan").dataTable({
    //    searching: false
    //});
}

/**
 * 210319_1030 Evitar nombre de Columnas en codigo Duro
 * @param {any} arrayColumnas se omite nombres de Columnas
 * @param {any} data    Solamente aceptamos data
 */
function crearListadoDias(data){
    //alert(data);
    var contenido = "";
    var dataset = JSON.parse(data);
    //alert(JSON.stringify(dataset));
    contenido += "<table id='TableReporte' class='table table-bordered text-center'>";
    

    var Tables = Object.keys(dataset);
    //alert(Tables);

    var llaves = Object.keys(dataset['Table'][0]);
    //alert(llaves);


    contenido += "<tr>                 ";
    contenido += "<th rowspan='3'>EMPLEADOS</th>";

    /**200819_1625 Adding Dinamc Columns LUNES MARTES....**/
    for (var i = 0; i < llaves.length; i++) {
        contenido += "<th colspan='2'>" + llaves[i] + "</th>";
    }
    contenido += "</tr>                ";
    /**200819_1620 Manejo de Objeto Dinamico para las columnas**/

    for (var i = 0; i < dataset['Table'].length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorllave = llaves[j];
            contenido += "<td colspan='2'>" + dataset['Table'][i][valorllave] + "</td> ";
        }
     
        contenido += "</tr>";
        for (var j = 0; j < llaves.length; j++) {
            contenido += "<td>Entrada</td> <td>Salida</td>";
        }
        contenido += "</tr>";
        
    }

    /**210319_1326 Se inserta en tabla registros de horas de entrada y salidas**/
    llaves = Object.keys(dataset['Table1'][0]);
   
    for (var i = 0; i < dataset['Table1'].length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorllave = llaves[j];
            //alert(valorllave);
            if (valorllave == "IdEmpleado")
                continue;
            if (valorllave == "Empleado")
                contenido += "<td colspan='1'>" + dataset['Table1'][i][valorllave] + "</td> ";
            else
                contenido += "<td>" + dataset['Table1'][i][valorllave] + "</td> ";
        }
    }


    contenido += "</table>";

    document.getElementById("dataTableReporte").innerHTML = contenido;

    //$("#TableReporte").dataTable({
    //    searching: false
    //});
}

function formatDate(date, dt) {
    /**For CB**/
    if (dt == null) {


        var parts = date.split("-");
        //alert(parts);
        var d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));

        var
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();


        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('');
    }
    if (dt) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    } else {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        hour = d.getHours();
        min = d.getMinutes();
        ss = d.getSeconds();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (min.length < 2)
            min = '0' + min;
        if (ss.length < 2)
            ss = '0' + ss;

        return ("" + day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + ss + "");
    }

}