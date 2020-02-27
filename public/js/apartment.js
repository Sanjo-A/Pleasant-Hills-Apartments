window.onload = function(){
    var listingCard = document.getElementById("listingCard");
    listingCard.addEventListener("click",function(event){
        window.location.href = "/apartment-details";
    });

    var width = document.documentElement.clientWidth;
    var bodyCard = document.getElementById("bodyCard");
    var imgCard = document.getElementById("imgCard");
    if(width < 1000){
        imgCard.classList.remove("col-md-6");
        imgCard.classList.add("row-*-*");
        bodyCard.classList.remove("col-md-6");
        bodyCard.classList.add("row");       
    }
    else{
        imgCard.classList.add("col-md-6");
        imgCard.classList.remove("row");
        bodyCard.classList.add("col-md-6");
        bodyCard.classList.remove("row");     
    }
}

