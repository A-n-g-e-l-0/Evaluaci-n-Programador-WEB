var datita = [];

/**Llenado de Tabla Usuarios**/
$(function () {
    console.log("Calling Fuction List Products")
    listar();

});



function listar() {

    $.get("ListarProductosenTabla", function (data) {
        crearListadoProductos(data);

    })

}

function crearListadoProductos(data) {
    //alert(data);
    var contenido = "";

    contenido += "<table id='tabla_productos' class='table'>";
    contenido += "<thead>              ";
    contenido += "<tr>                 ";
    contenido += "<td>Clave</td> ";
    contenido += "<td>Descripción</td>     ";
    //contenido += "<td>Puesto</td>     ";
    contenido += "<td>Precio Venta</td>     ";
    contenido += "<td>Detalles</td>     ";
    contenido += "</tr>                ";
    contenido += "</thead>             ";
    contenido += "<tbody>              ";
    for (var i = 0; i < data.length; i++) {
        // alert(data[i].E_FechaIngreso);
        contenido += "<tr>";
        contenido += "<td>" + data[i].CLAVE + "</td>";
        contenido += "<td>" + data[i].PRODUCTO + "</td>";
        // contenido += "<td>" + data[i].Puesto + "</td>";
        contenido += "<td>" + data[i].PRECIO + "</td>";
        

        contenido += "<td><button type='button' class='btn btn-info btn-circle btn-lg' data-toggle='modal' data-target='#ModalProducto' onclick='Action_Producto(" + data[i].ID_PRODUCTO + ")'>";
        contenido += "<i class='fas fa-info-circle'></i></button></td>";

        contenido += "</tr>                       ";
    }
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("dataTableProductos").innerHTML = contenido;

    $("#tabla_productos").dataTable({
        searching: true
    });
}





function Action_Producto(id) {

    
    
        /***Limpieza del formulario*/
        var controlborrar = document.getElementsByClassName("obligatorio");
        for (var i = 0; i < controlborrar.length; i++) {
            controlborrar[i].parentNode.classList.remove("required");
        }

       /*Get empleado por ID*/

    $.get("DetalleProductoporId/?idProducto=" + id, function (data) {
            // alert(JSON.stringify(data));
            // alert(_arrayBufferToBase64(data[0].E_Avatar));  funcional 201109_1802

        datita = data;

        document.getElementById("txtRex").value = data[0].CLAVE
            //document.getElementById("txtCB").value = data[0].CBEmpleado;
        document.getElementById("chkServices").checked = data[0].SERVICIO;
        document.getElementById("txtDescrpcion").value = data[0].PRODUCTO;
        //document.getElementById("ddlMarcas").disabled = false;
        document.getElementById("ddlMarcas").value = data[0].ID_MARCA;
        document.getElementById("ddlUnidades").value = data[0].ID_UNIDAD;
        document.getElementById("ddlCategorias").value = data[0].ID_CATEGORIAS;
        document.getElementById("ddlProveedor").value = data[0].ID_PROVEEDOR;
        document.getElementById("txtExistencias").value = data[0].EXISTENCIAS;
            //document.getElementById("datepickerFIngreso").value = formatDate(new Date(parseInt((data[0].E_FechaIngreso).substr(6))), true);
            //document.getElementById("datepickerFNacimiento").value = formatDate(new Date(parseInt((data[0].E_FechaNacimiento).substr(6))), true);
        document.getElementById("txtPrecioCompra").value = data[0].COMPRA;
        document.getElementById("txtPrecioVenta").value = data[0].PRECIO;
        document.getElementById("txtMargenGanancia").value = data[0].PORC_GANANCIA;
        document.getElementById("imgFoto").src = "data:image/jpeg;base64," + _arrayBufferToBase64(data[0].AVATAR);

            //SelectedxMostrarinCB = data[0].E_Sucursal;
            //selectElement("cboSucursalEleccion", SelectedxMostrarinCB);
        });

    
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