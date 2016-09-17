function getPosition(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, function (err) {
                console.log(err);
            },
            {
                enableHighAccuracy: false,
                timeout: 60000,
                maximumAge: 60000
            })
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getAccurateLocation(callback) {
    if (!navigator.geolocation) {
        console.log("Not accurate location called");
        getLessAccurateLocation(callback);
        return;
    }

    console.log("Test log");

    var options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    navigator.geolocation.getCurrentPosition(function (pos) {
        callback([pos.coords.latitude, pos.coords.longitude])
    }, function() {
        getLessAccurateLocation(callback);
    }, options);
}

function getLessAccurateLocation(callback) {

    $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCZjE5z3hfWhw_ECLg2IExPcZ4Wxu-tOdg')
        .done(function (locData) {
            callback([locData.location.lat, locData.location.lng])
        });
}

var Position = google.maps.LatLng;

CustomMarker.prototype = new google.maps.OverlayView();

function CustomMarker(opts) {
    this.setValues(opts);
    this.deleted = false;
}

CustomMarker.prototype.draw = function() {
    if(this.deleted) return;
    var self = this;
    var div = this.div;


    if (!div) {
        div = this.div = $('' +
            '<div>' +
            '<div class="shadow"></div>' +
            '<div class="pulse"></div>' +
            '<div class="pin-wrap">' +
            '<div class="pin">' +
            '<div class="content">' +
            '<span class="author">Dmitrijs:</span>' +
            '<p>' + this.data + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '')[0];
        this.pinWrap = this.div.getElementsByClassName('pin-wrap');
        this.pin = this.div.getElementsByClassName('pin');
        this.pinShadow = this.div.getElementsByClassName('shadow');
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
        google.maps.event.addDomListener(div, "click", function(event) {
            google.maps.event.trigger(self, "click", event);
        });
    }
    var point = this.getProjection().fromLatLngToDivPixel(this.position);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};

CustomMarker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
    this.deleted = true;
};

var customMarker = function(map, pos, data) {

    var marker = new CustomMarker({
        position: pos,
        map: map,
        data: data
    });

    setTimeout(function(){
        marker.remove();
    marker.div = null;
}, 5000);

};

var map;

$( document ).ready(function() {
    console.log( "ready!" );

    var mapDiv = document.getElementById("map");
    getAccurateLocation(function (pos) {
        console.log(pos[0], pos[1]);
        map = new google.maps.Map(mapDiv, {
            center: new Position(pos[0], pos[1]),
            zoom: 15
        });
    });

    $('#login-button').on("click", function (e) {
        e.preventDefault();
        Client.joinChat($("#login-input").val());
        $("#login").hide();
    });

    $('#send').on("click", function (e) {
        e.preventDefault();
        Client.sendMessage($("#input").val());
    });

});