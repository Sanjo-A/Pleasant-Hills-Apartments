window.onload = function(){
    var featured = document.getElementById("featured");
    if (featured){
        featured.addEventListener("click", function redirect(event){
            event.preventDefault();
            window.location.href = "apartment-details";
        });
    }
}

function redirect(){
    var tenantCheck = document.getElementById("tenant");
    var prospCheck = document.getElementById("prospective");
    var managerCheck = document.getElementById("manager");
    var techCheck = document.getElementById("tech");    

    if(tenantCheck.checked){
        window.location.href = window.location.href + "act-portal";
    }

    if(prospCheck.checked){
        window.location.href = window.location.href + "apartments";
    }

    if(managerCheck.checked){
        window.location.href = window.location.href + "manager-portal";
    }
    
    if(techCheck.checked){
        window.location.href = window.location.href + "technician-portal";
    }
}
