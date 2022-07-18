
/**Llenado de Menu de Tiendas Matrix**/
$.get("GetTiendas/?ID_Tienda=0", function (data) {
    //alert(JSON.stringify(data, null, 4));
    crearListadoTiendas(["Sucursal", "Direccion", "Detalles"], data);
});/**END Llenado de Menu de Tiendas Matrix**/

/**AOSM 200921_0844 Nuevo js Listar Tiendas en Menu
 * La data viene de la vista, en la vista transforma el Json
 * @param {any} data
 */
function crearListadoTiendas(arrayColumnas, data) {
    //alert(JSON.stringify(data));

    var contenido = "";
    var TabPaneFades = "";

    for (var i = 0; i < data.length; i++) {
        

        if (i == 0) {
            //Tiendas
            contenido += "<li class='nav-item bg-dark'>";
            contenido += "<a class='nav-link collapsed text-white showTienda' href='#' ";
            contenido +=    "data-toggle='collapse' ";
            contenido +=    "data-target='#collapseT" + data[i].ID_Tienda + "' "; //T De Tiendas
            contenido +=    "aria-expanded='true' aria-controls='collapseT" + data[i].ID_Tienda + "' " +
                            "data-Id='" + data[i].ID_Tienda + "' " +
                            "data-whatever='" + data[i].Descripcion + "|" + data[i].Direccion +"|"+0+"'> ";  //0-Tiendas 1-Sucursales para la eliminación
            contenido +=    "<i class='fas fa-warehouse'></i><span>"+ data[i].Descripcion +"</span>";
            contenido += "</a>";

            //Sucursales
            contenido += "<div id='collapseT" + data[i].ID_Tienda + "' class='collapse' ";
            contenido +=       "aria-labelledby='headingT" + data[i].ID_Tienda + "' ";
            contenido +=       "data-parent='#accordionSidebarMenuTiendasMatriz'> ";
            contenido += "  <div class='bg-white py-2 collapse-inner rounded'>";
            contenido += "       <h6 class='collapse-header'>SUCURSALES</h6>";
            contenido += "       <div id='divSucursal_" + data[i].ID_Tienda + "'>";
            SeleccionaSucursales(data[i].ID_Tienda);
            contenido += "       </div>";
            contenido += "       <a class='collapse-item Cleaning passingID' href='#' data-toggle='modal' data-target='#ModalSucursal' ";
            contenido += "              data-Id='" + data[i].ID_Tienda + "' ";
            contenido+="                data-whatever='" + data[i].Descripcion + "' > <i class='fas fa-plus'></i></a>";
            contenido += "  </div>";
            contenido += "</div>";

            contenido += "</li>";
        } else {

        /**Divider**/

            contenido += "<hr style='margin:.1px;'>";

            //Tiendas
            contenido += "<li class='nav-item bg-dark'>";
            contenido += "<a class='nav-link collapsed text-white showTienda' href='#' ";
            contenido += "data-toggle='collapse' ";
            contenido += "data-target='#collapseT" + data[i].ID_Tienda + "' "; //T De Tiendas
            contenido += "aria-expanded='true' aria-controls='collapseT" + data[i].ID_Tienda + "' " +
                         "data-Id='" + data[i].ID_Tienda + "' " +
                         "data-whatever='" + data[i].Descripcion + "|" + data[i].Direccion + "|" + 0 + "'> ";  //0-Tiendas 1-Sucursales para la eliminación
            contenido += "<i class='fas fa-warehouse'></i><span>" + data[i].Descripcion + "</span>";
            contenido += "</a>";

            //Sucursales
            contenido += "<div id='collapseT" + data[i].ID_Tienda + "' class='collapse' ";
            contenido += "aria-labelledby='headingT" + data[i].ID_Tienda + "' ";
            contenido += "data-parent='#accordionSidebarMenuTiendasMatriz'> ";
            contenido += "  <div class='bg-white py-2 collapse-inner rounded'>";
            contenido += "       <h6 class='collapse-header'>SUCURSALES</h6>";
            contenido += "       <div id='divSucursal_" + data[i].ID_Tienda + "'>";
            SeleccionaSucursales(data[i].ID_Tienda);
            contenido += "       </div>";
            contenido += "       <a class='collapse-item Cleaning passingID' href='#' data-toggle='modal' data-target='#ModalSucursal' ";
            contenido += "          data-Id='" + data[i].ID_Tienda + "' ";
            contenido += "          data-whatever='" + data[i].Descripcion + "' > <i class='fas fa-plus'></i></a>";
            contenido += "     </div>";
            contenido += "</div>";

            contenido += "</li>";
        }
    }

    /**201016_1325 Lanzador Modal Nueva Tienda Matriz**/
    contenido += "<hr class='dropdown-divider'>";

    contenido += "<li class='nav-item'>";
    contenido += " <a class='nav-link collapsed Cleaning' href='#' data-toggle='modal' data-target='#ModalTienda'>";
    contenido += "<i class='fas fa-plus' ></i>";
    contenido += "</a>";
    contenido += "</li>";

    document.getElementById("accordionSidebarMenuTiendasMatriz").innerHTML = contenido;
   
}


