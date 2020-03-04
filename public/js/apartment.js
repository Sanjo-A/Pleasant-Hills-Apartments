
window.onload = function(){
    // var listingCard = document.getElementById(":aptId");
    // listingCard.addEventListener("click",function(event){
    //     window.location.href = "/apartment-details/"+aptID;
    // });
    $('document').ready(function(){
        $('#allCards > div').on('click',  function(){
            var url = "/apartment-details/" + $(this).attr('id');
            // alert(this.id);
            // alert($(this).attr('id'));
            window.location.href = url;
        });
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

