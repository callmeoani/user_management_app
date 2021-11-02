// const { update_user } = require("../../server/services/render");


$('#add_user').submit(function(event){
    alert('New user successfully added!')
})

$('#update_user').submit(function(event){
    event.preventDefault();

    let data_to_update = $(update_user).serializeArray();
    let data = {}

    $.map(data_to_update, function(n,i){
        data[n['name']] = n['value']
    })

    console.log(data);

    let request = {
        'url': `http://localhost:3000/api/users/${data.id}`,
        'method' : 'PUT',
        'data': data
    }

    $.ajax(request).done(function(response){

        alert('Data updated successfully!')
    })

})

if(window.location.pathname == '/'){
    $ondelete = $('.table tbody td a.delete');
    $ondelete.click(function(){
         let id = $(this).attr('data-id')

         let request = {
            'url': `http://localhost:3000/api/users/${id}`,
            'method' : 'DELETE'
        }

        if(confirm('Do you really wanna delete this record?')){
            $.ajax(request).done(function(response){

                alert('Data deleted successfully!');
                location.reload();

            })
        
        }
    })

}