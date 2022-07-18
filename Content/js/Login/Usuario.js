/**Llenado de Tabla Usuarios**/
$(function () {
    listar();

});


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
    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorLLaves = llaves[j];

            if (valorLLaves == "IIDROL" || valorLLaves == "ID_E" || valorLLaves == "ID_T") {
                continue;
            }

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




function listar() {

    $.get("listarUsuarios", function (data) {
        crearListado(["ID", "EMPLEADO", "USUARIO", "ROL ASIGNADO", "PUESTO"], data);

    })


    $.get("listarRol", function (data) {
        llenarComboRol(data, document.getElementById("cboRol"), true);
    })


    $.get("listarEmpleados", function (data) {
        llenarComboPersona(data, document.getElementById("cboPersona"), true);
    })

    $.get("listarPuestos", function (data) {
        llenarComboPuesto(data, document.getElementById("cboPuesto"), true);
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

function voz(mensaje) {

    var vozHablar = new SpeechSynthesisUtterance(mensaje);
    window.speechSynthesis.speak(vozHablar);


}



function Agregar() {
    if (datosObligarios() == true) {
        var frm = new FormData();
        var IIDUSUARIO = document.getElementById("txtIdUsuario").value;
        var nombreUsuario = document.getElementById("txtNombreUsuario").value;
        var contra = document.getElementById("txtcontra").value;
        var persona = document.getElementById("cboPersona").value;
        var typeperson = document.getElementById("cboPuesto").value;
        var rol = document.getElementById("cboRol").value;
        var nombrePersona = document.getElementById("cboPersona").options[document.getElementById("cboPersona").selectedIndex].text;

        frm.append("IIDUSUARIO", IIDUSUARIO);
        frm.append("nombreUsuario", nombreUsuario);
        frm.append("CONTRA", contra);
        frm.append("ID_E", persona);
        frm.append("TIPOUSUARIO", typeperson);
        frm.append("ID_ROL", rol);
        frm.append("nombreCompleto", nombrePersona);
        frm.append("BHABILITADO", 1);

        //alert(nombrePersona);

        if (confirm("¿Desea realmente guardar?") == 1) {
            $.ajax({
                type: "POST",
                url: "guardarDatos",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        alert("Se guardo correctamente");
                        document.getElementById("btnCancelar").click();
                        voz("Se registro correctamente el usuario " + nombreUsuario);
                        listar();
                    } else {
                        if (data == -1) {
                            alert("Ya existe en la base de datos");
                            voz("Ya existe en la base de datos el usuario " + nombreUsuario);
                        }else
                        alert("Ocurrio un error");

                    }

                }


            });
        }


    }

}




function llenarComboRol(data, control, primerElemento) {
   /// alert(JSON.stringify(data));
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].R_ID + "'>";

        contenido += data[i].R_NAME;

        contenido += "</option>";

    }
    control.innerHTML = contenido;
}

function llenarComboPersona(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].IdEmpleado + "'>";

        contenido += data[i].NameComplete;

        contenido += "</option>";

    }
    control.innerHTML = contenido;
}

function llenarComboPuesto(data, control, primerElemento) {
  //  alert(JSON.stringify(data));
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].id + "'>";

        contenido += data[i].tipo;

        contenido += "</option>";

    }
    control.innerHTML = contenido;
}

function abrirModal(id) {
    
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }

    if (id == 0) {
        document.getElementById("lblTitulo").innerHTML = "Agregar Usuario";
        voz("Agregando un nuevo usuario");
        document.getElementById("lblContra").style.display = "block";
        document.getElementById("txtcontra").style.display = "block";

        document.getElementById("lblPersona").style.display = "block";
        document.getElementById("cboPersona").style.display = "block";


        borrarDatos();
    } else {
        document.getElementById("lblTitulo").innerHTML = "Editar Usuario";

        document.getElementById("txtcontra").value = "1";
        document.getElementById("cboPersona").value = "2";

        document.getElementById("lblContra").style.display = "none";
        document.getElementById("txtcontra").style.display = "none";

        document.getElementById("lblPersona").style.display = "block";
        document.getElementById("cboPersona").style.display = "block";
     

        $.get("recuperarInformacion/?idUsuario=" + id, function (data) {
            
            document.getElementById("txtIdUsuario").value = data[0].idUsuario;

            document.getElementById("txtNombreUsuario").value = data[0].nombreUsuario;

            //voz("Editando el  usuario " + data.NOMBREUSUARIO);
            document.getElementById("cboRol").value = data[0].IIDROL;
            document.getElementById("cboPersona").value = data[0].ID_E;
            document.getElementById("cboPuesto").value = data[0].ID_T;

        })

    }

}

function eliminar(id) {

        $.get("EliminarUser/?idUsuario=" + id, function (data) {

            if (data == 1) {
                alert("Se elimino correctamente");
              
                listar();
            } else {
                
                    alert("Ocurrio un error");

            }

        })

}



function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }

}

function Chat() {

    alert("Hola Mundo");

}