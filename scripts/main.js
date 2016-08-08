var twitchUsers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "brunofin", "comster404", "manvsgame", "squillakilla", "the_happy_hob"];

function twitchStatus() {
  twitchUsers.forEach(function(twitchUser) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + twitchUser + "?callback=?", function(data) {

      if(data.stream !== null && data.stream !== undefined) {
        var logo = data.stream.channel.logo;
        var thumbnail = "' class='img-rounded' width='60' height='60'>";
        var userLogo = "<img src='" + logo + thumbnail;
        var description = "<p class='description'>Currently streaming: " + data.stream.game + "</p>"
        var onlineLogo = "<li class='users usersOnline'><span class='userLogo'>" + userLogo + "</span>" + description;
        var url = data.stream.channel.url;
        var userURL = "<a href='" + url;
        var online = onlineLogo + "<span class='userURL'>" + userURL + "'><i class='fa fa-circle' aria-hidden='true'></i></a></span></li>";
        var freecodecampLink = onlineLogo + "<span class='userURL'><a href='https://www.twitch.tv/freecodecamp'><i class='fa fa-circle' aria-hidden='true'></i></a></span></li>";

        if (twitchUser === "freecodecamp") {
          $("#allUsers").append(freecodecampLink);
        }
        $("#allUsers").append(online);

      } else if (data.stream === null) {
        $.getJSON("https://api.twitch.tv/kraken/channels/" + twitchUser + "?callback=?", function(data) {
          var noUserURL = "<i class='fa fa-times' aria-hidden='true'></i>";
          var offline = "<span class='userURL'>" + noUserURL + "</span>";
          var freecodecampLink = "<li class='users usersOffline'><span class='userLogo'><img src='" + data.logo + "' class='img-rounded' width='60' height='60'></span><span class='userURL'><a href='https://www.twitch.tv/freecodecamp'>" + noUserURL + "</a></span></li>";

          if (data.logo !== null && twitchUser === "freecodecamp") {
            $("#allUsers").append(freecodecampLink)
          }
          if (data.logo === null && twitchUser !== "freecodecamp") {
            $("#allUsers").append("<li class='users usersOffline'><span class='userLogo'><img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' class='img-rounded' width='60' height='60'></span>" + offline + "</li>")
          } else if (data.logo !== null && twitchUser !== "freecodecamp") {
            $("#allUsers").append("<li class='users usersOffline'><span class='userLogo'><img src='" + data.logo + "' class='img-rounded' width='60' height='60'></span>" + offline + "</li>")
          }
        });

      } else if (data.error == "Unprocessable Entity") {
        var deleted = "<span class='userURL'><i class='fa fa-question' aria-hidden='true'></span>";
        $("#allUsers").append("<li class='users usersNone'><span class='userLogo' title='User not available'><img src='https://experience.sap.com/wp-content/themes/experience-main/assets/img/default-avatar-bpfull.jpg' class='img-rounded' width='60' height='60'></span><p class='description'>User not available</p>" + deleted + "</li>")
      }
    });
  });
}

twitchStatus();

$("#online").on("click", function() {
  $(".usersOffline").hide();
  $(".usersNone").hide();
  $(".usersOnline").show();
});

$("#all").on("click", function() {
  $(".users").show();
});

$("#offline").on("click", function() {
  $(".usersOffline").show();
  $(".usersNone").show();
  $(".usersOnline").hide();
});
