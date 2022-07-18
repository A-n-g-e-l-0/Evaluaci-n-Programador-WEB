/**DatePickers**/
$(function () {
    $("#datepickerFNacimiento").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });
});
$(function () {
    $("#datepickerFIngreso").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });
});


/**Llena Combos Tiendas Matrix**/
$.get("Empleados/ListarTiendas?IdTienda=0", function (data) {
    llenarCombo(data, document.getElementById("cboTiendas"), true);
    llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);

});

function llenarCombo(data, control, seleccion) {
    var contenido = "";

    if (seleccion) {
        document.getElementById("cboTiendasEleccion").disabled = false; /**Funciona, llena el combo principal y aparecen tiendas dadas de alta**/
        contenido += "<option value=0>---seleccione---</option>";
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value=" + data[i].ID_Tienda + ">";
            contenido += data[i].Descripcion;
            contenido += "</option>";
        }
    } else {
        //alert("Llena combobox con el idtiendaenviado: ["+ data+"]");
        document.getElementById("cboTiendasEleccion").value = data;
        document.getElementById("cboTiendasEleccion").disabled = true;
    }

    control.innerHTML = contenido;
}
$(document).ready(function () {
    $('#cboTiendasEleccion').change(function () {
        //alert($(this).find(":selected").val());
        SeleccionaSucursalesxTienda(0, $(this).find(":selected").val());
    });
});

function SeleccionaSucursalesxTienda(idEmpleado, val) {

    if (idEmpleado == 0) {
        $.get("Empleados/ListarSucursales?IdTienda=" + val, function (data) {
            // alert(JSON.stringify(data));
            llenarCombo(data, document.getElementById("cboSucursalEleccion"), true);
        });
    } else {
        // alert(idEmpleado);
        /**Llena Combos Sucursales iidTienda=1**/
        $.get("Empleados/ListarTiendas?IdTienda=" + idEmpleado, function (data) {
            llenarCombo(data, document.getElementById("cboSucursalEleccion"), true);
        });
    }



    //alert(iidTienda);
}



/**
 * Es lanzado por el evento del cambio en el combobox principal de la lista de empleados, al cambiar obtenemos el idtienda y buscamos los empleados de esa sucursal, 0=---
 * */
function SeleccionaEmpleados() {

    var iidTienda = document.getElementById("cboTiendas").value;

    if (iidTienda == 0) { //Selecciono el --- osea nada :D
        $.get("Empleados/Listar", function (data) {
            crearListadoEmpleado(data);
        });
    } else {
        $.get("Empleados/ListarEmpleadosxTienda/?IIdTienda=" + iidTienda, function (data) {
            crearListadoEmpleado(data);
            llenarCombo(iidTienda, "cboTiendasEleccion", false)
        });
    }
}

/**
 * La data viene de la vista, en la vista transforma el Json
 * @param {any} data
 */
function crearListadoEmpleado(data) {

    var contenido = "";

    contenido += "<table id='tabla_empleados' class='table'>";
    contenido += "<thead>              ";
    contenido += "<tr>                 ";
    contenido += "<td>Empleado</td> ";
    contenido += "<td>Sucursal</td>     ";
    contenido += "<td>Puesto</td>     ";
    contenido += "<td>Ingreso</td>     ";
    contenido += "<td>Detalles</td>     ";
    contenido += "</tr>                ";
    contenido += "</thead>             ";
    contenido += "<tbody>              ";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].NameComplete + "</td>";
        contenido += "<td>" + data[i].IdTienda + "</td>";
        contenido += "<td>" + data[i].Puesto + "</td>";
        contenido += "<td>" + formatDate(new Date(parseInt((data[i].E_FechaIngreso).substr(6))), true) + "</td>";

        contenido += "<td><button type='button' class='btn btn-info btn-circle btn-lg' data-toggle='modal' data-target='#ModalEmpleado' onclick='Action_Empleado(" + data[i].IdEmpleado + ")'>";
        contenido += "<i class='fas fa-info-circle'></i></button></td>";

        contenido += "</tr>                       ";
    }
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("dataTableEmpleados").innerHTML = contenido;
    $("#tabla_empleados").dataTable({
        searching: false
    });
}

