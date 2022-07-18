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

/**Llena Combos**/
$.get("ListarTiendas", function (data) {
    llenarCombo(data, document.getElementById("cboTiendas"), true);
    llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);
});
function llenarCombo(data, control, seleccion) {
    var contenido = "";

    if (seleccion) {
        document.getElementById("cboTiendasEleccion").disabled = false;
        contenido += "<option value=0>---seleccione---</option>";
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value=" + data[i].IdTienda + ">";
            contenido += data[i].NombreTienda;
            contenido += "</option>";
        }
    } else {
        //alert("Llena combobox con el idtiendaenviado: ["+ data+"]");
        document.getElementById("cboTiendasEleccion").value = data;
        document.getElementById("cboTiendasEleccion").disabled = true;
    }

    control.innerHTML = contenido;
}


/**AOSM 200909_1343 Nuevo js para controlar empleados baja
 * La data viene de la vista, en la vista transforma el Json
 * @param {any} data
 */
function crearListadoBajasEmpleados(arrayColumnas, data) {
    //alert("Lista:")
    var contenido = "";

    contenido += "<table id='tabla_empleadosbaja' class='table'>";
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
            if (valorllave != "IdEmpleado")
            contenido += "<td>" + data[i][valorllave] + "</td> ";
        }
        var llaveId = llaves[0];
        contenido += "<td>";
        contenido += "<button type='button' class='btn btn-info btn-circle btn-lg' data-toggle='modal'";
        contenido += " data-target='#ModalEmpleado' onclick='Action_Empleado(" + data[i][llaveId] + ")'>";
        contenido += "<i class='fas fa-info-circle'></i>";
        contenido += "</button>";
        contenido += "</td>";

        contenido += "</tr>                       ";
    }
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("dataTableEmpleadosBaja").innerHTML = contenido;

    $("#tabla_empleadosbaja").dataTable({
        searching: false
    });
}

/**
 * Abre el Modal 
 * @param {any} id
 * 0 nuevo epleado
 * != 0, actualiza empleado
 */
function Action_Empleado(id) {

    if (id == 0) {
        Action_Autoclean();
    } else {
        var controlborrar = document.getElementsByClassName("obligatorio");
        for (var i = 0; i < controlborrar.length; i++) {
            controlborrar[i].parentNode.classList.remove("required");
        }

        $.get("DetalleEmpleadoporId/?IdEmpleado=" + id, function (data) {
            //alert("Empleado : [" + data[0].NameComplete + "]");
            document.getElementById("txtIdEmpleado").value = data[0].IdEmpleado
            document.getElementById("txtCB").value = data[0].CBEmpleado;

            /**Switch Baja Activo**/
            if (document.getElementById("txtCB").value != "0" || document.getElementById("txtCB").value != "") {
                $("#chkboxActiveBaja").attr('checked', true);
            } else $("#chkboxActiveBaja").attr('checked', false);

            document.getElementById("txtName").value = data[0].NameComplete;
            document.getElementById("cboTiendasEleccion").disabled = false;
            document.getElementById("cboTiendasEleccion").value = data[0].IdTienda
            document.getElementById("txtPuesto").value = data[0].Puesto;
            document.getElementById("datepickerFIngreso").value = formatDate(new Date(parseInt((data[0].E_FechaIngreso).substr(6))), true);
            document.getElementById("datepickerFNacimiento").value = formatDate(new Date(parseInt((data[0].E_FechaNacimiento).substr(6))), true);
            document.getElementById("txtLNacimiento").value = data[0].E_LNacimiento;
            document.getElementById("txtCEstudios").value = data[0].E_Cedula;
            document.getElementById("txtSexo").value = data[0].E_Sexo;
            //document.getElementById("").value = data[0].E_Sucursal;
            document.getElementById("txtEdoCivil").value = data[0].E_ECivil;
            document.getElementById("txtEMail").value = data[0].E_Email;
            document.getElementById("txtTelefono").value = data[0].E_Telefono;
            document.getElementById("txtDireccion").value = data[0].E_Direccion;
            //document.getElementById("").value = data[0].E_Avatar
            //document.getElementById("").value = data[0].FAlta            

        });
    }
}

//**Switch Baja / Activo Status**//
//**Switch Baja / Activo Status**//
$(document).ready(function () {
    $('#chkboxActiveBaja').change(function () {
        //Valida si se ingreso fechas antes de crear cb
        if (DatosObligatorios) {
            if ($("#chkboxActiveBaja").is(':checked')) {
                //alert("No está activado");
                alert('Se Activa el empleado, los cambios se guardaran al Aceptar');
                /**Creacion del nuevo CB**/
                var date = new Date();
                document.getElementById("txtCB").value = formatDate(document.getElementById("datepickerFIngreso").value, null) + formatDate(document.getElementById("datepickerFNacimiento").value, null);
            } else {
                //alert("Está activado");
                alert('Se da de Baja el empleado, los cambios se guardaran al Aceptar');
                document.getElementById("txtCB").value = 0;
            }
        } else {
            alert("Ingrese minimo Nombre y Fechas");
        }
    });
});

