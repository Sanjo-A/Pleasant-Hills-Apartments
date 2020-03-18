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
                    +'<td> <input type="number" value="'+data.aptNumber+'"></td>'
                    +'<td><input type="number" value="'+data.rent+'"></td>'
                    +'<td><input type="number" value="'+data.numBeds+'"></td>'
                    +'<td><input type="number" value="'+data.numBaths+'"></td>'
                    +'<td><input type="date" value="'+data.dateAvailable+'"></td>'
                    +'<td><input type="text" value="'+data.availabilityStatus+'"></td>'
                    +'<td><button type="submit" id="save"><img src="/icons/save.png" height="24" width="24"></button></td>'
                    +'<td><button type="submit" id="delete"><img src="/icons/delete.png" height="24" width="24"></button></td> </form></tr>');
                apartment.attr('id', ''+data.aptID+'');
                $allApts.append(apartment);
            });
        },
        error: function(){
            alert('something went wrong');
        }
     });
     $("#save").on('click', function(){
         console.log("clicked");
        $.ajax({
            url:"/api/apartments",
            type:"POST",
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
    // $(".new").on('click', function(){
    //     $.ajax({
    //         url:"/api/apartments",
    //         type:"PUT",
            
    //     });
    // });

});
