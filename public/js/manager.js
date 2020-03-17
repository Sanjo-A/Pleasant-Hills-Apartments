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

    // custRow.addEventListener("click", function(event){
    //     window.location.href = "editCustomer";
    // });


    // people.addEventListener("click", function(event){
    //     if(peopleContent.style.display == "block"){
    //         peopleContent.style.display = "none";
    //     }
    //     else{
    //         peopleContent.style.display = "block"
    //     }
    // });

    // customer.addEventListener("click", function(){
    //     if(customerContent.style.display == "block"){
    //         customerContent.style.display = "none";
    //     }
    //     else{
    //         customerContent.style.display = "block"
    //     }
    // });

    // technician.addEventListener("click", function(){
    //     if(technicianContent.style.display == "block"){
    //         technicianContent.style.display = "none";
    //     }
    //     else{
    //         technicianContent.style.display = "block"
    //     }
    // });

    // amenities.addEventListener("click", function(){
    //     if(amenitiesContent.style.display == "block"){
    //         amenitiesContent.style.display = "none";
    //     }
    //     else{
    //         amenitiesContent.style.display = "block"
    //     }
    // });

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

        var $allApts = $("#allApts");
        $.ajax({
            url: "/api/get-apartments",
            type: "GET",
            success: function(allData){
                $.each(allData, function(i,data){
                    var apartment = $('<tr> <td>'
                        +data.aptNumber+'</td> <td>'
                        +data.rent+'</td>  <td>'
                        +data.numBeds+'</td> <td>'
                        +data.numBaths+'</td> <td>'
                        +data.dateAvailable+'</td> <td>'
                        +data.availabilityStatus+'</td></tr>');

                    apartment.attr('id', 'aptID');
                    $allApts.append(apartment);
                });
            }
         });

    });

};

// function loadApartments(){
//     var $allApts = $("#allApts");
//     $.ajax({
//         url: "/api/get-apartments",
//         type: "GET",
//         success: function(data){
//             $.each($allApts, fucntion(data){

//             })
//             // for (apt in data){
//             //     var aptNumber = apt.aptNumber;
//             //     var rent = apt.rent;
//             //     var numBeds = apt.numBeds;
//             //     var numBaths = apt.numBaths;
//             //     var datAvailable = apt.datAvailable;
//             //     var availabilityStatus = apt.availabilityStatus;
//             //     var ID = apt.aptID;
//             //     var apartment = $('<div/>', {
//             //         id: ID,
//             //     });
//             //     apartment.
//             //    allApts.append(apartment);
//             // }


//         }
//       })
// };