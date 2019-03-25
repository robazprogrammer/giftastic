var topics = ["red", "black", "green", "pink", "yellow", "purple", "brown", "white", "orange", "lime"];


function createButtons() {
    $("#colorButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var app = $("<button>");
        app.addClass("search");
        app.attr("data-name", topics[i]);
        app.text(topics[i]);
        $("#colorButtons").append(app);
        }
    }


$("#addColors").on("click", function (event) {
    event.preventDefault();
    var newColor = $("#input").val().trim();
    topics.push(newColor);
    createButtons();
    }
);

createButtons();


$("body").on("click", ".search", function () {
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=g8HVtt3FmXH5Y90D304dlC7fFwAEnyHO&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var j = 0; j < response.data.length; j++) {
            var newGif = $("<div>");
            var playGif = response.data[j].images.original.url;
            var stopGif = response.data[j].images.original_still.url;
            var ratingGif = response.data[j].rating;
            var titleGif = response.data[j].title;
            var imgGif = $("<img>");
            imgGif.attr("data-play", playGif);
            imgGif.attr("src", stopGif);
            imgGif.attr("data-still", stopGif);
            imgGif.attr("data-state", "still");
            imgGif.attr("alt", "giphy");
            newGif.prepend(imgGif);
            newGif.prepend("<div>Rating: " + ratingGif + "</div>");
            newGif.prepend("<div>Title: "+ titleGif + "</div>");
            $("#showColors").prepend(newGif);
        }

        $("body").on("click", "img", function () {
            var gifState = $(this).attr("data-state");
            if (gifState === "still") {
                $(this).attr("src", $(this).attr("data-play"));
                $(this).attr("data-state", "play");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            then();
        })

    })
});