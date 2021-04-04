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

var count = 0;
function geosuccess(event) {
     console.log('geosuccess');

    // var heading = Math.round(event.coords.heading);
    var speedKMPH = Math.round(event.coords.speed)*3.6;
    var accuracy = Math.round(event.coords.accuracy);
    $("#debugoutput").html("<h1>  Speed: " + speedKMPH   
                            + " KM/H"
                            +" </br> "
                            // +"compass value: "
                            // + heading 
                            +  "</br>updated: " 
                            + count++ 
                            + " times </br> accuracy:"
                            + accuracy
                            +" meters </h1>");

    console.log(event.coords)

    // if (heading != null) {
    //    moveCompassNeedle(heading);
    // }

    if (speedKMPH != null) {
        // update the speed

        moveSpeed(speedKMPH*0.384);
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

var currentSpeed = {property: 0};
function moveSpeed(speed) {

    // we use a svg transform to move to correct orientation
    var translateValue  = "translate(171,157)";
    var to = {property: Math.round(speed*3.6)};

    // stop the current animation and run to the new one
    $(currentSpeed).stop().animate(to, {
        duration: 2000,
        step: function() {
            $("#speed").attr("transform", translateValue
                + " rotate(" + this.property + ")")
        }
    });
}

function geofailure(event) {
    
     console.log('Error occurred. Error code: ' + error.code);
}
