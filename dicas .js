-----guardar datos de un arreglo en una variable para ordenarlos por alfabeticamente:

var usuarios = localStorage.getItem('datos');
var users = JSON.parse(usuarios);
var usuarios_ord = users.data;
var usuariosOrdenados =usuarios_ord.map(function(use){
	 return use.first_name
})
var lista = usuariosOrdenados.sort()


---------insertar datos de la variable en la lista ya creada 

for(i=0;i<=lista.length;i++){
	$("tbody").append("<tr><td>"+lista[i]+"</td></tr>")
}

----------evento click sustituyendo una columna 

$("table thead tr th:eq(1)").click(function(){
    $("tbody").empty();
    var usuarios = localStorage.getItem('datos');
    var users = JSON.parse(usuarios);
    var usuarios_ord = users.data;
    var usuariosOrdenados =usuarios_ord.map(function(use){
        return use.first_name
        })
        var data = usuariosOrdenados.sort()
        for(i=0;i<=data.length -1;i++){
            $("tbody").append("<tr><td>"+data[i]+"</td></tr>")
        }
        
});


-------------obtener el arreglo ordenado alfabeticamente 

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



---------------------------------funcion para paginacion 

    paginacion ()
    function paginacion (num,maxRows){
       var table = '#mytable';
       $('#paginas').on('change',function(){
           $('.pagination').html()
           $(table + 'tr:gt(0)').each(function(){

               if(num == maxRows){
                   $(this).hide();
               }
               if(num < maxRows){
                   $(this).show();
                   var listas = Math.ceil(maxRows/num);
                   for(i=1; i<= listas ; i++){
                       $('.pagination').append('<li data-page="'+i+'">\<span>'+ i++ +'<span class="sr-only">(current)</span>\</li>').show();
                   }
               }
           })
           
           $(".pagination li:first-child").addClass('active');
           $('.pagination li').on('click',function(){
               var pageNum = $(this).attr('data-page');
               var trIndex =0;
               $('.pagination li').removeClass('active');
               $(this).addClass('active');
               $(table+'tr:gt(0)').each(function(){
                   trIndex++
                   if(trIndex > (maxRows*pagenum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                      $(this).hide() 
                   }else{
                       $(this).show();
                   }
               });
           });
            
       })
        
    }
