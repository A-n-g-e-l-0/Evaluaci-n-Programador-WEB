// A $( document ).ready() block.
$(document).ready(function () {
    //alert("Cargando Info del user");   Se leee en todas partes, :D

    $.get("LoadUsuario", function (data) {
        //alert(JSON.stringify(data, null, 4));

        if (!data.length > 0){
            //window.location.href = '/Login/Login';
        } else {

            document.getElementById("NameUser").innerHTML = data[0].NameComplete;

        }
    

    });



});