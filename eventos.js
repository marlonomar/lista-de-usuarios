$(function(){ 
    /*----start session--------------------------------------------------------------------*/
    obtenerdatos(); 

    /*----call users to table--------------------------------------------------------------*/
   callAjax(users);
   function users(){
       var userStorage = localStorage.getItem('datos');
       var users = JSON.parse(userStorage);
        for(i=0;i<=users.data.length -1;i++){
            $("tbody").append("<tr><td class='id'>"+users.data[i].id+"</td><td class='nombre'>"+users.data[i].first_name+"</td><td class='apellido'>"+users.data[i].last_name+"</td><td class='avatar'><a href='#' data-toggle='modal' data-target='#myModal'><img src="+users.data[i].avatar+" style='width:50px; border-radius:50%;'></a></td></tr>")
        }
        listarUsuarios();
        manipular_lista();
        ordenar_lista();
        select();
        agregar_iconos();
        modal();
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
     /*----localstorage delete-------------------------------------------------------------*/
   function deleteLocalStorage(){
       localStorage.clear();
       window.location = "index.html";
   }
   
   /* ------------list Users in select ----------------------------------------------------*/
   function select(){
    var table = '#mytable';
    $("#maxRows").on('change',function(){
		$(".pagination").html('');
        var trnum =0;
        var maxRows = parseInt($(this).val());
        var totalRows = $(table+' tbody tr').length;
        $(table+' tr:gt(0)').each(function(){
    		trnum++
        if(trnum > maxRows){
        	$(this).hide();
        }
        if(trnum <= maxRows){
        	$(this).show();
        }
        })
        if(totalRows > maxRows){
    	var pagenum = Math.ceil(totalRows/maxRows)
        for(var i=1;i<=pagenum;){
            $(".pagination").append("<li data-page="+i+">\<span>"+ i++ +"<span class='sr-only'>(current)</span></span>\</li>").show();
        }
        }
        $(".pagination li:first-child").addClass('active');
        $(".pagination li").on('click',function(){
    	var pageNum = $(this).attr('data-page')
        var trIndex =0;
        $('.pagination li').removeClass('active')
        $(this).addClass('active')
        $(table+' tr:gt(0)').each(function(){
            trIndex++
            if(trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                $(this).hide();
            }
            else{
                $(this).show();
            }
        })  
    })
})

   }
    /* ------------list users--------------------------------------------------------------*/
   function listarUsuarios(){
                var userStorage = localStorage.getItem('datos');
                var users = JSON.parse(userStorage);
                var orderedUsers = users.data;
                var listUsers =orderedUsers.map(function(use){
                return use.id
                });
                var data = listUsers;
                var datalist = data.length;
                localStorage.setItem('dataList',datalist);
                $("#maxRows").prepend("<option value="+data.length+">todos</option>");
                for(i=0;i<=data.length-1;i++){
                $("select").append("<option value="+data[i]+">"+data[i]+"</option>")};       
    }
   /* ------------order function ----------------------------------------------------------*/   
   function ordenar(valor,posicion){
       $("tbody").empty();
       var userStorage = localStorage.getItem('datos');
       var users = JSON.parse(userStorage);
       var orderedUsers = users.data;
       var listUsers =orderedUsers.map(function(use){
          if(valor=="first_name"){
               return use.first_name;
          }if(valor=="last_name"){
               return use.last_name;
          }
          if(valor=="id"){
            return use.id;
            }
           });
           if(posicion == 'arriba'){
            var comp = listUsers.sort(function(prev,next){
            if(prev > next){
                    return 1;
                }
            if(prev < next){
                return -1;
            }
            return 0;
            });
           }else{
            var comp = listUsers.sort(function(prev,next){
                if(prev < next){
                        return 1;
                    }
                if(prev > next){
                    return -1;
                }
                return 0;
                });
           }
       var resultado = comp.map(function(usuario){
               return orderedUsers.filter(function(user) {
                   if(valor=="first_name"){
                       return (user.first_name == usuario);
                   }if(valor=="last_name"){
                       return (user.last_name == usuario);
                   }
                   if(valor=="id"){
                    return (user.id == usuario)
                }
               })[0]
           })              
               for(i=0;i<=resultado.length -1;i++){
                   $("tbody").append("<tr><td class='id'>"+resultado[i].id+"</td><td class='nombre'>"+resultado[i].first_name+"</td><td class='apellido'>"+resultado[i].last_name+"</td><td class='avatar'><a href='#' data-toggle='modal' data-target='#myModal'><img src="+resultado[i].avatar+" style='width:50px; border-radius:50%;'></a></td></tr>");                   
                };
                ocultar();
                modal()
                                    
   } 
   /* ------------order name and surname---------------------------------------------------*/
   function ordenar_lista(){
     $("table thead tr th").on('click', '.flecha', function(){
           var fila = $(this).closest('th').text();
           var flecha = $(this).closest('img');
           if(fila=='Nombre' && flecha.hasClass('arriba')){
               ordenar('first_name','arriba');
           }
           if(fila=='Nombre' && flecha.hasClass('abajo')){
            ordenar('first_name','abajo');
            }
           if(fila=='Apellido' && flecha.hasClass('arriba')){
               ordenar('last_name','arriba');
           }
           if(fila=='Apellido' && flecha.hasClass('abajo')){
            ordenar('last_name','abajo');
        }
           if(fila=='ID' && flecha.hasClass('arriba')){
            ordenar('id','arriba');
           }
           if(fila=='ID' && flecha.hasClass('abajo')){
            ordenar('id','abajo');
           }
           let flechas =$("table thead tr th span img");

           if(flecha.hasClass('arriba')){
                flechas.attr('src','https://img.icons8.com/metro/26/000000/collapse-arrow.png')
                flechas.addClass('arriba')
                flecha.removeClass('arriba')
                flecha.attr('src','https://img.icons8.com/metro/26/000000/expand-arrow.png')
                flecha.addClass('abajo')
                
                 
           }else{
                flecha.removeClass('abajo')
                flechas.attr('src','https://img.icons8.com/metro/26/000000/collapse-arrow.png')
                flechas.addClass('arriba')
                flecha.addClass('arriba')    
           } 
           
           
        });
   }
   /*---------filter-----------------------------------------------------------------------*/ 
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
                                           
               $(this).removeClass('ocultar_fila');
               contenido_fila=todos[0];// junta todos los texto en un solo elemento para su busqueda
               exp= new RegExp(cadena,'gi');//El constructor RegExpcrea un objeto de expresión regular para que coincida con el texto con un patrón
               coinsidencia=contenido_fila.match(exp);
               
               if (coinsidencia!=null) {}
               
               else{
                   $(this).addClass("ocultar_fila");
               }
           });
       }   
       // cuando consigue coincidencias oculta los demas objetos

       function mostrarfilas(){
           $("table tbody tr").each(function(){
               $(this).removeClass('ocultar_fila');
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
   /*---------manipular lista--------------------------------------------------------------*/
   function manipular_lista(){
    $("table tbody").sortable();
   }
   /*---------agregar iconos---------------------------------------------------------------*/
   function agregar_iconos(){
       $("table thead tr th").append("<span><img class='flecha arriba' src='https://img.icons8.com/metro/26/000000/collapse-arrow.png' style='width:15px;  position: relative; left: 11px;'></span>");
       $("table thead tr th span").eq(3).hide();
       $("table thead tr th span").eq(7).hide();
       $("img.flecha:eq(0)").attr('src','https://img.icons8.com/metro/26/000000/expand-arrow.png')
       
   }
   /*---------ocultar ---------------------------------------------------------------------*/
   function ocultar (){
    var table = '#mytable';
    var trnum =0; 
    var maxRows =parseInt($("select").val());
    $(table+' tr:gt(0)').each(function(){
        trnum++
        if(trnum > maxRows){
            $(this).hide();
        }
        if(trnum <= maxRows){
            $(this).show();
        }
    })  
   }
   /*---------modal -----------------------------------------------------------------------*/
   
   function modal(){
        $("table tbody tr td a img").on('click',function(){
            var avatar =$(this).attr("src");
            var id = $(this).closest('tr').find('td').eq(0).text();
            var nombre = $(this).closest('tr').find('td').eq(1).text();
            var apellido = $(this).closest('tr').find('td').eq(2).text();
            $(".modal-header").empty();
            $(".modal-header").append("<h2>Identificacion del Usuario</h2>");
            $(".modal-body").empty()
            $(".modal-body").append("<p>Nombre : "+nombre+"<p><br><p>Apellido : "+apellido+"</p><br><p>Identificacion : "+id+"</p><img class='avatar_modal'src="+avatar+"><br><button type='button' class='btn btn-primary boton-modal' data-dismiss='modal'>Close</button>")
        });
   }
   /*----the end---------------------------------------------------------------------------*/
});