$(document).ready(function(){


    setTimeout(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('fecha')
    }, 1200000);
    
    

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
        $("table tbody tr").each(function(){
            $(this).removeClass('ocultar');
            contenido_fila=$(this).find('td:eq(1)').html();
            exp= new RegExp(cadena,'gi');
            coinsidencia=contenido_fila.match(exp);
            if (coinsidencia!=null) {
                
            }else{
                $(this).addClass("ocultar");
            }
        });
    }
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
    
    /*----fin---*/
    });