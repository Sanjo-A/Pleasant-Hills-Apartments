window.onload = function(){
    $('document').ready(function(){
        $("#detailsForm").on("submit", function(e){
            e.preventDefault();
            $.ajax({
                url: "/api/assignmentDetails",
                type: "PUT",
                data: $(this).serialize(),
                success: function(i, data){
                    alert("good");
                },
                error: function(){
                    alert("Could not add Assignment Details")
                }
            })
        })
    })

};