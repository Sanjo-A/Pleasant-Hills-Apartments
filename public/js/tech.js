window.onload = function(){
    $('document').ready(function(){
        $('#workOrders > tr').on('click',  function(){
            var url = "/assignment-details/" + $(this).attr('id');
            window.location.href = url;
        });
    });
};