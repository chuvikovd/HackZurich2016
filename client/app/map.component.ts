import { Component, OnInit } from 'angular2/core';
import { Message } from '../models/Message'
import { ChatService } from './chat.service';

@Component({
    selector: "map",
    //providers: [ChatService],
    template: `
    <div class="map-container">
        <div id="map">
      
        </div>
    </div>
  `
})

export class MapComponent implements OnInit {

    mapDiv;
    map;

    constructor(private _chatService: ChatService) {

        console.log('ChatService created');
        _chatService.getMessage$.subscribe(message => {
            console.log("PREVIEW " + message.body + message.lat + message.lng);
            customMarker(this.map, new Position(message.lat, message.lng), message.body);
        })
    }

    ngOnInit(){
        this.mapDiv = document.getElementById("map");
        this.map = new google.maps.Map(this.mapDiv, {
            center: new Position(42.9837, -81.2497),
            zoom: 15
        });

        /*this.infoWindow = new google.maps.InfoWindow({map: this.map});
        this.infoWindow.setContent('Location found.');*/
        //customMarker(this.map, new Position(this.messages[0].lat, this.messages[0].lng));
        //customMarker(this.map, new Position(42.9837, -81.2497), "azaza");
    }

}

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

    setTimeout(() => {
        marker.remove();
        marker.div = null;
    }, 5000);

};

let Position = google.maps.LatLng;