/**
 * /**My function, depende de la posicion buscara, en este caso busca un empleado
 * */
function myFunction() {
    // alert("Alert on clic: [" + document.getElementById("txtNombre").value+"]");

    if (!isEmpty(document.getElementById("txtNombre").value)) {
        var nombre = document.getElementById("txtNombre").value;
        $.get("Empleados/BuscaEmpleado/?nombre=" + nombre, function (data) {
            crearListadoEmpleado(data);
        });
    }
}

/**
 * 
 * @param {any} str empty
 */
function isEmpty(str) {
    return (!str || 0 === str.length);
}

/**
 * Abre el Modal 
 * @param {any} id
 * 0 nuevo epleado
 * != 0, actualiza empleado
 */
function Action_Empleado(id) {
    var SelectedxMostrarinCB = 0;
    if (id == 0) {
        Action_Autoclean();
    } else {
        /***Limpieza del formulario*/
        var controlborrar = document.getElementsByClassName("obligatorio");
        for (var i = 0; i < controlborrar.length; i++) {
            controlborrar[i].parentNode.classList.remove("required");
        }

        /**Llena combo sucursales previo**/
        SeleccionaSucursalesxTienda(id);


        /*Get empleado por ID*/

        $.get("Empleados/DetalleEmpleadoporId/?IdEmpleado=" + id, function (data) {

           // alert(_arrayBufferToBase64(data[0].E_Avatar));  funcional 201109_1802

            document.getElementById("txtIdEmpleado").value = data[0].IdEmpleado
            document.getElementById("txtCB").value = data[0].CBEmpleado;
            document.getElementById("chkboxActiveBaja").checked = true;
            document.getElementById("txtName").value = data[0].NameComplete;
            document.getElementById("cboTiendasEleccion").disabled = false;
            document.getElementById("cboTiendasEleccion").value = data[0].IdTienda
            document.getElementById("txtPuesto").value = data[0].Puesto;
            document.getElementBy//Id("datepickerFIngreso").value = formatDate(new Date(parseInt((data[0].E_FechaIngreso).substr(6))), true);
            document.getElementById("datepickerFNacimiento").value = formatDate(new Date(parseInt((data[0].E_FechaNacimiento).substr(6))), true);
            document.getElementById("txtTelefono").value = data[0].E_Telefono;
            document.getElementById("txtDireccion").value = data[0].E_Direccion;
            document.getElementById("imgFoto").src = "data:image/jpeg;base64,"+_arrayBufferToBase64(data[0].E_Avatar);
            
            SelectedxMostrarinCB = data[0].E_Sucursal;
            selectElement("cboSucursalEleccion", SelectedxMostrarinCB);
        });

    }
}


function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function LimpiaFotito() {
    document.getElementById("imgFoto").src = "";
}

$(document).ready(function () {
    $('#chkboxActiveBaja').change(function () {
        //Valida si se ingreso fechas antes de crear cb

        if (document.getElementById("datepickerFIngreso").value == "" || document.getElementById("datepickerFNacimiento").value == "") {
            document.getElementById("txtCB").value = 0;
        } else {

            if ($("#chkboxActiveBaja").is(':checked')) {
                //alert("No está activado");
                //alert('Se Activa el empleado, los cambios se guardaran al Aceptar');
                /**Creacion del nuevo CB**/
                var date = new Date();
                document.getElementById("txtCB").value = formatDate(document.getElementById("datepickerFIngreso").value, null) + formatDate(document.getElementById("datepickerFNacimiento").value, null);
            } else {

                //alert("Está activado");
                //alert('Se da de Baja el empleado, los cambios se guardaran al Aceptar');
                document.getElementById("txtCB").value = 0;
            }
        }

    });
});

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

