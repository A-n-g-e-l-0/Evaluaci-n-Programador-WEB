var Categoria_Nueva = 0;
var Marca_Nueva = 0;
var Unidad_Nueva = 0;
var Proveedor_Nuevo=0;

$(document).ready(function () {

    $("#txtPrecioVenta").blur(function () {
        //alert("Handler for .blur() called.");

        var costoCompra = 0.0;
        var costoVenta = 0.0;

        if (document.getElementById("txtPrecioCompra").value == "") {
            costoCompra = 0;
            // alert(costoCompra);
        }
        else {
            costoCompra = parseFloat(document.getElementById("txtPrecioCompra").value);
            costoVenta = parseFloat(document.getElementById("txtPrecioVenta").value); 
            document.getElementById("txtMargenGanancia").value = ((costoVenta * 100 / costoCompra) - 100).toFixed(2);
               
            }
    });

    rellenaCombos();

});

function rellenaCombos() {

    /**Llena Combos Categos Matrix**/
    $.get("rellenaDDLCatego?Bandera=0", function (data) {
        llenarComboCategos(data, document.getElementById("ddlCategorias"), true);
        //llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);

    });

    /**Llena Combos Proveedor Matrix**/
    $.get("rellenaDDLProveedores?Bandera=1", function (data) {
        llenarComboProvee(data, document.getElementById("ddlProveedor"), true);
        //llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);

    });

    /**Llena Combos marca Matrix**/
    $.get("rellenaDDLMarcas?Bandera=2", function (data) {
        llenarComboMarcas(data, document.getElementById("ddlMarcas"), true);
        //llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);

    });

    /**Llena Combos Unidad Matrix**/
    $.get("rellenaDDLUnidad?Bandera=3", function (data) {
        llenarComboUnidad(data, document.getElementById("ddlUnidades"), true);
        //llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);

    });
}


function llenarComboMarcas(data, control, seleccion) {
    var contenido = "";

    if (seleccion) {
        contenido += "<option value=0>---seleccione---</option>";
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value=" + data[i].ID_Marca + ">";
            contenido += data[i].DescMar;
            contenido += "</option>";
        }
        control.innerHTML = contenido;
        /***Bitacora 211022_1102 Despues de agregar nuevo narca se carga en el selec correctamente*/
        if (Marca_Nueva != 0) {
            selectElement("ddlMarcas", Marca_Nueva);
        }
        console.log("Charged Combo Marcas");
    } else {/**Llena Combos Categos Matrix**/
        console.log("Charging Combo Marcas");
        $.get("rellenaDDLMarcas?Bandera=0", function (data) {
            llenarComboMarcas(data, document.getElementById("ddlMarcas"), true);
            //llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);

        });
    }
   
}


function llenarComboUnidad(data, control, seleccion) {
    var contenido = "";

    if (seleccion) {
        contenido += "<option value=0>---seleccione---</option>";
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value=" + data[i].ID_Unidad + ">";
            contenido += data[i].DescUnidad;
            contenido += "</option>";
        }
        control.innerHTML = contenido;

        /***Bitacora 211021_1102 Despues de agregar nuevo categoria se carga en el selec correctamente*/
        if (Unidad_Nueva != 0) {
            selectElement("ddlUnidades", Unidad_Nueva);
        }
        console.log("Charged Combo Unidades");
    } else {
        /**Llena Combos Categos Matrix**/
        console.log("Charging Combo Unidades");
        $.get("rellenaDDLUnidad?Bandera=0", function (data) {
            llenarComboUnidad(data, document.getElementById("ddlUnidades"), true);
        });
    }

    
}


function llenarComboCategos(data, control, seleccion) {
    var contenido = "";

    if (seleccion) {
        contenido += "<option value=0>---seleccione---</option>";
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value=" + data[i].ID_Categoria + ">";
            contenido += data[i].DescCateg;
            contenido += "</option>";
        }
        control.innerHTML = contenido;

        /***Bitacora 211021_1102 Despues de agregar nuevo categoria se carga en el selec correctamente*/
        if (Categoria_Nueva != 0) {
            selectElement("ddlCategorias", Categoria_Nueva);
        }
        console.log("Charged Combo Categos");
        
    } else {
        /**Llena Combos Categos Matrix**/
        console.log("Charging Combo Categos");
        $.get("rellenaDDLCatego?Bandera=0", function (data) {
            llenarComboCategos(data, document.getElementById("ddlCategorias"), true);
            //llenarCombo(data, document.getElementById("cboTiendasEleccion"), true);

        });
    }

    
}


