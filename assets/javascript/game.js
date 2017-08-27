$(document).ready(function(){

    $('button').on('click', function() {
        var sport = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=d773a641373242efb33a6ab2bc738e6b&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function(response) {


                console.log(response)

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var sportDiv = $('<div/>');
                    var p =$('<p/>');
                    p.text(results[i].rating);
                    var sportImage = $('<img/>');
                    sportImage.addClass('sportImg')
                    sportImage.attr('src', results[i].images.fixed_height.url);
                    sportImage.attr('data-still', results[i].images.fixed_height_still.url)
                    sportImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    sportDiv.append(p);
                    sportDiv.append(sportImage);
                    sportDiv.prependTo($('#gifs'));
                }

                $('.sportImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    //console.log(this);
                    if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                    } else {                            
                    $(this).attr('src', $(this).data('still'));                    
                    $(this).attr('data-state', 'still');
                    }      
                });
            });
    });

    var sports = [''];

    
        $('#addButton').on('click', function(){
            var playerButton = $("#gif-input").val();

            var newButton = $("<button/>").addClass( "btn btn-info sport").attr('data-name',playerButton).html(playerButton).css({'margin': '5px'});
            
            $("#sportsButtons").append(newButton);

            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + playerButton + "&api_key=d773a641373242efb33a6ab2bc738e6b&limit=10";
                //console.log(playerButton);

            $.ajax({
            url: queryURL,
            method: 'GET'
            })

            .done(function(response) {

            var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var sportDiv = $('<div/>');
                    var p =$('<p/>');
                    p.text(results[i].rating);
                    var sportImage = $('<img/>');
                    sportImage.addClass('sportImg')
                    sportImage.attr('src', results[i].images.fixed_height_still.url);
                    sportImage.attr('data-still', results[i].images.fixed_height_still.url)
                    sportImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    sportDiv.append(p);
                    sportDiv.append(sportImage);
                    sportDiv.prependTo($('#gifs'));
                }

                $('.sportImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    //console.log(this);
                    if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                    } else {
                    $(this).attr('src', $(this).data('still'));                   
                    $(this).attr('data-state', 'still');
                    }      
                });
            });

            $("#gif-input").val("");
            return false;
        })
  
});