


  $(function() {
      $('#tempToggle').change(function() {
        // $('#console-event').html('Toggle: ' + $(this).prop('checked'));
        console.log('toggled');
        console.log($(this).prop('checked'));
        // if false than convert the temp to Celsius

        // if true than convert the temp to Farenheit


      });
    });

if ("geolocation" in navigator) {
  /* geolocation is available */
  // gets lat and long data to run weather api
  navigator.geolocation.getCurrentPosition(getPositionSuccess,getPositionError);
} else {
  /* geolocation IS NOT available */
  console.log("geolocation not available");
}

function getPositionSuccess(position){
  console.log(position);
  var long = position.coords.longitude;
  var lat = position.coords.latitude;
  console.log("long " + long);
  console.log("lat " + lat);
  var key = "9969647cc8678f8c1ebead8fb67b964a";
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+key+'&units=imperial';
  console.log(url);
  $.ajax({
    url : url,
    crossDomain : true,
    dataType : "json"
  }).done(function(data){
    console.log(data);
    var city = data.name;
    console.log(city);
    var iconID = data.weather[0].id;
    var description = data.weather[0].description;
    var tempInFMax = data.main.temp_max;
    var tempInFMin = data.main.temp_min;
    $('#maxTemp').html("Max Temp: "+tempInFMax);
    $('#minTemp').html(" Min Temp: "+tempInFMin);
    console.log(iconID + description);

    displayDate();
    displayCityName(city);
    displayContditions(iconID, description);

  });
}

function getPositionError (){
  console.log("user did not allow browser location");
}
function displayDate(){
  var now = moment();
  console.log(now);
  console.log(now['_d']);
  var date = now['_d'];
  $('#date').html(date);
}
function displayCityName(city){
  $('#cityName').html(city);
}
function displayContditions(iconID, description){
  $('#weatherIcon').addClass('wi-owm-'+iconID);
  $('#condition').html(description);
}






function getPositionError (){
  console.log("user did not allow browser location");
}
