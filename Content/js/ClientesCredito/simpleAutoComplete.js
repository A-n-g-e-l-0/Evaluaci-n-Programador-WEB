/*
    Simple AutoComplete plugin for jQuery
    Author: Mario Arrieta
    Version: 1.0.0 {10-08-2010}
 * 
 
 * $('selector').simpleAutoComplete("ajax_query.aspx.cs", {
 *	identifier: 'estado',
 *	extraParamFromInput: '#extra',
 *	extraParamFromInput2: '#extra2',
 *	attrCallBack: 'rel',
 *	autoCompleteClassName: 'autocomplete',
 *	selectedClassName: 'sel'
 * },calbackFunction);
 * 
 */

var classAC = 'autocomplete';
var selClass = 'sel';
var attrCB = 'rel';
var thisElement = null;
var sel = false;
var posSelected = -1;

$.fn.simpleAutoComplete = function (page, options, callback) {

    //alert("Iniciando..." + JSON.stringify( Object.entries(options)));

    if (typeof (page) == "undefined") {
        alert("simpleAutoComplete: You must to especific page where will process query!");
    }

   
    //var thisElement = $(this);//Se evnia el txtbox como parametro, aqio el $() dosent work at first time

    

    //$(":not(div." + classAC + ")").click(function () {
    //    $("div." + classAC).remove();
    //});

    //thisElement.attr("autocomplete", "off");

    //thisElement.keyup(function (ev) {
    
        var getOptions = { query: "" }//ok ok no es mas que un JSON con una propiedad query y valor del textbox, buena buena



    if (typeof (options) == "object") {
       // alert("Entris about $this " + JSON.stringify(Object.entries($(this))) + ", \nget value from $this : " + thisElement.val() + ", query set value: " + JSON.stringify(Object.entries(getOptions)));

        //Se pueden definir a partir de las opciones que le mandamos from autocomplete, si no vienen, le asignamos los que declaramos mas arribita, le envie el evento por medio de optiones
            classAC = typeof (options.autoCompleteClassName) != "undefined" ? options.autoCompleteClassName : classAC;
            selClass = typeof (options.selectedClassName) != "undefined" ? options.selectedClassName : selClass;
            attrCB = typeof (options.attrCallBack) != "undefined" ? options.attrCallBack : attrCB;

            if (typeof (options.identifier) == "string")
                getOptions.identifier = options.identifier;

            if (typeof (options.extraParamFromInput) != "undefined")
            getOptions.event = options.extraParamFromInput;

            if (typeof (options.extraParamFromInput2) != "undefined")
            getOptions.query = $(options.extraParamFromInput2).val();

        thisElement = options.extraParamFromInput2;
       // alert("Cath opciones: " + classAC + selClass + attrCB + ", values getOpttions: " + JSON.stringify(Object.entries(getOptions)));
       }
    var ev = getOptions.event;

    //alert(JSON.stringify(ev));
   

    kc = ((typeof (ev.charCode) == 'undefined' || ev.charCode === 0) ? ev.keyCode : ev.charCode);
    key = String.fromCharCode(kc);

    /******************************************IMPORTANTE*******************************************************************/////////
    //alert("kc= which:"+ev.which+", charCode:"+ev.charCode+", keyCOde:"+ev.keyCode+", key parse to string s.kc:"+key); //Funciona 210429
    
       
    /*Remover clases, Lista de Pagina*/
        if (kc == 27) {
            $('div').remove('#FindOnlist');
        }
    /*END Remover clases, Lista de Pagina*/

    //****Enteer Event*****//
    if (kc == 13) {
       
        var _List = $('li.list-group-item').length;
       

        if (_List == 0) {
            alert("Lista vacía");
        }
        else {


            $('li.list-group-item').each(function (n, el) {
                console.log('Validando e:' + n);


                if ($(el).hasClass('Selected')) {
                    console.log('Existe ' + $(el).attr + ' y Posicion = ' + n + ', Valor : ' + $(el).text() + ', ID : ' + $(el).prop("id"));
                    /**LANZAMOS EVENTO LLENADOR DE INFORMACION EN PAGINA PRINCIPAL DEL CLIENTE SELECCIONADO*/

                } else {

                    console.log('no existe Selected');
                }
            });
        }
    }
   //****END Enteer Event*****//

  ///teclas ARRIBA y ABAJOOOO    40-abajo    38-arriba
    if (kc == 38 || kc == 40) {       
        var _List = $('li.list-group-item').length;
        //alert(_List); //funciona 20170617 despues de varios años 20210516 _List numero de elementos

        if (_List == 0) {
            alert("Lista vacía");
                }
                else {
            sel = false;

            $('li.list-group-item').each(function (n, el) {
                console.log('Validando e:'+n);
                //Valida si el arreglo ya tiene Selected

                if ($(el).hasClass('Selected')) {
                    console.log('Existe ' + $(el).attr + ' y Posicion = ' + n);
                    sel = true;
                    posSelected = n;
                    return false;
                    
                } else {
                    posSelected = -1;
                    console.log('no existe Selected');
                }
            });

            $('li.list-group-item').each(function (n, el) {
                console.log("Elemente existe class on : " + posSelected + ", Item Paint :  " + n);
                //alert("kc="+kc+", Element " + n + " has selected class: " + $(el).attr('class') + ", seleccionado? : " + $(el).hasClass('NotSelected') + ", ValBefore : " + $(el).prev().text()
                //+"ValNext: "+ $(el).next().text());    


                //*--Ahora seteamos donde deba aplicarse cuando oprime abajo
                if (!sel && posSelected == -1&& kc == 40 ) {
                    $(el).removeClass('NotSelected');
                    $(el).addClass('Selected');
                    posSelected = 0; 
                    sel = true;
                    console.log('Pintamos Unicamente primer Item');
                    return false;
                }
                //Ahora seteamos donde deba aplicarse cuando oprime arriba
                if (!sel && n == 6 && kc == 38) {
                    $(el).removeClass('NotSelected');
                    $(el).addClass('Selected');
                    posSelected = 0;
                    sel = true;
                    console.log('Pintamos Unicamente Ultimo Item');
                    return false;
                }
                

                    
                    if (posSelected==n)
                {
                    console.log('A partir del segundo Pintamos. Elemento{['+n+'}] has class selected: ' + $(el).hasClass('Selected'));
                        $(el).removeClass('Selected');
                        $(el).addClass('NotSelected');
                    ///////////////////**************EUREKA LOG EN EL NAVEGADOR ENCONTRADO 21525_1916****************//////////////
                    switch (kc) {
                        case 38:
                            console.log('Arriba.');
                            $(el).prev().removeClass('NotSelected');
                            $(el).prev().addClass('Selected');
                            sel = true;
                            return;
                           
                           
                            break;
                        case 40:
                            console.log('Abajo');
                            $(el).next().removeClass('NotSelected');
                            $(el).next().addClass('Selected');
                            sel = true;
                            return;
                            
                            break;
                        default:
                            console.log('Otra Tecla.');
                    }
                    
                }
            });
        }
    }
     ///END teclas ARRIBA y ABAJOOOO    40-abajo    38-arriba

    //AJAX Buscador
    if (key.match(/[a-zA-Z0-9_\- ]/) || kc == 8 || kc == 46) {
        //alert("Cath Val form txtbox: " + getOptions.query);

        /**Un AJAX .get**/
        $.ajax({
            type: "POST",
            url: "GetClients",// no me gusta asi pero me acepto los parametros /?searchTerm='HolaMundo', pero oh sorpres funciona con Post :D
            data: "{searchTerm:'" + getOptions.query + "', Identifier:'" + getOptions.identifier + "'}",
            contentType: "application/json; charset=utf-8",  //muy importantes estos valores
            dataType: false,
            success: OnSuccess,
            failure: function (response) {
                alert("failure " + response);
            },
            error: function (response) {
                alert("Error " + response);
            }
        });
    }
         //END AJAX Buscador
};

