function updateWorkOrder(id){
    $.ajax({
        url: '/technician-portal/' + id,
        type: 'PUT',
        data: $('#update-work-order').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};