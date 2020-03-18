window.onload = function(){
    // loadApartments();
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

    // listRow.addEventListener("click", function(event){
    //     window.location.href = "editListing";
    // });

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
};

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

    var $allApts = $("#allApts");
    $.ajax({
        url: "/api/apartments",
        type: "GET",
        success: function(allData){
            $.each(allData, function(i,data){
                var apartment = $('<tr><form>'
                    // +'<td> <input type="hidden" id="aptID" value="'+data.aptID+'"></td>'
                    +'<td><input type="hidden" id="aptID" value="'+data.aptID+'">'
                        + '<input type="number" id="aptNumber" value="'+data.aptNumber+'"></td>'
                    +'<td><input type="number" id="rent" value="'+data.rent+'"></td>'
                    +'<td><input type="number" id="numBeds" value="'+data.numBeds+'"></td>'
                    +'<td><input type="number" id="numBaths" value="'+data.numBaths+'"></td>'
                    +'<td><input type="date" id="dateAvailable" value="'+data.dateAvailable+'"></td>'
                    +'<td><input type="text" id="availabilityStatus" value="'+data.availabilityStatus+'"></td>'
                    +'<td><button type="submit" id="save"><img src="/icons/save.png" height="24" width="24"></button></td>'
                    +'<td><button type="submit" id="delete"><img src="/icons/delete.png" height="24" width="24"></button></td> </form></tr>');
                apartment.attr('id', ''+data.aptID+'');
                $allApts.append(apartment);
            });

            $("#save").on('click', function(){
                console.log("clicked");
               $.ajax({
                    url:"/api/apartments",
                    type:"POST",
                    data:{
                        aptID: $("#aptID").val(),
                        aptNumber: $("#aptNumber").val(),
                        rent: $("#rent").val(),
                        numBeds: $("#numBeds").val(),
                        numBaths: $("#numBaths").val(),
                        dateAvailable: $("#dateAvailable").val(),
                        availabilityStatus: $("#availabilityStatus").val()
                    },
                    success: function(i,data){
                        console.log(data);
                    },
                    error: function(){
                        alert('something went updating sql');
                    }
                });
            });

    //  $(".delete").on('click', function(){
    //     $.ajax({
    //         url:"/api/apartments",
    //         type:"DELETE",
    //     });
    // });
        },
        error: function(){
            alert('something went wrong');
        }
     });

    // $(".new").on('click', function(){
    //     $.ajax({
    //         url:"/api/apartments",
    //         type:"PUT",
            
    //     });
    // });

});
