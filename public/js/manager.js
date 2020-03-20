window.onload = function(){ //ability to show and hide elements
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

    // custRow.addEventListener("click", function(event){
    //     window.location.href = "editCustomer";
    // });


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
    var $allApts = $("#allApts");//cache container of apartments
    var $allAmenities = $('#allAmenities'); //cache container of ameniteis
    var $allTechnicians =$("#allTechnicians");
    var $allCustomers = $("#allCustomers");
    var amenities = "";
    $.ajax({ //grab initial amenities
        url:"/api/amenities",
        type:"GET",
        success: function(allAmenities){
            amenities+= '<td class="amenities"> <select multiple size="4" name="amenities" required>';
            $.each(allAmenities, function(i,data){
                amenities += '<option value ='+data.amenDescription+'>'+data.amenDescription+'</option>';
            })
            amenities += '</select></td>';
        },
        error: function(){
            alert("Couldn't find amenities");
        }
    });

    // $(".newApartment").hide();//temporarily hide new apartment 

    // $('#allTechs > tr').hover(function(){
    //     $(this).css("cursor", "pointer");
    //     $(this).css("background-color", "#ffff99")},function(){
    //         $(this).css("background-color", "#fafafa");}
    // );

    // $('#allTechs > tr').on('click',  function(){
    //     var url = "/edit-technician/" + $(this).attr('id');
    //     window.location.href = url;
    // });

    $(".saveApt").on('submit', function(e){
        e.preventDefault();
        // count++;
        console.log("saving listing");
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

    $(".deleteApt").on('click', function(e){
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

    $(".newApt").on('click', function(){
        $(this).hide();
        var newApt = $(
            '<tr class="newApartment">'
                +'<form class="createAptForm">'
                    +'<td class="aptNumber">'
                        + '<input type="number" name="aptNumber" min = "1" max= "9999" placeholder="Apartment Number" required>'
                    +'</td>'
                    +'<td class="rent"><input type="number" name="rent" min = "1" max= "9999" placeholder="Rent" required></td>'
                    +'<td class="numBeds"><input type="number" name="numBeds" min = "0" max= "10" placeholder="Beds" required></td>'
                    +'<td class="numBaths"><input type="number" name="numBaths" min = "0" max= "10" placeholder="Baths" required></td>'
                    +'<td class="dateAvailable"><input type="date" name="dateAvailable" required></td>'
                    +'<td class="availabilityStatus"><input type="text" name="availabilityStatus" placeholder="Select Availability" required></td>'
                    +amenities
                    +'<td><button type="submit" class="createApt" value="save"><img src="/icons/save.png" height="24" width="24"></button></td>'
                +'</form>'
            +'</tr>'
        );
        $allApts.append(newApt);
        $(".createApt").on('click', function(e){
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
                    $(".newApt").show();
                    $(".createApt").remove();
                    $(".amenities").hide();
                },
                error: function(){
                    alert("Could not add to database");
                }
            });
        });
    });


    $(".newAmenity").on("click", function(){
        $(this).hide();
        var newAmenitiy = $(
            '<tr class="newAmenity">'
                +'<form class="createForm">'
                    +'<td class="amenDescription">'
                        + '<input type="text" name="amenDescription" placeholder="Amenity Name" maxlength="40" minlength="1" required>'
                    +'</td>'
                    +'<td><button type="submit" class="createAmenity" value="save"><img src="/icons/save.png" height="24" width="24"></button></td>'
                +'</form>'
            +'</tr>'
        );
        $allAmenities.append(newAmenitiy);
        $(".createAmenity").on("click", function(e){
            e.preventDefault();
            console.log("trying to create");
            $.ajax({
                url:"/api/amenities",
                type: "PUT",
                data: {
                    amenDescription: $(this).parents('td').siblings('.amenDescription').find("input").val(),
                },
                success: function(i,data){
                    console.log("Added to DB");
                    $(".newAmenity").show();
                    $(".createAmenity").remove();
                    amenities = "";
                    $.ajax({ //grab new list of amenities
                        url:"/api/amenities",
                        type:"GET",
                        success: function(allAmenities){
                            amenities+= '<td class="amenities"> <select multiple size="4" name="amenities" required>';
                            $.each(allAmenities, function(i,data){
                                amenities += '<option value ='+data.amenDescription+'>'+data.amenDescription+'</option>';
                            })
                            amenities += '</select></td>';
                        },
                        error: function(){
                            alert("Couldn't find amenities");
                        }
                    });                    
                },
                error: function(){
                    alert("Could not add amenity to database");
                }
            })
        })
    })
    $(".saveAmenity").on("submit", function(e){
        e.preventDefault();
        console.log("saving amenity");
        $.ajax({
            url:"/api/amenities",
            type:"POST",
            data: $(this).serialize(),
            success: function(i,data){
                console.log(data);
            },
            error: function(){
                alert('something went updating database');
            }
        })
    })
    $(".deleteAmenity").on("click", function(e){
        e.preventDefault();
        console.log("delete clicked");
        console.log($(this).parents('tr').attr('id'))
        $(this).parents('tr').hide();
        $.ajax({
            url:"/api/amenities",
            type:"DELETE",
            data: {
                amenID: $(this).parents('tr').attr('id')
            },
            success: function(i,data){
                $(this).parents('tr').remove();
            },
            error: function(){
                $(this).parents('tr').show();
                alert('something went deleting from database');
            }
        });
    })

    $(".newTechnician").on("click", function(){
        $(this).hide();
        var newTech = $(
            '<tr class="newTechnician">'
                +'<form class="createForm">'
                    +'<td class="techFName">'
                        + '<input type="text" name="techFName" placeholder="First Name" required="true">'
                    +'</td>'
                    +'<td class="techLName"><input type="text" name="techLName" placeholder="Last Name" required></td>'
                    +'<td class="techEmail"><input type="email" placeholder="Email" required></td>'
                    +'<td class="techPhone"><input type="text" placeholder="Phone" pattern="[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}"  required></td>'
                    +'<td><button type="submit" class="createTech" value="save"><img src="/icons/save.png" height="24" width="24"></button></td>'
                +'</form>'
            +'</tr>'
        );
        $allTechnicians.append(newTech);
        $(".createTech").on("click", function(e){
            e.preventDefault();
            console.log("Trying to add technician");
            $.ajax({
                url: "/api/technicians",
                type: "PUT",
                data: {
                    techFName: $(this).parents('td').siblings('.techFName').find("input").val(),
                    techLName:  $(this).parents('td').siblings('.techLName').find("input").val(),
                    techEmail:  $(this).parents('td').siblings('.techEmail').find("input").val(),
                    techPhone:  $(this).parents('td').siblings('.techPhone').find("input").val(),
                },
                success: function(i, data){
                    console.log("Added to DB");
                    $(".newTechnician").show();
                    $(".createTech").remove();
                },
                error: function(){
                    alert("Could not add technician");
                }
            })
        })
    })
    $(".saveTechnican").on("submit", function(e){
        e.preventDefault();
        // count++;
        console.log("saving technician");
        // var $current = $(this).parent('.form');
        // console.log($current > $(".aptID").text())
        $.ajax({
            url:"/api/technicians",
            type:"POST",
            data: $(this).serialize(),
            success: function(i,data){
                console.log(data);
            },
            error: function(){
                alert('something went updating database');
            }
        })
    })
    $(".deleteTechnician").on("click", function(e){
        e.preventDefault();
        console.log("delete clicked");
        $(this).parents('tr').hide();
        $.ajax({
            url:"/api/technicians",
            type:"DELETE",
            data: {
                techID: $(this).parents('tr').attr('id')
            },
            success: function(i,data){
                $(this).parents('tr').remove();
            },
            error: function(){
                $(this).parents('tr').show();
                alert('something went deleting from database');
            }
        });
    })


    $(".saveCustomer").on("submit", function(e){
        e.preventDefault();
        // count++;
        console.log("saving customer");
        // var $current = $(this).parent('.form');
        // console.log($current > $(".aptID").text())
        $.ajax({
            url:"/api/customers",
            type:"POST",
            data: $(this).serialize(),
            success: function(i,data){
                console.log(data);
            },
            error: function(){
                alert('something went updating database');
            }
        })
    })
    $(".deleteCustomer").on("click", function(e){
        e.preventDefault();
        console.log("delete clicked");
        $(this).parents('tr').hide();
        $.ajax({
            url:"/api/customers",
            type:"DELETE",
            data: {
                custID: $(this).parents('tr').attr('id')
            },
            success: function(i,data){
                $(this).parents('tr').remove();
            },
            error: function(){
                $(this).parents('tr').show();
                alert('something went deleting from database');
            }
        });
    })

});

