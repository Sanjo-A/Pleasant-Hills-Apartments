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
$(document).ready(function(){


});
$(window).on('load',function(){
    var $allApts = $("#allApts");
    // var amenities;
    // $.ajax({
    //     url:"/api/amenities",
    //     type:"GET",
    //     success: function(allAmenities){
    //         $.each(allAmenities, function(i,data){

    //         })
    //     },
    //     error: function(){

    //     }
    // });

    $(".newApartment").hide();

    $('#allTechs > tr').hover(function(){
        $(this).css("cursor", "pointer");
        $(this).css("background-color", "#ffff99")},function(){
            $(this).css("background-color", "#fafafa");}
    );

    $('#allTechs > tr').on('click',  function(){
        var url = "/edit-technician/" + $(this).attr('id');
        window.location.href = url;
    });

    $(".saveApt").on('submit', function(e){
        e.preventDefault();
        // count++;
        console.log("saving");
        // var $current = $(this).parent('.form');
        // console.log($current > $(".aptID").text())
        $.ajax({
            url:"/api/apartments",
            type:"POST",
            data: $(this).serialize(),
            success: function(i,data){
                console.log(data);
            },
            error: function(){
                alert('something went updating database');
            }
        })
    });

    // });

        $(".delete").on('click', function(e){
            e.preventDefault();
            console.log("delete clicked");
            console.log($(this).val());
            $(this).parents('tr').hide();
            $.ajax({
                url:"/api/apartments",
                type:"DELETE",
                data: {
                    aptID: $(this).parents('tr').attr('id')
                },
                success: function(i,data){
                    $(this).parents('tr').remove();
                },
                error: function(){
                    $(this).parents('tr').show();
                    alert('something went deleting from database');
                }
            });
        });

    $(".new").on('click', function(){
        $(this).hide();
        // $(".newApartment").show();
        var newApt = $(
            '<tr class="newApartment">'
                +'<form class="createForm">'
                    +'<td class="aptNumber">'
                        + '<input type="number" name="aptNumber" min = "1" max= "9999" placeholder="Apartment Number">'
                    +'</td>'
                    +'<td class="rent"><input type="number" name="rent" min = "1" max= "9999" placeholder="Rent"></td>'
                    +'<td class="numBeds"><input type="number" name="numBeds" min = "0" max= "10" placeholder="Beds"></td>'
                    +'<td class="numBaths"><input type="number" name="numBaths" min = "0" max= "10" placeholder="Baths"></td>'
                    +'<td class="dateAvailable"><input type="date" name="dateAvailable"></td>'
                    +'<td class="availabilityStatus"><input type="text" name="availabilityStatus" placeholder="Select Availability"></td>'
                    +'<td><button type="submit" class="create" value="save"><img src="/icons/save.png" height="24" width="24"></button></td>'
                +'</form>'
            +'</tr>'
        );
        $allApts.append(newApt);
        $(".create").on('click', function(e){
            e.preventDefault();
            console.log("trying to create");
            $.ajax({
                url:"/api/apartments",
                type:"PUT",
                data:{
                    aptNumber: $(this).parents('td').siblings('.aptNumber').find("input").val(),
                    rent:  $(this).parents('td').siblings('.rent').find("input").val(),
                    numBeds:  $(this).parents('td').siblings('.numBeds').find("input").val(),
                    numBaths:  $(this).parents('td').siblings('.numBaths').find("input").val(),
                    dateAvailable:  $(this).parents('td').siblings('.dateAvailable').find("input").val(),
                    availabilityStatus:  $(this).parents('td').siblings('.availabilityStatus').find("input").val()
                },
                success: function(i,data){
                    console.log("Added to DB");
                    $(".new").show();
                    $(".create").remove();
                },
                error: function(){
                    alert("Could not add to database");
                }
            });
        });
    });


});

