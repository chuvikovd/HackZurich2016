import { Component, OnInit } from 'angular2/core';
import { Message } from '../models/Message'

@Component({
    selector: "chat-app",
    template: `
    <div class="map-container">
        <div id="map">
      
        </div>
    </div>
    <button (click)="showZurich()">Show Zurich</button>
  `
})

export class MapComponent implements OnInit {

    mapDiv = document.getElementById("map");
    map;
    infoWindow;

    ngOnInit(){
        this.map = new google.maps.Map(this.mapDiv, {
            center: new Position(42.9837, -81.2497),
            zoom: 8
        });
        /*this.infoWindow = new google.maps.InfoWindow({map: this.map});
        this.infoWindow.setContent('Location found.');*/
        customMarker(this.map, new Position(47.389733899999996, 8.5165039));
        customMarker(this.map, new Position(42.9837, -81.2497));
    }

    showZurich() {
        this.infoWindow.setPosition({lat: 47.3898377, lng: 8.5163581});
        this.map.setCenter({lat: 47.3898377, lng: 8.5163581});

    }

}

CustomMarker.prototype = new google.maps.OverlayView();

function CustomMarker(opts) {
    this.setValues(opts);
}

CustomMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;
    if (!div) {
        div = this.div = $('' +
            '<div>' +
            '<div class="shadow"></div>' +
            '<div class="pulse"></div>' +
            '<div class="pin-wrap">' +
            '<div class="pin"></div>' +
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

var customMarker = function(map, pos) {

    var marker = new CustomMarker({
        position: pos,
        map: map,
    });

};

let Position = google.maps.LatLng;