function Generar_Tab_Pane_Fade(ID_Tienda, spliting) {
    var arrayDeCadenas = spliting.split('|');
   // alert(arrayDeCadenas);
    var TabPaneFade = "";
    //< !--Card Heading-- >
    TabPaneFade += 
                        "   <div class='card-header text-white bg-dark mb-3  d-sm-flex align-items-center justify-content-between mb-4'>" +
                            "   <h1 class='h3 mb-0'> " + arrayDeCadenas[0] + " </h1>" +
                            "</div>" +
        
                            //< !--Card Body -- >
                            "<div class='card-body bg-light mb-3'>" +
                                    "<label for='TPF_txtDireccion'>Dirección</label>"+
                                    "<textarea class='form-control' id='TPF_txtDireccion' rows='3'>" + arrayDeCadenas[1] + "</textarea>"+
                                    //"<h5 class='card-title'>Dirección</h5>"+
                                    //"<p class='card-text'>" + arrayDeCadenas[1] + "</p>" +
                            "</div>"+

                            //Card Footer
                            "<div class='card-footer text-white bg-info'>" +
    
                                                    "<div class='float-right'>" +
                                                    "       <a href='#'  " +
                                                    "      class='btn btn-primary updTienda' " +
                                                    "      data-Id='" + ID_Tienda + "' " +
                                                    "      data-whatever='" + arrayDeCadenas[0] + "|" + arrayDeCadenas[2] + "'>" +   //DESCRIPCION Y Tomara el valor 0 o 1 para saber que actualizara
                                                    "    <i class='fas fa-map-marked'></i>     Actualizar" +
                                                    " </a>   " +

                                                    "   <a href='#'  " +
                                                    "      class='btn btn-danger delTienda' " +
                                                    "      data-Id='" + ID_Tienda + "' " +
                                                    "      data-whatever='" + arrayDeCadenas[0] + "|" + arrayDeCadenas[2] + "'>" +   //DESCRIPCION Y Tomara el valor 0 o 1 para saber que eliminara
                                                    "    <i class='fas fa-trash'></i>     Eliminar" +
                                                    " </a>        " +

                           
                            "</div>" +

        "</div>";
    return TabPaneFade;
}

$(document).on("click", ".showTienda", function () {
    var ShowInfoTienda = Generar_Tab_Pane_Fade($(this).data('id'), $(this).data('whatever'));
    document.getElementById("nav-tabContent").innerHTML = ShowInfoTienda;
});


$(document).on("click", ".passingID", function () {
    var myTienda = $(this).data('whatever');
    var myIdTienda = $(this).data('id');
   //alert(myIdTienda + myTienda);                         //201021_1107 Funcion, se envia Id y Nombre Tienda al Modal Sucursal
    $(".modal-body #idkl_TiendaID").val(myIdTienda);
    $(".modal-body #idkl_Tienda").val(myTienda);    
});

$(document).on("click", ".Cleaning", function () {
    Action_Autoclean();                                 // Se limpian textbosex de los modal
});

