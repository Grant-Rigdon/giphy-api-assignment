var animals = ["dog", "cat", "bird", "goat", "pig", "cow", "hedgehog", "horse"];

function displayGif() {
    var animal = $(this).attr("data-name");
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=257O83MRSA6OhmYkEKq3U3z3KJyOUhe3&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var animalImage = $("<img>");
            animalImage.attr({
                "src": results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still",
                "class": "gifs"
            });
            animalDiv.append(animalImage);
            $("#gif-view").prepend(animalDiv);
        }
    });
};

function renderButtons() {
    $("#buttons-view").empty();
    for (i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-dark animals")
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    };
};

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
    $("#animal-input").empty()
});

$(document).on("click", ".animals", displayGif);

renderButtons();

$(document).on("click", ".gifs", function () {
    console.log(this)
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});