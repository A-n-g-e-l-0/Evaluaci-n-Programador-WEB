$(function () {

    listar();
    
});

function listar(){

    $.get("listarRol", function (data) {
        crearListado(["Id Rol", "Nombre", "Descripcion", "Activo"], data);
    });
}

function crearListado(arrayColumnas, data) {
    var contenido = "";
    contenido += "<table id='tablas'  class='table' >";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";

    }
    contenido += "<td>Operaciones</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    var llaves = Object.keys(data[0]);
    //alert(llaves);
    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorLLaves = llaves[j];
            contenido += "<td>";
            contenido += data[i][valorLLaves];
            contenido += "</td>";

        }
        var llaveId = llaves[0];
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='far fa-edit'></i></button> "
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] + ")' ><i class='fas fa-trash'></i></button>"
        contenido += "</td>"

        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tablas").dataTable(
        {
            searching: false
        }

        );
}

function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }

}

var idRol;
function abrirModal(id) {
    idRol = id;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }

    $.get("listarPaginas", function (data) {

        var contenido = "<tbody>";

        for (var i = 0; i < data.length; i++) {
            //alert(data[i].SEQUENCIA);

            if (data[i].SEQUENCIA == 0) {
                contenido += "<tr>";
                contenido += "<td>";
                contenido += "<input class='checkbox' type='checkbox' id='" + data[i].IDPAGINA + "' />"
                contenido += "</td>";
                contenido += "<td><h4 class='h4'> <hr class='sidebar-divider my-3'>";
                contenido += data[i].NOMBRE;
                contenido += "</h4> <hr class='sidebar-divider my-3'></td>";
                contenido += "</tr>";
            } else {
                contenido += "<tr>";
                contenido += "<td><h7 class='h7'>";
                contenido += "<input class='checkbox' type='checkbox' id='" + data[i].IDPAGINA + "' />"
                contenido += "</h7></td>";
                contenido += "<td><h7 class='h7'>";
                contenido += data[i].NOMBRE;
                contenido += "</h7></td>";
                contenido += "</tr>";
            }

            

        }

        contenido += "</tbody>";
        document.getElementById("tblPagina").innerHTML = contenido;//Pintamos las Paguinitas
        if (id > 0) {
            obtenerPaginasRol();
        }
    })


    if (id == 0) {
        borrarDatos();
    } 
}

function obtenerPaginasRol() {

    $.get("listarRolPagina/?idRol=" + idRol, function (data) {
        //alert(JSON.stringify(data));
        var nregistros = data.length;
        for (var i = 0; i < nregistros; i++) {
            if (data[i].RP_H == 1) {
                document.getElementById(data[i].RP_P_ID).checked = true;
            }

        }


    })


    $.get("obtenerRol/?idRol=" + idRol, function (data) {
        
        document.getElementById("txtIdRol").value = data[0].R_ID;
        document.getElementById("txtNombreRol").value = data[0].R_NAME;
        document.getElementById("txtDescripcion").value = data[0].R_DESC;
    })
}


function datosObligarios() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }

    return exito;
}

function Agregar(){

    if (datosObligarios() == true) {
        var frm = new FormData();
        var idrol=document.getElementById("txtIdRol").value;
        var nombre = document.getElementById("txtNombreRol").value;
        var descripcion = document.getElementById("txtDescripcion").value;

        frm.append("R_ID", idrol);
        frm.append("R_NAME", nombre);
        frm.append("R_DESC", descripcion);
        frm.append("R_H", 1);

        var checkbox = document.getElementsByClassName("checkbox");
        var ncheckbox = checkbox.length;
        var dataEnviar = "";
        for (var i = 0; i < ncheckbox; i++) {

            if (checkbox[i].checked == true) {
                dataEnviar += checkbox[i].id;
                dataEnviar += "$";
            }

        }
        dataEnviar = dataEnviar.substring(0, dataEnviar.length - 1);
        frm.append("dataAEnviar", dataEnviar);
        

        $.ajax({
            type: "POST",
            url: "guardarDatos",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
               
                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    alert("Se guardo correctamente");
                    document.getElementById("btnCancelar").click();
                    listar();
                }

            }


        });


    }

}

function eliminar(id) {
    var frm = new FormData();
    $.get("obtenerRol/?idRol=" + id, function (data) {
        
        frm.append("R_ID", data[0].R_ID);
        frm.append("R_NAME", data[0].R_NAME);
        frm.append("R_DESC", data[0].R_DESC);
        frm.append("R_H", 0);
        $.ajax({
            type: "POST",
            url: "DeleteRol",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {

                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    alert("Se Elimino correctamente");
                    listar();
                }

            }


        });  
    })
        
        
}
