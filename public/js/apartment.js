window.onload = function(){
    var listingCard = document.getElementById("listingCard");
    listingCard.addEventListener("click",function(event){
        window.location.href = "/apartment-details";
    });
    window.addEventListener("resize",function(){
        var width = document.documentElement.clientWidth;
        var bodyCard = document.getElementById("bodyCard");
        var imgCard = document.getElementById("imgCard");
        if(width < 1000){
            imgCard.classList.remove("col-md-5");
            imgCard.classList.add("col-sm-12");
            imgCard.classList.remove("card-img-left");
            imgCard.classList.add("card-img-top");
            bodyCard.classList.remove("col-md-6");
            bodyCard.classList.add("row");    
            console.log("ahhh, im shrinking");   
        }
        else{
            imgCard.classList.remove("col-sm-12");
            imgCard.classList.add("col-md-5");
            imgCard.classList.remove("card-img-top");
            imgCard.classList.add("card-img-left");
            bodyCard.classList.remove("row");     
            bodyCard.classList.add("col-md-6");
        }
    });
  
}