$(document).on("click", ".delTienda", function () {

    var arrayDeCadenas = $(this).data('whatever').split('|');

    var myIdTienda = $(this).data('id');
    var myTienda = arrayDeCadenas[0];//Descripcion
    var myIdSuc = arrayDeCadenas[1];//llegan 0 o 1 0-tienda, 1-sucursal

    
    //alert(myIdTienda);

/**llenamos datamodel2 TiendaMtrix**/
    var frmTienda = new FormData();                           //Formulario para Tienda
    frmTienda.append("ID_Tienda", myIdTienda);                //ID Tienda a Eliminar
    frmTienda.append("Descripcion", myIdSuc);
    frmTienda.append("T_ACTIVE", "");
    frmTienda.append("Direccion", "");

    if (myIdSuc == 0) {
        if (confirm("¿Desea eliminar Tienda Matriz [" + myTienda + "] Permanentemente?") == 1) {
            $.ajax({
                type: "POST",
                url: "DeleteTienda",
                data: frmTienda,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                       // alert("Se Elimino Correctamente");
                        SeleccionaTiendas();
                        document.getElementById("btnCancel").click();
                    } else {
                        alert("Falla, No se Elimina : [" + data + "]");
                    }
                }
            });
        }
    } else {
        if (confirm("¿Desea eliminar Sucursal [" + myTienda + "] Permanentemente?") == 1) {
            $.ajax({
                type: "POST",
                url: "DeleteSucursal",
                data: frmTienda,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        SeleccionaTiendas();
                        document.getElementById("btnCancel").click();
                    } else {
                        alert("Falla, No se Elimina : [" + data + "]");
                    }
                }
            });
        }
    }
    
  
    document.getElementById("nav-tabContent").innerHTML = "";

});


$(document).on("click", ".updTienda", function () {

    var arrayDeCadenas = $(this).data('whatever').split('|');

    var myIdTienda = $(this).data('id');
    var myTienda = arrayDeCadenas[0];//Descripcion
    var myIdSuc = arrayDeCadenas[1];//llegan 0 o 1 0-tienda, 1-sucursal
    var myAddress = document.getElementById("TPF_txtDireccion").value;//Direccion a Actualizar


   // alert(myIdTienda + "-" + myAddress);

    /**llenamos datamodel2 TiendaMtrix**/
    var frmTienda = new FormData();                           //Formulario para Tienda
    frmTienda.append("ID_Tienda", myIdTienda);                //ID Tienda a Eliminar
    frmTienda.append("Descripcion", "N/A");
    frmTienda.append("T_ACTIVE", "");
    frmTienda.append("Direccion", myAddress);

    if (myIdSuc == 0) {
        if (confirm("¿Desea Actualizar Tienda Matriz [" + myTienda + "]?") == 1) {
            $.ajax({
                type: "POST",
                url: "UpdateTienda",
                data: frmTienda,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        SeleccionaTiendas();
                        document.getElementById("btnCancel").click();
                    } else {
                        alert("Falla, No se Actualiza : [" + data + "]");
                    }
                }
            });
        }
    } else {
        if (confirm("¿Desea Actualizar Sucursal [" + myTienda + "]?") == 1) {
            $.ajax({
                type: "POST",
                url: "UpdateSucursal",
                data: frmTienda,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        SeleccionaTiendas();
                        document.getElementById("btnCancel").click();
                    } else {
                        alert("Falla, No se Actualiza : [" + data + "]");
                    }
                }
            });
        }
    }


    document.getElementById("nav-tabContent").innerHTML = "";

});

function Validar() {
    EnviarDatosTiendaaSQL();
}

function ValidarSucursal() {
    EnviarDatosSucursalaSQL();
}

function EnviarDatosTiendaaSQL() {
    if (DatosObligatorios(0) == true) {                                         //0-Nueva Tienda

        var frmTienda = new FormData();                                         //Formulario para Tienda
        var valTiendaShortName = document.getElementById("txtTienda").value;
        var valDireccion = document.getElementById("txtDireccionTienda").value;


        /**llenamos Tabla Tienda**/
        frmTienda.append("ID_Tienda", 0);                //0-Nueva Tienda
        frmTienda.append("Descripcion", valTiendaShortName);
        frmTienda.append("T_ACTIVE", 1);
        frmTienda.append("Direccion", valDireccion);
        
        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "Create",
                data: frmTienda,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        alert("Se Guarda la Información para : [" + valTiendaShortName + "]");
                        SeleccionaTiendas();
                        document.getElementById("btnCancel").click();
                    } else {
                        alert("Falla, No se Guarda : [" + data + "]");
                    }
                }
            });
        }

    }

       
}

