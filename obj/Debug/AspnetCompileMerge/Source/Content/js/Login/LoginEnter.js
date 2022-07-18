function LoginEnter() {

   //alert("Hola* " + document.getElementById("exampleInputEmail").value);
    var frm = new FormData();
    var valIdEmpleado = document.getElementById("exampleInputEmail").value;
    frm.append("NameComplete", valIdEmpleado);
    var valCB = document.getElementById("exampleInputPassword").value;
    frm.append("CBEmpleado", valCB);

    $.ajax({
        type: "POST",
        url: "Login/login_Click",
        data: frm,
        contentType: false,
        processData: false,
        success: function (data) {

            if (data.length >= 1) {
                window.location.href = 'Home/Index';//los parametros del ususario se van en las propiedades del session, entonces ahi podemos tomar esos valores
            } else {
                alert("Falla");
            }


        }
    });
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




