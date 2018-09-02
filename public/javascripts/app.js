$(function(){

    $("#fetchdata").on('click', function(){
        $.get( "/fetchdata", function( data ) {
            var products = data['data'];
            $("#trdata").html('');
            $("#message").hide();
            var string = '';
            $.each(products, function(index, product) {

                string += '<tr><td>'+(index+1)+'</td><td>'+product['_id']+'</td><td>'+product['timestamp']+'</td><td>'+product['name']+'</td><td>'+product['email']+'</td><td>'+product['phone']+'</td><td>'+product['year']+'</td><td>'+product['uni']+'</td><td>'+product['degree']+'</td><td>'+product['preference']+'</td></tr>';
            });

            $("#trdata").html(string);
        });
    });
 
    $("#importdata").on('click', function(){
        $.get( "/import", function( data ) {
            $("#message").show().html(data['success']);
        });
    });

    $("#cleardb").on('click', function(){
        $.get( "/cleardb", function( data ) {
            $("#message").show().html(data['success']);
        });
    });

}); 