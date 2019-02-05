$(document).ready(function(){

	// btn click

	$("#btn").click(function(){
		event.preventDefault();
		var email= $("#email").val();
		var password=$("#password").val();

		// call service

		$.ajax({
			"url": "https://reqres.in/api/login",
			"method": "POST",
			"async": true,
			"data":{
			    email: email,
			    password: password
			}

			//answer

		}).done(function(data){
				var date = new Date;
				localStorage.setItem('timeExpiration',date.getTime() + 20*60000);
				localStorage.setItem("token",data.token);
				var key = localStorage.getItem('token');
				if(key !==''){
					window.location = "user.html"
				}
			
				//fail 

				}).fail(function(){
					console.log("fail the service")
				});
		});
	});