/**
 * Valida campos vacios, despues envia los datos a SQL Server
 * */
function Validar() {
    EnviarDatosaSQL();
}

/**
 * Crea el FRM que se convierte en el Modelo a Enviar
 * */
function EnviarDatosaSQL() {
    if (DatosObligatorios() == true) {

        /**Validar si es Actualizacion o Baja del empleado**/

        var frm = new FormData();
        var date = new Date();

        var valIdEmpleado = document.getElementById("txtIdEmpleado").value;

        var valCB = document.getElementById("txtCB").value;
        var valName = document.getElementById("txtName").value;
        var valSexo = document.getElementById("txtSexo").value;
        var valEdoCivil = document.getElementById("txtEdoCivil").value;
        var valDireccion = document.getElementById("txtDireccion").value;
        var valLNacimiento = document.getElementById("txtLNacimiento").value;
        var valFNac = document.getElementById("datepickerFNacimiento").value;
        var valTel = document.getElementById("txtTelefono").value;
        var valeMail = document.getElementById("txtEMail").value;
        var valCEstudios = document.getElementById("txtCEstudios").value;
        var valIdTiienda = getSelectIdfromComboBox("cboTiendasEleccion");
        var valSucursal = getSelectTextfromComboBox("cboTiendasEleccion");
        var valPuesto = document.getElementById("txtPuesto").value;
        var valFIngreso = document.getElementById("datepickerFIngreso").value;
        var valFAlta = formatDate(date, false);

        frm.append("IdEmpleado", valIdEmpleado);

        /**AOSM 200908-1328 Aqui actualizamos si es baja o alta**/
        frm.append("CBEmpleado", valCB);


        frm.append("IdTienda", valIdTiienda);
        frm.append("NameComplete", valName);
        frm.append("IdTienda", valSucursal);
        frm.append("Puesto", valPuesto);
        frm.append("E_FechaIngreso", valFIngreso);
        frm.append("E_FechaNacimiento", valFNac);
        frm.append("E_LNacimiento", valLNacimiento);
        frm.append("E_Cedula", valCEstudios);
        frm.append("E_Sexo", valSexo);
        frm.append("E_Sucursal", valSucursal);
        frm.append("E_ECivil", valEdoCivil);
        frm.append("E_Email", valeMail);
        frm.append("E_Telefono", valTel);
        frm.append("E_Direccion", valDireccion);
        frm.append("E_Avatar", ":)");
        frm.append("FAlta", valFAlta);

        //alert("Fecha Alta: [" + valFAlta + "], FNac:[" + valFNac + "], FIngreso :[" + valFIngreso + "]");
        //stringjfy 

        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "Create",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        alert("Ingresado: [" + valName + "]");
                        SeleccionaEmpleadosBaja();
                        document.getElementById("btnCancel").click();
                    } else {
                        alert("No Ingresado: [" + data + "]");
                    }


                }
            });
        }



    } else {

    }
}

/**
 * Agrega estilo al control que no cumple la regla
 * 
 * */
function DatosObligatorios() {

    var ControlesObligatorios = document.getElementsByClassName("obligatorio");

    for (var i = 0; i < ControlesObligatorios.length; i++) {
        if (""==(ControlesObligatorios[i].value) || "..."==(ControlesObligatorios[i].value)) {
            ControlesObligatorios[i].parentNode.classList.add("required");
            return false;
        } else {
            // alert("Obligatorios:[" + ControlesObligatorios.length + "]");
            ControlesObligatorios[i].parentNode.classList.remove("required");
            return true;
        }
    }

}


/**
 * Seleccion a value y texto delos combos
 * @param {any} selId
 */
function getSelectTextfromComboBox(selId) {
    var sel = document.getElementById(selId);
    var i = sel.selectedIndex;
    var selected_text = sel.options[i].text;
    return selected_text;
}
function getSelectIdfromComboBox(selId) {
    var sel = document.getElementById(selId);
    var i = sel.selectedIndex;

    return i;
}


function SeleccionaEmpleadosBaja() {

    var iidTienda = document.getElementById("cboTiendas").value;

    if (iidTienda == 0) {
        $.get("Listar", function (data) {
            crearListadoBajasEmpleados(["Empleado", "Puesto", "Sucursal", "Detalles"], data);

        });

        $.get("ListarTiendas", function (data) {
            llenarCombo(data, document.getElementById("cboTiendas"), true);
            llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);
        });
    } else {

        $.get("ListarEmpleadosBajaxTienda/?IIdTienda=" + iidTienda, function (data) {
            crearListadoBajasEmpleados(["Empleado", "Puesto", "Sucursal", "Detalles"],data);
            llenarCombo(iidTienda, "cboTiendasEleccion", false)
        });

    }
    //alert("Hola+" + iidTienda);
}


/**
 * Auxiliar para dar formato a las fechas
 * @param {any} date
 * @param {any} dt
 */
function formatDate(date, dt) {

/**For CB**/
    if (dt == null) {
        

        var parts = date.split("-");
        //alert(parts);
        var d = new Date(parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10));

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


    }

}