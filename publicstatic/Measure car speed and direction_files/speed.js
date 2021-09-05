/*

function loadGraphics() {
    d3.xml("assets/compass.svg", "image/svg+xml", function(xml) {
        document.body.appendChild(xml.documentElement);
    });

    d3.xml("assets/speed.svg", "image/svg+xml", function(xml) {
        document.body.appendChild(xml.documentElement);
    });

}
*/

function initGeo() {
    navigator.geolocation.watchPosition(
        geosuccess,
        geofailure,
        {
            enableHighAccuracy:true,
            maximumAge:500,
            timeout:600
        }
    );
    //tests
    //moveSpeed(Math.random()*100);
    //moveCompassNeedle(56);
}
var currentSpeedKMPH =0;
var count = 0;
function geosuccess(event) {
     console.log('geosuccess');

    // var heading = Math.round(event.coords.heading);
    currentSpeedKMPH = Math.round(event.coords.speed)*3.6;
    currentSpeedKMPH = Math.round(currentSpeedKMPH * 10) / 10
    var accuracy = Math.round(event.coords.accuracy);
    $("#debugoutput").html("<div class ='current-speed'><h1> " + currentSpeedKMPH   
                            + " </h1></div>KM/H "

                            + " </br> <h4>accuracy:"
                            + accuracy
                            +" meters </h4>"
                             +  "</br><small>updated: " 
                            + count++  +" times</small");

    console.log(event.coords)


    if (currentSpeedKMPH != null) {
        // update the speed

        moveSpeed(currentSpeedKMPH);// this expects degrees 360
    }
}

var currentCompassPosition =  {property: 0};
// function moveCompassNeedle(heading) {

//     // we use a svg transform to move to correct orientation
//     var translateValue = "translate(225,231)";
//     var to = {property: heading};

//     // stop the current animation and run to the new one
//     $(currentCompassPosition).stop().animate(to, {
//         duration: 2000,
//         step: function() {
//             $("#compass").attr("transform", translateValue
//                 + " rotate(" + this.property + ")")
//         }
//     });
// }

var currentSpeedforanimaton = {property: 0};
function moveSpeed(currentSpeedKMPH) {
    var degrees =currentSpeedKMPH+50
    // we use a svg transform to move to correct orientation
    var translateValue  = "translate(171,157)";
    var to = {property: Math.round(degrees)};

    // stop the current animation and run to the new one
    $(currentSpeedforanimaton).stop().animate(to, {
        duration: 2000,
        step: function() {
            $("#speed").attr("transform", translateValue
                + " rotate(" + this.property + ")")
        }
    });
}

function geofailure(event) {
    
     console.log('Error occurred. Error code: ' + event);
}



let currentSpeedLimit = 50;
const speedlimit50= document.getElementById("s50")
const speedlimit80= document.getElementById("s80")
const speedlimit100 = document.getElementById("s100")
const speedlimit30 = document.getElementById("s30")

const infocurrlim = document.getElementsByClassName("info-curr-lim")[0]

function updateSpeedLimit(lim){
    currentSpeedLimit= lim;
    infocurrlim.innerHTML = 'set limit:'+ lim
    
}

speedlimit100.addEventListener('click',()=>{updateSpeedLimit(102)})
speedlimit80.addEventListener('click',()=>{updateSpeedLimit(82)})
speedlimit50.addEventListener('click',()=>{updateSpeedLimit(51)})
speedlimit30.addEventListener('click',()=>{updateSpeedLimit(30)})


setInterval(soundAlarm,500)


function soundAlarm(){
    if (currentSpeedKMPH!=null&& (currentSpeedKMPH > currentSpeedLimit) ){
        playAlarm()
    }else{
        stopAlarm()
    }

}
var audio = new Audio('./poli1.mp3');


function playAlarm(){
    audio.play();
}

function stopAlarm(){
    audio.pause()
}

if('serviceWorker' in navigator) {
    let registration;
  
    const registerServiceWorker = async () => {
      registration = await          navigator.serviceWorker.register('./service-worker.js');
    };
  
    registerServiceWorker();
  }



