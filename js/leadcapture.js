
$(document).ready(function(){$('#contactForm').bootstrapValidator();$("#contactForm").submit(function(event){$.ajax({type:"POST",url:"http://solarsecureleadcapture.azurewebsites.net/api/CRMLead",data:$("#contactForm").serialize(),dataType:'json',success:function(response){self.location="thank-you.html";$('#contactForm').each(function(){this.reset();});},error:function(request,textStatus,errorThrown){bootbox.alert("An error has been detected please call Solar Secure on 1300 885 576.");}});event.preventDefault();});});