function llenarComboProvee(data, control, seleccion) {
    var contenido = "";

    if (seleccion) {
        contenido += "<option value=0>---seleccione---</option>";
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value=" + data[i].Clave + ">";
            contenido += data[i].RSoc;
            contenido += "</option>";
        }

        control.innerHTML = contenido;

        /***Bitacora 211022_1159 Despues de agregar nuevo proveedor se carga en el selec correctamente*/
        if (Proveedor_Nuevo != 0) {
            selectElement("ddlProveedor", Proveedor_Nuevo);
        }
        console.log("Charged Combo Proveedores");
    } else {
        /**Llena Combos Proveddores Matrix**/
        console.log("Charging Combo Proveedores");
        $.get("rellenaDDLProveedores?Bandera=0", function (data) {
            llenarComboProvee(data, document.getElementById("ddlProveedor"), true);
            

        });
    }

    
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
    console.log("Selecting on Combo " + id + " : " + valueToSelect);
}


/**
 * Valida campos vacios
 * */
function Validar() {
    
    EnviarDatosaSQL();
}

function EnviarDatosaSQL() {
    if (DatosObligatorios() == true) {

        
        var frm = new FormData();
        var date = new Date();


        //var _ID_Producto = document.getElementById("").value;
        var ID_Prov = getSelectIdfromComboBox("ddlProveedor");
        var ID_Catg = getSelectIdfromComboBox("ddlCategorias");
        var ID_Marc = getSelectIdfromComboBox("ddlMarcas");
        var ID_Unid = getSelectIdfromComboBox("ddlUnidades");
        var Descripcion = document.getElementById("txtDescrpcion").value;
        var Rex = document.getElementById("txtRex").value;
        var CBarras = "";// document.getElementById("txtCBarras").value;
        var PCosto_s_IVA = document.getElementById("txtPrecioCompra").value;
        var PrecioComcIVA = document.getElementById("txtPrecioCompra").value;
        var IVA = "";
        var PVenta = document.getElementById("txtPrecioVenta").value;
        var PrecioVentcIva = document.getElementById("txtPrecioVenta").value;
        var VentaIVA = document.getElementById("txtMargenGanancia").value;
        var FAlta = formatDate(date, false);



        if ($("#chkServices").is(':checked')) {
             //alert("Producto");
            var Used = "0";

        } else {
            //alert("Servicio");
            var Used ="1";

        }

       
        var _used = "";
        var _Existencias = document.getElementById("txtExistencias").value;
        var _flag = "";
        var imgFotito = document.getElementById("imgFoto").src.replace("data:image/jpeg;base64,", "");

        frm.append("ID_Prov", ID_Prov);
        frm.append("ID_Catg", ID_Catg);
        frm.append("ID_Marc", ID_Marc);
        frm.append("ID_Unid", ID_Unid);
        frm.append("Descripcion", Descripcion);
        frm.append("Rex", Rex);
        frm.append("CBarras", CBarras);
        frm.append("PCosto_s_IVA", PCosto_s_IVA);
        frm.append("PrecioComcIVA",PrecioComcIVA);
        frm.append("IVA", IVA);
        frm.append("PVenta", PVenta);
        frm.append("PrecioVentcIva", PrecioVentcIva);
        frm.append("VentaIVA", VentaIVA);
        frm.append("FAlta", FAlta);
        frm.append("Used", Used);
        
        frm.append("Existencias", _Existencias);
        frm.append("flag", _flag);
        frm.append("cadenaFoto", imgFotito);

        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "btnAddProducto",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        console.log("Saved");
                        Action_Autoclean();
                    } else {
                        console.log("Error Saving");

                    }


                }
            });
        }




    } else {
        alert("Datos Obligatorios Faltantes");
    }
}

function Action_Autoclean() {
    var controlborrar = document.getElementsByClassName("autoclean");
    for (var i = 0; i < controlborrar.length; i++) {
        controlborrar[i].value = "";
    }

    document.getElementById("chkServices").checked = false;

    if ($("#chkServices").is(':checked')) {
        //alert("Nevo Activo");
        $("#chkServices").attr('checked', true);
    } else {
        //alert("Nevo Baja");
        $("#chkServices").attr('checked', false);

    }
    rellenaCombos();
    var fotito = document.getElementById("imgFoto");
    fotito.src = "";
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



function btnAddUnidad_Click() {
    console.log("Adding Unidad")

    if (DatosObligatoriosenUnidad() == true) {


        var frm = new FormData();

        var DescUnidad = document.getElementById("txtUnidad").value;

        frm.append("DescUnidad", DescUnidad);


        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "btnAddUnidad_Click",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data >= 1) {
                        Unidad_Nueva = data;
                        llenarComboUnidad("", "", false);
                        document.getElementById("btnCancelUnit").click();

                    } else {
                        console.log("Error Saving Unidad");

                    }


                }
            });
        }





    } else {
        alert("Datos Obligatorios Faltantes");
    }
}


