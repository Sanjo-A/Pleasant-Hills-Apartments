window.onload = function(){
    var listRow = document.getElementById("editListingRow");
    var custRow = document.getElementById("editCustomerRow");
    var techRow = document.getElementById("editTechnicianRow");
    listRow.addEventListener("click", function(event){
        window.location.href = "editListing";
    });
    custRow.addEventListener("click", function(event){
        window.location.href = "editCustomer";
    });
    techRow.addEventListener("click", function(event){
        window.location.href = "editTechnician";
    });
}