$(function(){

    
     /*----Sesion--- */
    sesion();
     
        
    function sesion (){
        var fecha= new Date;
        var fechaUsuario= fecha.getTime();
        var fechaExpiracion = localStorage.getItem('expiracion');
        var time = fechaExpiracion - fechaUsuario;
        console.log(time);

        if ( fechaUsuario >= fechaExpiracion ){
            localStorage.removeItem('token');
            localStorage.removeItem('expiracion');
            localStorage.removeItem('datos');
            window.location = "index.html"
        }else{
            setTimeout(function(){
                localStorage.removeItem('token');
                localStorage.removeItem('expiracion');
                localStorage.removeItem('datos');
                window.location = "index.html"
            },time);
        }

    }
    
    /* ----- boton salir-----*/
        
        $(".btn").click(function(){
            localStorage.removeItem('token');
            localStorage.removeItem('expiracion');
            localStorage.removeItem('datos');
            window.location = "index.html"
        });

 

    /* ------------llamada de usuarios------------*/

    callAjax(users);
    
    function users(){
          
    var usuarios = localStorage.getItem('datos');
    var users = JSON.parse(usuarios);
    for(i=0;i<=users.data.length;i++){
     $("tbody").append("<tr><td>"+users.data[i].id+"</td><td>"+users.data[i].first_name+"</td><td>"+users.data[i].last_name+"</td><td><img src="+users.data[i].avatar+" style='width:50px; border-radius:50%;'></td></tr>")
    }
    
    }

    function callAjax(callback){
            $.ajax({
            url:"https://reqres.in/api/users?per_page=12",
            type:"GET",
            dataType:"json",
            success:function(datos){
                localStorage.setItem('datos',JSON.stringify(datos));
                console.log(datos);
                callback(datos.data);
            }
        });
    
    }
    
    /*---------filtro-----------*/
    
    obtenerdatos();
    // funcion principal
    function obtenerdatos (){
        var contenido_fila;
        var coinsidencia;
        var exp;
        var codigoAscci;
    //filtrador de la barra de busqueda al ingresar un valor 
        $("#Buscar").keyup(function(){// keyup se ejecuta cuando se ingresa un valor y se suelta el cursor
            if (!checkTeclaDel(event)) {// check de la tecla del 
                if ($(this).val().length>=1)
                filtrar($(this).val());
            } 
        });
    // filtro 
        function filtrar(cadena){
            $('table tbody tr').each(function(){
                var todos = []
                todos.push($(this).text())// El método push () agrega nuevos elementos al final de una matriz y devuelve la nueva longitud.
                                            
                $(this).removeClass('ocultar');
                contenido_fila=todos[0];// junta todos los texto en un solo elemento para su busqueda
                exp= new RegExp(cadena,'gi');//El constructor RegExpcrea un objeto de expresión regular para que coincida con el texto con un patrón
                coinsidencia=contenido_fila.match(exp);
                if (coinsidencia!=null) {
                    
                }else{
                    $(this).addClass("ocultar");
                }
            });
        }   
        // cuando consigue coincidencias oculta los demas objetos
        function mostrarfilas(){
            $("table tbody tr").each(function(){
                $(this).removeClass('ocultar');
            });
        }

        function checkTeclaDel(e){
            codigoAscci = e.which;//whiches una propiedad del eventobjeto, que la mayoría de la gente etiqueta como een sus controladores de eventos. Contiene el código clave de la tecla que se presionó para desencadenar el evento (por ejemplo: keydown, keyup).
            if (codigoAscci==8) {
                if ($("#Buscar").val().length>=1) {
                    filtrar($("#Buscar").val());
                }else{
                    mostrarfilas();
                }
                return true;
            }
            else{
                return false;
            }      
        }

    }
   
    /*----fin---*/


    });