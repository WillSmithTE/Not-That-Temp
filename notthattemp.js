jQuery.each(arr, function(i) { console.log(i); }); 
var temp;
var place;
var arr=[];
arr = newArr(arr);
var lat;
var long;
var geoUrl0 = "https://maps.googleapis.com/maps/api/geocode/json?address=";  
var geoUrlAddress = "sydney";
var geoUrlCountry;
var geoUrlKey = "&key=AIzaSyBsypIZxNiVwHxwMOAWg8bEKGQ0WWlJxLQ";
var darkSkyUrl0 = "https://api.darksky.net/forecast/94793929846040309f42120ea5e27d80/";
$(document).ready(function(){
  console.log("start");
  });

 $("#search").on("click", function(){
   geoUrlAddress = document.getElementById("basicSearchTf").value;
   geoUrlCountry = document.getElementById("countrySearchTf").value;
   $.getJSON(makeGeoUrl(geoUrlAddress,geoUrlCountry),function(geo){
      lat=geo.results[0].geometry.location.lat;
      long=geo.results[0].geometry.location.lng;
  place = geo.results[0].address_components[0].long_name;
     if (geo.results[0].address_components.length>1) place+=", " + geo.results[0].address_components[geo.results[0].address_components.length-1].long_name;
darkSky(lat,long);
    });
 });

function darkSky(lat,long){
  $.ajax(
      {type: "GET",
      url: darkSkyUrl0+lat+","+long,
      dataType: 'jsonp',
      success: function (data){
  temp = data.currently.temperature;
  arr=newArr(arr);
  var index = arr.indexOf(temp);
        console.log(arr.length);
  arr.splice(index,1);
  arr=shuffleArr(arr);
        console.log(arr.length);
  newTemp();
  document.getElementById("insert").style.visibility = "visible";
    },
      error: function(){
        console.log("fail darkSky");
      }
   });
};

$("#newTemp").on("click",function(){
  newTemp();
});

function celsius(fahrenheit){
  return ((fahrenheit-32)/1.8).toFixed(0)+String.fromCharCode(176)+"C";
};

function makeGeoUrl(geoUrlAddress, geoUrlCountry){
  if (!geoUrlCountry==""){
    return geoUrl0+geoUrlAddress+"&components=country:"+geoUrlCountry;
  }
  else
  return geoUrl0 + geoUrlAddress + geoUrlKey;
};

function shuffleArr(array){
  for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

function newArr(arr){
  arr.length=0;
  console.log("newArr()");
   for (var i=-55;i<=55;i++){
    arr.push(i);
}
  return arr;
};

function newTemp(){
  if (arr.length==0){
  $("#insert").text("You just consumed 0.00055% of your mouse's life and burnt 156.2 calories. Keep hustling. The temperature in " + place + " is "+celsius(temp)+".");
  }
  else{
    var s = "The temperature in "+place + " is NOT " + celsius(arr[0])+". "+arr.length;
 if (arr.length==1) s+= " attempt remaining.";
    else s+= " attempts remaining.";
arr.shift();
$("#insert").text(s);
  }
};