function btnAddMarca_Click() {
    console.log("Adding Marca")

    if (DatosObligatoriosenMarca() == true) {


        var frm = new FormData();


var DescMar = document.getElementById("txtMarca").value;

        frm.append("DescMar", DescMar);


        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "btnAddMarca_Click",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data >= 1) {
                        //console.log("Categoria Saved : " + data);
                        Marca_Nueva = data;
                        llenarComboMarcas("", "", false);
                        document.getElementById("btnCancelMarcas").click();

                    } else {
                        console.log("Error Saving Marca");

                    }


                }
            });
        }





    } else {
        alert("Datos Obligatorios Faltantes");
    }
}

function btnAddCategoria_Click() {
    console.log("Adding Categoria")

    if (DatosObligatoriosenCategoria() == true) {


        var frm = new FormData();
        


        //var _ID_Producto = document.getElementById("").value;
        var DescCateg = document.getElementById("txtFindCategos").value;

        frm.append("DescCateg", DescCateg);

        
        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "btnAddCategoria_Click",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data >= 1) {
                        //console.log("Categoria Saved : " + data);
                        Categoria_Nueva = data;
                        llenarComboCategos("", "", false);
                        document.getElementById("btnCancelCategorias").click();
                       
                    } else {
                        console.log("Error Saving");

                    }


                }
            });
        }

        



    } else {
        alert("Datos Obligatorios Faltantes");
    }
}


function btnAddProveedor_Click() {
    console.log("Adding Proveedor")

    if (DatosObligatoriosenProveedor() == true) {


        var frm = new FormData();



        //var _ID_Producto = document.getElementById("").value;
        var RSoc = document.getElementById("txtNombreProveedor").value;
        var CURP = document.getElementById("tB_Contact").value;
        var Telefono = document.getElementById("tB_Tel").value;
        var E_Mail = document.getElementById("tB_Email").value;
        var Calle = document.getElementById("tB_Direccion").value;
        var Tipo_Cliente = 3; /**3  Proveedor**/

        frm.append("RSoc", RSoc);
        frm.append("CURP", CURP);
        frm.append("Telefono", Telefono);
        frm.append("E_Mail", E_Mail);
        frm.append("Calle", Calle);
        frm.append("Tipo_Cliente", Tipo_Cliente);


        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "btnAddProveedor_Click",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data >= 1) {
                        //console.log("Categoria Saved : " + data);
                        Proveedor_Nuevo = data;
                        llenarComboProvee("", "", false);
                        document.getElementById("btnCancelProveedor").click();

                    } else {
                        console.log("Error Saving");

                    }


                }
            });
        }





    } else {
        alert("Datos Obligatorios Faltantes");
    }
}

function DatosObligatorios() {
    console.log("Validando");
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
            //alert("Obligatorios:[" + ControlesObligatorios.length + "]");
            ControlesObligatorios[i].parentNode.classList.remove("required");
        }

    }
    return Result;

}

function DatosObligatoriosenUnidad() {
    console.log("Validando Unidad");
    var ControlesObligatorios = document.getElementsByClassName("obligatorioUnidad");
    var Result = true;
    for (var i = 0; i < ControlesObligatorios.length; i++) {
        if (ControlesObligatorios[i].value == "") {
            
            ControlesObligatorios[i].parentNode.classList.add("required");
            Result = false;
        }
    }

    for (var i = 0; i < ControlesObligatorios.length; i++) {
        if (Result == true) {            
            ControlesObligatorios[i].parentNode.classList.remove("required");
        }

    }
    return Result;

}


function DatosObligatoriosenMarca() {
    console.log("Validando Nueva Marca");
    var ControlesObligatorios = document.getElementsByClassName("obligatorioMarca");
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
            //alert("Obligatorios:[" + ControlesObligatorios.length + "]");
            ControlesObligatorios[i].parentNode.classList.remove("required");
        }

    }
    return Result;

}

function DatosObligatoriosenCategoria() {
    console.log("Validando");
    var ControlesObligatorios = document.getElementsByClassName("obligatorioCategoria");
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
            //alert("Obligatorios:[" + ControlesObligatorios.length + "]");
            ControlesObligatorios[i].parentNode.classList.remove("required");
        }

    }
    return Result;

}


function DatosObligatoriosenProveedor() {
    console.log("Validando Proveedor");
    var ControlesObligatorios = document.getElementsByClassName("obligatorioProveedor");
    var Result = true;
    for (var i = 0; i < ControlesObligatorios.length; i++) {
        if (ControlesObligatorios[i].value == "") {
            ControlesObligatorios[i].parentNode.classList.add("required");
            Result = false;
        }
    }

    for (var i = 0; i < ControlesObligatorios.length; i++) {
        if (Result == true) {
            ControlesObligatorios[i].parentNode.classList.remove("required");
        }

    }
    return Result;

}





