$(document).ready(function(){

	//click
	$("#btn").click(function(){
		event.preventDefault();
		var email= $("#email").val();
		var password=$("#password").val();

		//llamada
		$.ajax({
			"url": "https://reqres.in/api/login",
			"method": "POST",
			"async": true,
			"data":{
			    email: email,
			    password: password
			}

			//respuesta
		}).done(function(data){
			var fecha = new Date;
			localStorage.setItem('expiracion',fecha.getTime() + 20*60000);
			console.log(data)
            localStorage.setItem("token",data.token)
            var key = localStorage.getItem('token');
            if(key !==''){
                window.location = "user.html"
			}
			
            
            
			
			//fallo
		}).fail(function(){
			console.log("fallo el servicio")
		})
		});

	});