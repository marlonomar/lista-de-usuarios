$(function(){
    
   
     /*----Inicio de Sesion----------------------------------------------------------- */

     session();
         
    function session (){
        var date= new Date;
        var dateStart= date.getTime();
        var dateEnd = localStorage.getItem('timeExpiration');
        var time = dateEnd - dateStart;
        console.log(time);

        if ( dateStart >= dateEnd ){
            deleteLocalStorage ()}

        else{
            setTimeout(function(){
                deleteLocalStorage ()
            },time);
        }
    }

   
     /*----llamada de usuarios--------------------------------------------------------------- */

    callAjax(users);

    function users(){
        var userStorage = localStorage.getItem('datos');
        var users = JSON.parse(userStorage);
            for(i=0;i<=users.data.length -1;i++){
                $("tbody").append("<tr><td>"+users.data[i].id+"</td><td>"+users.data[i].first_name+"</td><td>"+users.data[i].last_name+"</td><td><img src="+users.data[i].avatar+" style='width:50px; border-radius:50%;'></td></tr>")}; 
                listarUsuarios();
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

      /*----localstorage delete----------------------------------------------------------------- */

      function deleteLocalStorage (){
        localStorage.removeItem('token');
        localStorage.removeItem('timeExpiration');
        localStorage.removeItem('datos');
        window.location = "index.html";
    }

    /* ----- button out---------------------------------------------------------------------------*/

        $(".btn:first").click(function(){
            deleteLocalStorage ()
        });

    /* ------------list Users----------------------------------------------------------------------*/

    $("select").on('change', function(){
        var numero = this.value;
		$("tbody").empty();
      var userStorage = localStorage.getItem('datos');
        var users = JSON.parse(userStorage);
        var listTotal =users.total;
        paginacion(numero,listTotal)
         for(i=0;i<=numero -1;i++){
         $("tbody").append("<tr><td>"+users.data[i].id+"</td><td>"+users.data[i].first_name+"</td><td>"+users.data[i].last_name+"</td><td><img src="+users.data[i].avatar+" style='width:50px; border-radius:50%;'></td></tr>")};
    });

     /* ------------Listar usuarios-----------------------------------------------------------------*/
     function listarUsuarios (){
         var userStorage = localStorage.getItem('datos');
                 var users = JSON.parse(userStorage);
                 var orderedUsers = users.data;
                 var listUsers =orderedUsers.map(function(use){
                 return use.id});
                 var data = listUsers;
                 var datalist = data.length;
                 localStorage.setItem('dataList',datalist);
                 for(i=0;i<=data.length-1;i++){
                 $("select").append("<option value="+data[i]+">"+data[i]+"</option>")};  
     }
     /* ------------Pagination-----------------------------------------------------------------*/
     
    function paginacion(num,maxRows){
    $("nav ul").empty();
    var listas = Math.ceil(maxRows/num);
    console.log(listas);
	for(i=1; i<= listas ; i++){
	$("nav ul").append("<li>"+i+"</li>")
    }
}
    /* ------------Ordenar por nombre -----------------------------------------------------------------*/

    $("table thead tr th:eq(1)").click(function(){
        $("tbody").empty();
        var userStorage = localStorage.getItem('datos');
        var users = JSON.parse(userStorage);
        var orderedUsers = users.data;
        var listUsers =orderedUsers.map(function(use){
            return use.first_name});
         var comp = listUsers.sort();
        var resultado = listUsers.map(function(usuario){
                return orderedUsers.filter(function(user) {
                    return (user.first_name == usuario)
                })[0]
            })
                for(i=0;i<=resultado.length -1;i++){
                    $("tbody").append("<tr><td>"+resultado[i].id+"</td><td>"+resultado[i].first_name+"</td><td>"+resultado[i].last_name+"</td><td><img src="+resultado[i].avatar+" style='width:50px; border-radius:50%;'></td></tr>")};  
                    
    });

        /* ------------Ordenar por apellidos --------------------------------------------------------------*/

    $("table thead tr th:eq(2)").click(function(){
        $("tbody").empty();
        var userStorage = localStorage.getItem('datos');
        var users = JSON.parse(userStorage);
        var orderedUsers = users.data;
        var listUsers =orderedUsers.map(function(use){
            return use.last_name});
         var comp = listUsers.sort();
        var resultado = listUsers.map(function(usuario){
                return orderedUsers.filter(function(user) {
                    return (user.last_name == usuario)
                })[0]
            })
                for(i=0;i<=resultado.length -1;i++){
                    $("tbody").append("<tr><td>"+resultado[i].id+"</td><td>"+resultado[i].first_name+"</td><td>"+resultado[i].last_name+"</td><td><img src="+resultado[i].avatar+" style='width:50px; border-radius:50%;'></td></tr>")};  
                    
    });

    /* ------------Ordenar por ID--------------------------------------------------------------------------*/

    $("table thead tr th:eq(0)").click(function(){
        $("tbody").empty();
        var userStorage = localStorage.getItem('datos');
        var users = JSON.parse(userStorage);
        var orderedUsers = users.data;
        var listUsers =orderedUsers.map(function(use){
            return use.id});
         var comp = listUsers.sort(function(prev,next){
				if(prev > next){
						return 1;
					}
				if(prev < next){
					return -1;
				}
				return 0;
			});
        var resultado = listUsers.map(function(usuario){
                return orderedUsers.filter(function(user) {
                    return (user.id == usuario)
                })[0]
            })
                for(i=0;i<=resultado.length -1;i++){
                    $("tbody").append("<tr><td>"+resultado[i].id+"</td><td>"+resultado[i].first_name+"</td><td>"+resultado[i].last_name+"</td><td><img src="+resultado[i].avatar+" style='width:50px; border-radius:50%;'></td></tr>")};  
                    
    });

     /*---------Paginacion-------------------------------------------------------------------------------------*/ 
  
    
    


    /*---------filtro-------------------------------------------------------------------------------------*/
    
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
                
                if (coinsidencia!=null) {}
                
                else{
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
   
    /*----fin------------------------------------------------------------------------------------*/


    });