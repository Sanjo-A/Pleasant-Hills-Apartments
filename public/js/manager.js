window.onload = function(){
    var listRow = document.getElementById("editListingRow");
    var custRow = document.getElementById("editCustomerRow");
    var techRow = document.getElementById("editTechnicianRow");
    var people = document.getElementById("manPeopleTxt");
    var peopleContent = document.getElementById("peopleContent");

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

}