function DatosObligatorios(forwho) {

    if (forwho != 0) {

        var ControlesObligatorios = document.getElementsByClassName("obligatoriosuc");

        for (var i = 0; i < ControlesObligatorios.length; i++) {
            if ("" == (ControlesObligatorios[i].value) || "..." == (ControlesObligatorios[i].value)) {
                ControlesObligatorios[i].parentNode.classList.add("required");
                return false;
            } else {
                ControlesObligatorios[i].parentNode.classList.remove("required");
            }
        }
    } else {
        var ControlesObligatorios = document.getElementsByClassName("obligatorio");
        //alert("Obligatorios:[" + ControlesObligatorios.length + "]");

        for (var i = 0; i < ControlesObligatorios.length; i++) {
            //alert(ControlesObligatorios[i].value);
            if ("" == (ControlesObligatorios[i].value) || "..." == (ControlesObligatorios[i].value)) {
                ControlesObligatorios[i].parentNode.classList.add("required");
                return false;
            } else {
                ControlesObligatorios[i].parentNode.classList.remove("required");
            }
        }
    }
    return true;
}


function SeleccionaTiendas() {
    $.get("GetTiendas/?ID_Tienda=0", function (data) {
            crearListadoTiendas(["Sucursal", "Direccion", "Detalles"], data);
        });
}


function SeleccionaSucursales(Id_Tienda) {
   

    $.get("GetSucursales/?ID_Tienda="+Id_Tienda+"", function (data) {
      
        if (data.length > 0) {
            var contenido = "";
           // alert("Id Tienda :["+Id_Tienda +"]:"+ JSON.stringify(data));  // FUNCIONA 201023_1732  ES NECESARIO TRAER CON LOS NOMBRES DADOS DE ALTA EN EL model2
            for (var i = 0; i < data.length; i++) {
                contenido += "<a class='collapse-item showTienda' href='#' " +
                                    "data-Id='" + data[i].ID_Tienda + "' " +
                                    "data-whatever='" + data[i].Descripcion + "|" + data[i].Direccion + "|" + 1 + "'>" + data[i].Descripcion + "" +//0-Tiendas 1-Sucursales para la eliminación
                             "</a>";
            }
           // alert(contenido);
            document.getElementById("divSucursal_" + Id_Tienda + "").innerHTML = contenido;
        }
        
       
    });
    
    
}

function EnviarDatosSucursalaSQL() {

    var frmSucursal = new FormData(); //Formulario para Sucursal
    var valSucursalName = document.getElementById("txtSucursal").value;
    var valDireccion = document.getElementById("txtDireccionSucursal").value;
    var valIdTienda = document.getElementById("idkl_TiendaID").value;
   // alert(valDireccion + valFlagTienda);

    if (DatosObligatorios(valIdTienda) == true) {

        /**llenamos Tabla Sucursales**/

        frmSucursal.append("Descripcion", valSucursalName);
        frmSucursal.append("T_ACTIVE", 1);
        frmSucursal.append("Direccion", valDireccion);
        frmSucursal.append("ID_Tienda", valIdTienda);                //!0 - Nueva Sucursal

        if (confirm("¿Desea guardar los cambios?") == 1) {
            $.ajax({
                type: "POST",
                url: "Create",
                data: frmSucursal,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        alert("Se Guarda la Información para : [" + valSucursalName + "]");
                        SeleccionaTiendas();
                        document.getElementById("btnCancelSuc").click();
                    } else {
                        alert("Falla, No se Guarda : [" + data + "]");
                    }
                }
            });
        }
    }
}

function Action_Autoclean() {
    var controlborrar = document.getElementsByClassName("autoclean");
    for (var i = 0; i < controlborrar.length; i++) {
        controlborrar[i].value = "";
    }
}