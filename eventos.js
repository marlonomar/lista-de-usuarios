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
            window.location = "index.html"
        }else{
            setTimeout(function(){
                localStorage.removeItem('token');
                localStorage.removeItem('expiracion');
                window.location = "index.html"
            },time);
        }

    }
    
    /* ----- boton salir-----*/
        
        $(".btn").click(function(){
            localStorage.removeItem('token');
            localStorage.removeItem('expiracion');
            window.location = "index.html"
        });

    /* ------------llamda de usuarios------------*/

    callAjax(getUsers);
    
  

    function getUsers(users){
        users.map(function(data){
            $("tbody").append("<tr><td>"+data.id+"</td><td>"+data.first_name+"</td><td>"+data.last_name+"</td><td><div ><img src="+data.avatar+" style='width:40px;border-radius:50%' class='avatares'></div></td></tr>");
        });
    }
    
    
    function callAjax(callback){
            $.ajax({
            url:"https://reqres.in/api/users?per_page=12",
            type:"GET",
            dataType:"json",
            success:function(datos){
                console.log(datos);
                callback(datos.data);
            }
        });
    
    }
    
    /*---------filtro-----------*/
    
    obtenerdatos();
    
    function obtenerdatos (){
        var contenido_fila;
        var coinsidencia;
        var exp;
        var codigoAscci;
    
        $("#Buscar").keyup(function(){
            if (!checkTeclaDel(event)) {
                if ($(this).val().length>=1)
                filtrar($(this).val());
            } 
        });
    
        function filtrar(cadena){
            $('tbody tr').each(function(){
                var todos = []
                todos.push($(this).text())
                                            
                $(this).removeClass('ocultar');
                contenido_fila=todos[0];
                exp= new RegExp(cadena,'gi');
                coinsidencia=contenido_fila.match(exp);
                if (coinsidencia!=null) {
                    
                }else{
                    $(this).addClass("ocultar");
                }
            });
        }   
        function mostrarfilas(){
            $("table tbody tr").each(function(){
                $(this).removeClass('ocultar');
            });
        }

        function checkTeclaDel(e){
            codigoAscci = e.which;
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