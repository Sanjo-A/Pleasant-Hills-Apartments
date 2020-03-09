window.onload = function(){
    var listRow = document.getElementById("editListingRow");
    var custRow = document.getElementById("editCustomerRow");
    var people = document.getElementById("manPeopleTxt");
    var peopleContent = document.getElementById("peopleContent");
    var customer = document.getElementById("manCustomerTxt");
    var customerContent = document.getElementById('custContent')
    var technician = document.getElementById("manTechTxt");
    var technicianContent = document.getElementById("techContent");
    var amenities = document.getElementById("amenTxt");
    var amenitiesContent = document.getElementById("amenContent");
    var listings = document.getElementById("listingTxt");
    var listingContent = document.getElementById("listingContent");

    listRow.addEventListener("click", function(event){
        window.location.href = "editListing";
    });

    custRow.addEventListener("click", function(event){
        window.location.href = "editCustomer";
    });


    people.addEventListener("click", function(event){
        if(peopleContent.style.display == "block"){
            peopleContent.style.display = "none";
        }
        else{
            peopleContent.style.display = "block"
        }
    });

    customer.addEventListener("click", function(){
        if(customerContent.style.display == "block"){
            customerContent.style.display = "none";
        }
        else{
            customerContent.style.display = "block"
        }
    });

    technician.addEventListener("click", function(){
        if(technicianContent.style.display == "block"){
            technicianContent.style.display = "none";
        }
        else{
            technicianContent.style.display = "block"
        }
    });

    amenities.addEventListener("click", function(){
        if(amenitiesContent.style.display == "block"){
            amenitiesContent.style.display = "none";
        }
        else{
            amenitiesContent.style.display = "block"
        }
    });

    listings.addEventListener("click", function(){
        if(listingContent.style.display == "block"){
            listingContent.style.display = "none";
        }
        else{
            listingContent.style.display = "block"
        }
    });
    $('document').ready(function(){
        $('#allTechs > tr').hover(function(){
            $(this).css("cursor", "pointer");
            $(this).css("background-color", "#ffff99")},function(){
                $(this).css("background-color", "#fafafa");}
        );

        $('#allTechs > tr').on('click',  function(){
            var url = "/edit-technician/" + $(this).attr('id');
            window.location.href = url;
        });
    });
};