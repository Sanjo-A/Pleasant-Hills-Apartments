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

$('window').on('load',function(){
    $('#allTechs > tr').hover(function(){
        $(this).css("cursor", "pointer");
        $(this).css("background-color", "#ffff99")},function(){
            $(this).css("background-color", "#fafafa");}
    );

    $('#allTechs > tr').on('click',  function(){
        var url = "/edit-technician/" + $(this).attr('id');
        window.location.href = url;
    });
    // var rows = 0;
    // var $allApts = $("#allApts");
    // $.ajax({
    //     url: "/api/apartments",
    //     type: "GET",
    //     success: function(allData){
    //         $.each(allData, function(i,data){
    //             var apartment = $('<tr><form>'
    //                 // +'<td> <input type="hidden" id="aptID" value="'+data.aptID+'"></td>'
    //                 +'<td><input type="hidden" class="aptID" value="'+data.aptID+'">'
    //                     + '<input type="number" class="aptNumber" value="'+data.aptNumber+'"></td>'
    //                 +'<td><input type="number" class="rent" value="'+data.rent+'"></td>'
    //                 +'<td><input type="number" class="numBeds" value="'+data.numBeds+'"></td>'
    //                 +'<td><input type="number" class="numBaths" value="'+data.numBaths+'"></td>'
    //                 +'<td><input type="date" class="dateAvailable" value="'+data.dateAvailable+'"></td>'
    //                 +'<td><input type="text" class="availabilityStatus" value="'+data.availabilityStatus+'"></td>'
    //                 +'<td><button type="submit" class="save" value="save"><img src="/icons/save.png" height="24" width="24"></button></td>'
    //                 +'<td><button type="submit" class="delete" value="delete"><img src="/icons/delete.png" height="24" width="24"></button></td> </form></tr>');
    //             apartment.attr('id', ''+data.aptID+'');
    //             $allApts.append(apartment);
    //         });

    //     //     $(".save").on('click', function(){
    //     //         console.log("saving");
    //     //         var $current = $(this).parent('.form');
    //     //         console.log($current > $(".aptID").text())
    //     //        $.ajax({
    //     //             url:"/api/apartments",
    //     //             type:"POST",
    //     //             data:{
    //     //                 aptID: $current > $(".aptID").text(),
    //     //                 aptNumber: $current > $(".aptNumber").text(),
    //     //                 rent: $current > $(".rent").text(),
    //     //                 numBeds: $current > $(".numBeds").text(),
    //     //                 numBaths: $current > $(".numBaths").text(),
    //     //                 dateAvailable: $current > $(".dateAvailable").text(),
    //     //                 availabilityStatus: $current > $(".availabilityStatus").text()
    //     //             },
    //     //             success: function(i,data){
    //     //                 console.log(data);
    //     //             },
    //     //             error: function(){
    //     //                 alert('something went updating database');
    //     //             }
    //     //         });
    //     //     });

    //     // $(".delete").on('click', function(){
    //     //     console.log("delete clicked");
    //     //     $.ajax({
    //     //         url:"/api/apartments",
    //     //         type:"DELETE",
    //     //         data:{
    //     //             aptID: $("#aptID").val()
    //     //         },
    //     //         success: function(i,data){
    //     //             console.log(data);
    //     //             $(this).parents('.tr').remove();
    //     //         },
    //     //         error: function(){
    //     //             alert('something went deleting from database');
    //     //         }
    //     //     });
    //     // });

    //     },
    //     error: function(){
    //         alert('something went wrong');
    //     }
    //  });
     $('form').on("submit", function(){
            console.log('blah');
            var val = $("input[type=submit][clicked=true]").val();
            if(val == "save"){
                $.ajax({
                        url:"/api/apartments",
                        type:"POST",
                        data:{
                            aptID: $(this).closest('td').next().find('input .aptID').val(),
                            aptNumber: $(this).closest('td').next().find('input .aptNumber').val(),
                            rent: $(this).closest('td').next().find('input .rent').val(),
                            numBeds: $(this).closest('td').next().find('input .numBeds').val(),
                            numBaths: $(this).closest('td').next().find('input .numBaths').val(),
                            dateAvailable: $(this).closest('td').next().find('input .dateAvailable').val(),
                            availabilityStatus: $(this).closest('td').next().find('input .availabilityStatus').val()
                        },
                        success: function(i,data){
                            console.log(data);
                        },
                        error: function(){
                            alert('something went updating database');
                        }
                });
            }
            else{
                $.ajax({
                    url:"/api/apartments",
                    type:"DELETE",
                    data:{
                        aptID: $("#aptID").val()
                    },
                    success: function(i,data){
                        console.log(data);
                        $(this).parents('.tr').remove();
                    },
                    error: function(){
                        alert('something went deleting from database');
                    }
                });
            }
     });
    // $(".new").on('click', function(){
    //     $.ajax({
    //         url:"/api/apartments",
    //         type:"PUT",
            
    //     });
    // });

});

