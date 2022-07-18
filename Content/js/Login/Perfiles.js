
///**
//  Se Cargan Paginas dependiendo el perfi 210116 AOSM 
 
// */
//$(document).ready(function () {
//    //alert("Cargando Perfiles");  

//    $.get("ObtenPerfil", function (data) {
//      //  alert(JSON.stringify(data, null, 4));

        
//        var Head = "";
//        var Body = "";
//        for (var i = 0; i < data.length; i++) {
//          //  alert(data[i].P_SEQ);
                        
//            if (data[i].P_SEQ == 0) {
//                Head = Head.replace("Replace", Body);
               // Body = "";
               //     Head += "<li>";
               //     Head += "<a class='nav-link collapsed' href='#'"
               //     +"  data-toggle='collapse' data - target='#collapseUtilities'"
               //     +"  aria-expanded='true' aria - controls='collapseUtilities' >"
               //    + "      <i class='fas fa-users'></i>"
               //    + "      <span>" + data[i].P_NAME + "</span>"
               //    + "  </a >";

               //     Head += "<div id='collapseUtilities' class='collapse'"
               //     +" aria-labelledby='headingUtilities'"
               //    + " data-parent='#accordionSidebar' >"
               //    + "    <div class='bg-white py-2 collapse-inner rounded'>"
               //    + "        <h6 class='collapse-header'>Lista de" + data[i].P_NAME + "</h6>"
               //     +"       Replace"
               //     +"</div>"
               //    + "</div>"
               //    + "</li>"
               //+ "";
//                //alert(Head);
//                    //document.getElementById("_MyMenu").innerHTML = Head;//Pintamos las Paguinitas
//                } else {
                
//                Body += "<a class='collapse-item' href='@Url.Action(\"" + data[i].P_CONTROLLER + "\",\"" + data[i].P_ACTION + "\"'><i class='fas fa-user-check'></i><span>     " + data[i].P_NAME + "</span></a>";

                
//            }

            

//        }
        
       
//        document.getElementById("_MyMenu").innerHTML = Head;

//    });
//});