function Action_Autoclean() {
    var controlborrar = document.getElementsByClassName("autoclean");
    for (var i = 0; i < controlborrar.length; i++) {
        controlborrar[i].value = "";
    }

    document.getElementById("chkboxActiveBaja").checked = false;

    if ($("#chkboxActiveBaja").is(':checked')) {
        //alert("Nevo Activo");
        $("#chkboxActiveBaja").attr('checked', true);
    } else {
        //alert("Nevo Baja");
        $("#chkboxActiveBaja").attr('checked', false);

    }
    /**Llena Combos Tiendas Matrix**/
    $.get("Empleados/ListarTiendas?IdTienda=0", function (data) {
        llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);
        llenarCombo(data, document.getElementById("cboSucursalEleccion"), true);
    });
}

/**
 * Valida campos vacios
 * */
function Validar() {
    EnviarDatosaSQL();
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

function EnviarDatosaSQL() {
    if (DatosObligatorios() == true) {

        /**Validar si es Actualizacion o Baja del empleado**/

        var frm = new FormData();
        var date = new Date();

        var valIdEmpleado = document.getElementById("txtIdEmpleado").value;

        var valCB = document.getElementById("txtCB").value;
        var valName = document.getElementById("txtName").value;
        //var valSexo = document.getElementById("txtSexo").value;
        //var valEdoCivil = document.getElementById("txtEdoCivil").value;
        var valDireccion = document.getElementById("txtDireccion").value;
        //var valLNacimiento = document.getElementById("txtLNacimiento").value;
        var valFNac = document.getElementById("datepickerFNacimiento").value;
        var valTel = document.getElementById("txtTelefono").value;
        //var valeMail = document.getElementById("txtEMail").value;
        // var valCEstudios = document.getElementById("txtCEstudios").value;
        var valIdTiienda = getSelectIdfromComboBox("cboTiendasEleccion");
        var valSucursal = getSelectIdfromComboBox("cboSucursalEleccion");
        var valPuesto = document.getElementById("txtPuesto").value;
        var valFIngreso = document.getElementById("datepickerFIngreso").value;
        var valFAlta = formatDate(date, false);
      //  alert(document.getElementById("imgFoto").src.replace("data:image/jpeg;base64,", ""));
        var imgFotito = document.getElementById("imgFoto").src.replace("data:image/jpeg;base64,", "");

        frm.append("IdEmpleado", valIdEmpleado);

        /**AOSM 200908-1328 Aqui actualizamos si es baja o alta**/
        frm.append("CBEmpleado", valCB);
        frm.append("IdTienda", valIdTiienda);
        frm.append("NameComplete", valName);
        frm.append("IdTienda", valSucursal);
        frm.append("Puesto", valPuesto);
        frm.append("E_FechaIngreso", valFIngreso);
        frm.append("E_FechaNacimiento", valFNac);
        frm.append("E_LNacimiento", "");
        frm.append("E_Cedula", "");
        frm.append("E_Sexo", "");
        frm.append("E_Sucursal", valSucursal);
        frm.append("E_ECivil", "");
        frm.append("E_Email", "");
        frm.append("E_Telefono", valTel);
        frm.append("E_Direccion", valDireccion);
        frm.append("cadenaFoto", imgFotito);
        frm.append("FAlta", valFAlta);

        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "Empleados/Create",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        alert("Se Guarda la Información para : [" + valName + "]");
                        SeleccionaEmpleados();
                        document.getElementById("btnCancel").click();
                    } else {
                        alert("Falla, No se Guarda : [" + data + "]");
                    }


                }
            });
        }



    } else {
        alert("Datos Obligatorios Faltantes");
    }
}

function getSelectTextfromComboBox(selId) {
    var sel = document.getElementById(selId);
    var i = sel.selectedIndex;
    var selected_text = sel.options[i].text;
    return selected_text;
}
function getSelectIdfromComboBox(selId) {
    var sel = document.getElementById(selId);
    var i = sel.selectedIndex;
    var selected_value = sel.options[i].value;
    return selected_value;
}

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}



function previewImg(e) {

    var file = document.getElementById("btnFoto").files[0];
    var reader = new FileReader();
    if (reader != null) {
        reader.onloadend = function () {
            var img = document.getElementById("imgFoto");
            img.src = reader.result;
        }
    }
    reader.readAsDataURL(file);
}