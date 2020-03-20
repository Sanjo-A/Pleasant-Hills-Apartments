window.onload = function(){

}
$(window).on("load",function(){
    $.cloudinary.config({ cloud_name: 'dh7pmyskb', api_key: '222898946679494'});
    var uploadButton = $('.uploadButton')
    uploadButton.on('click', function(e){
        // Initiate upload
        e.preventDefault();
        cloudinary.openUploadWidget({ cloud_name: 'dh7pmyskb', upload_preset: 'ml_default', tags: ['cgal']}, 
        function(error, result) { 
            if(error) console.log(error);
            // If NO error, log image data to console
            var id = result[0].public_id;

            console.log(result);
            $('.imgLoc').val(result[0].url);
        });
        $(this).remove();
    });
    $('#request').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url: "/api/workOrders",
            type: "PUT",
            data: $(this).serialize(),
            success: function(i, data){
                alert("Able to submit work order");
                location.reload();
            },
            error: function(){
                alert("Could not submit work order");
            }
        })
    })
})
function processImage(id) {
    var options = {
        client_hints: true,
    };
    return '<img src="'+ $.cloudinary.url(id, options) +'" style="width: 100%; height: auto"/>';
}