function OnSuccess(response) {
    //alert(response);
    
    /**Se Reciben DATA del BD  y se preparan Valores para Pintar*/
    var dataset = JSON.parse(response);
    var Tablas = Object.keys(dataset);
    //alert("Tablas: " + Tablas);              //Recordad, funciona como los hashmap   Obj(key,value); Retorna Table, Table1
    var Headers = Object.keys(dataset['Table'][1]); // Table lo da Tablas, los headers se obtiene con object key, cada {},{},{} -> 0,1,2 no importa el indice, solo debe existir
    //alert("Headers:" + Headers);
    /**END Se Reciben DATA del BD  y se preparan Valores para Pintar*/
    
    /**Llenado de la Lista, excelnte llenado co ID 20210626_1312**/
    var r = "";
    var n = 0;
    r += "<div class='selClass'><ul class='list-group'>";
    for (var i = 0; i < dataset['Table'].length; i++) {

           
            
        n = 0;
        for (var j = 0; j < Headers.length; j++) {
            var valorllave = Headers[j];


            if (Headers[j] == "ID") {
                r += "<li class='list-group-item NotSelected' style='width:600px' id=" + dataset['Table'][i][valorllave] + "'>";
               
            } else {

                r += "\t" + dataset['Table'][i][valorllave] + " ";
                n++;
                if(n==2)
                r += "</li>";
            }

        }

       
    }
    r += "</ul></div>";
    /**END Llenado de la Lista**/

    /**RENDERIZADO de la Lista  En Pagina **/
    $('div').remove('#FindOnlist');       //aqui ya sabemos que es css div.autocomplete
    autoCompleteList = $('<div id=\'FindOnlist\' class=\'classAC\'>').html(r);
    //alert(r); //R Viene de la funcion que llama en autocomplete cs con el identificador respectivo
    //alert(Object.entries(autoCompleteList));
    /**END RENDERIZADO de la Lista  En Pagina **/

    /**Efecto Mouse Over**/
    if (r != '') {
        autoCompleteList.insertAfter(thisElement);
        //$('.container-fluid').prepend(r);//LO MISMO PERO autocompletelIST es raro en automatico se inicializa en su tipo sin nededida del var
                        
         

                        $('div#FindOnlist li').each(function (n, el) {
                            el = $(el);
                            $(this).css({
                                'list-style': 'none',
                            });

                            el.mouseenter(function () {
                                $(this).removeClass('NotSelected');
                                $(this).addClass('Selected');
                                //$(this).css({
                                //    'background-color': '#1B2631',
                                //    'color':'#F4F6F7'
                                //});
                            });

                            el.mouseout(function () {
                                $(this).removeClass('Selected');
                                $(this).addClass('NotSelected');
                                //$(this).css({
                                //    'background-color': '#FDFEFE',
                                //    'color':'#808B96'
                                //});
                            });

                            el.click(function () {
                                alert(el.text());
                                //thisElement.val(el.text());

                                //if (typeof (callback) == "function")
                                //    callback(el.attr(attrCB).split('_'));


                                //$('div.' + classAC).remove();
                                //thisElement.focus();
                            });
                        });
                    }
       
    /** END Efecto Mouse Over**/
      

    /**Se Borra Lista de la Pagina al estar vacio buscador*/
        if (thisElement.val() == '') {
            $('div').remove('#FindOnlist');
        }

    //});END
}