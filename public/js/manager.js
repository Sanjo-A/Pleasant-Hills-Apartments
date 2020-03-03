window.onload = function(){
    var listRow = document.getElementById("editListingRow");
    var custRow = document.getElementById("editCustomerRow");
    var techRow = document.getElementById("editTechnicianRow");
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

    techRow.addEventListener("click", function(event){
        window.location.href = "editTechnician";
    });

    people.addEventListener("click", function(evnet){
        if(peopleContent.style.display == "none"){
            peopleContent.style.display = "block";
        }
        else{
            peopleContent.style.display = "none"
        }
    });

    customer.addEventListener("click", function(){
        if(customerContent.style.display == "none"){
            customerContent.style.display = "block";
        }
        else{
            customerContent.style.display = "none"
        }
    });

    technician.addEventListener("click", function(){
        if(technicianContent.style.display == "none"){
            technicianContent.style.display = "block";
        }
        else{
            technicianContent.style.display = "none"
        }
    });

    amenities.addEventListener("click", function(){
        if(amenitiesContent.style.display == "none"){
            amenitiesContent.style.display = "block";
        }
        else{
            amenitiesContent.style.display = "none"
        }
    });

    listings.addEventListener("click", function(){
        if(listingContent.style.display == "none"){
            listingContent.style.display = "block";
        }
        else{
            listingContent.style.display = "none"
        }
    });
};