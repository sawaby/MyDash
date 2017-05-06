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
  var url = 'api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+key+'';
  console.log(url);
  $.ajax({
    url : url,
    crossDomain : true,
    dataType : "json"
  }).done(function(data){
    console.log(data);
  });

}



function getPositionError (){
  console.log("user did not allow browser location");
}
