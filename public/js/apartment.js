
window.onload = function(){
    document.getElementById("rentMin").defaultValue = "0";
    document.getElementById("rentMax").defaultValue = "10000";
    document.getElementById("bedMin").defaultValue = "0";
    document.getElementById("bedMax").defaultValue = "10";
    document.getElementById("bathMin").defaultValue = "1";
    document.getElementById("bathMax").defaultValue = "100";
    // var listingCard = document.getElementById(":aptId");
    // listingCard.addEventListener("click",function(event){
    //     window.location.href = "/apartment-details/"+aptID;
    // });
    $('document').ready(function(){
        $('#allCards > div').on('click',  function(){
            var url = "/apartment-details/" + $(this).attr('id');
            window.location.href = url;
        });
    });
    var filterButton = document.getElementById("filterAll");
    filterButton.addEventListener("click",function(event){
        event.preventDefault();
        var filter = $('#filters').serialize();
        console.log("showing filtered")
        console.log(filter);
        // let req = new XMLHttpRequest();
        // req.open("GET", "/apartments?" + filter, true);
        // req.addEventListener('load', function() {
        //     if (req.status < 400) {
        //         console.log("success");
        //     }
        // });
        // req.send();
        location.href = "/apartments?" + filter;
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

