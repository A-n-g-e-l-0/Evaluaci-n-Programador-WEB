var Datita;
var date = new Date();

window.onload = function () {
    console.log("ready!");

    $("#txtMesage").hide();
    $("#btnEnvMens").hide();
    $("#EnviarMsgG").hide();
    $("#txtIdGrupo").hide();

};


function Chat(clicked_id) {

    console.log("Hola Mundo " + clicked_id);
    var ContentChat = "";

    $.get("LoadMensajes/?PersonUserTo=" + clicked_id, function (data) {
        console.log("Datita " + JSON.stringify(data));

        Datita = data;

        for (var i = 0; i < Datita.length; i++) {

            if (Datita[i].Tipo == "out") {

                ContentChat += "<div class='row w-100'><p class='alert alert-primary  w-50 float-left'   role='alert'> " + Datita[i]._DateTime+" - " + Datita[i].Msg + "</p> </div></br>";
            } else {
                ContentChat += "<div class='row'><div class='w-100 ' role='alert'><label class='alert alert-success float-right'>" + Datita[i]._DateTime + " - " + Datita[i].Msg + "</label></div></div></br>";
            }
        }

        console.log(ContentChat);
        var PersonUserTo = "<h5 class='PersonToId'>" + clicked_id + "</h5>";
        document.getElementById("Chating").innerHTML = ContentChat;
        document.getElementById("PersonTo").innerHTML = PersonUserTo;
        document.getElementById("txtMesage").value = "";
        //setInterval(Chat(clicked_id), 10000);
        $("#EnviarMsgG").hide();
        $("#btnEnvMens").show();
        $("#txtMesage").show();
    });

    
    
}

function EnviarMensaje() {
    //console.log("Enviando Mensaje" + document.getElementById("txtMesage").value);

    

    var SendInfo =  {
        _DateTime: formatDate(date, false),
        Tipo : "out",
        Msg: document.getElementById("txtMesage").value,
        PersonUserTo : $(".PersonToId").text()
    };


    $.ajax({
        type: "POST",
        url: "SendMesage",
        data: JSON.stringify(SendInfo),
        contentType: "application/json; charset=utf-8",
        
        success: function (data) {
            if (data != '') {
                console.log("Saved  " + data);

                var parts = data.split("|");
                console.log(parts);

                Chat(parts[0]);


            } else {
                console.log("Error Saving" + data);

            }


        }
    });
}

function EnviarMensajeGrupal() {
    console.log("Enviando Mensaje Grupal : [" + document.getElementById("txtMesage").value+"]");

    var SendInfo = {
        _DateTime: formatDate(date, false),
        Tipo: "out",
        Msg: document.getElementById("txtMesage").value,
        HGID: document.getElementById("txtIdGrupo").value
    };

    console.log('Sending msg Infinitygroup :  ' + SendInfo.HGID);

    $.ajax({
        type: "POST",
        url: "SendMesageGrupal",
        data: JSON.stringify(SendInfo),
        contentType: "application/json; charset=utf-8",

        success: function (data) {
            if (data != '') {
                console.log("Mensaje guardado en : " + data);
                
                ChatGrupal(data);


            } else {
                console.log("Error Saving" + data);

            }


        }
    });
}

function formatDate(date, dt) {
    /**For CB**/
    if (dt == null) {


        var parts = date.split("-");
        //console.log(parts);
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

function InsertaGrupo(PersonOrigin) {
    console.log("Iniciando con los grupos" + PersonOrigin);
    var grupo = {
        HGID: uuidv4(),
        HGPUS: document.getElementById("txtPersons").value,
        HGPU: PersonOrigin,
        HGNAME: document.getElementById("txtGroup").value


};
    console.log("Enviando Grupo Form" + grupo.HGID);


    $.ajax({
        type: "POST",
        url: "CrearGrupo",
        data: JSON.stringify(grupo),
        contentType: "application/json; charset=utf-8",

        success: function (data) {
            if (data != '') {
                console.log("Saved  " + data);
                LoadGroups(data);
            } else {
                console.log("Error Saving" + data);

            }


        }
    });


}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function LoadGroups(PersonCreator) {
    console.log("Hola Grupo de " + PersonCreator);
    var ContentChat = "";

    $.get("PaintGrupos", function (data) {
        console.log("DatitaGrupal " + JSON.stringify(data));

        Datita = data;

        location.reload();

    });




}

function ChatGrupal(_HGID) {

    console.log("Chat Grupal Load Mensajes y Personas del grupo : " + _HGID);

    var ContentChat = "";

    $.get("LoadMensajesGrupal/?HGID=" + _HGID, function (data) {
        console.log("Mensajes :  " + JSON.stringify(data));

        Datita = data;

        for (var i = 0; i < Datita.length; i++) {

            if (Datita[i].Tipo == "out") {

                ContentChat += "<div class='row w-100'><p class='alert alert-primary  w-50 float-left'   role='alert'> " + Datita[i]._DateTime + " - " + Datita[i].PersonUser + " - " + Datita[i].Msg + "</p> </div></br>";
            } else {
                ContentChat += "<div class='row'><div class='w-100 ' role='alert'><label class='alert alert-success float-right'>" + Datita[i]._DateTime + " - " + Datita[i].PersonUser + " - " + Datita[i].Msg + "</label></div></div></br>";
            }
        }

        $.get("LoadPersonasGrupal/?HGID=" + _HGID,
            function(data) {
                console.log("Personas " + JSON.stringify(data));

                Datita = data;

                console.log(ContentChat);
                var GroupUserssTo = "<h5 class='PersonToId'>" + Datita + "</h5>";
                document.getElementById("Chating").innerHTML = ContentChat;
                document.getElementById("PersonTo").innerHTML = GroupUserssTo;
                document.getElementById("txtMesage").value = "";
                document.getElementById("txtIdGrupo").value = _HGID;



                $("#btnEnvMens").hide();
                $("#EnviarMsgG").show();
                $("#txtMesage").show();
            });


        

    });


}