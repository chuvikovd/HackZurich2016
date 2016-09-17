System.register(['angular2/core', './chat.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, chat_service_1;
    var MapComponent, customMarker, Position;
    function CustomMarker(opts) {
        this.setValues(opts);
        this.deleted = false;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (chat_service_1_1) {
                chat_service_1 = chat_service_1_1;
            }],
        execute: function() {
            MapComponent = (function () {
                function MapComponent(_chatService) {
                    var _this = this;
                    this._chatService = _chatService;
                    _chatService.getMessage$.subscribe(function (message) {
                        console.log("PREVIEW " + message.body + message.user.lat + message.user.long);
                        customMarker(_this.map, new Position(message.user.lat, message.user.long), message.body);
                    });
                }
                MapComponent.prototype.ngOnInit = function () {
                    this.mapDiv = document.getElementById("map");
                    this.map = new google.maps.Map(this.mapDiv, {
                        center: new Position(this._chatService.user.lat, this._chatService.user.long),
                        zoom: 15
                    });
                    /*this.infoWindow = new google.maps.InfoWindow({map: this.map});
                    this.infoWindow.setContent('Location found.');*/
                    //customMarker(this.map, new Position(this.messages[0].lat, this.messages[0].lng));
                    //customMarker(this.map, new Position(42.9837, -81.2497), "azaza");
                };
                MapComponent = __decorate([
                    core_1.Component({
                        selector: "map",
                        //providers: [ChatService],
                        template: "\n    <div class=\"map-container\">\n        <div id=\"map\">\n      \n        </div>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [chat_service_1.ChatService])
                ], MapComponent);
                return MapComponent;
            }());
            exports_1("MapComponent", MapComponent);
            CustomMarker.prototype = new google.maps.OverlayView();
            CustomMarker.prototype.draw = function () {
                if (this.deleted)
                    return;
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
                    google.maps.event.addDomListener(div, "click", function (event) {
                        google.maps.event.trigger(self, "click", event);
                    });
                }
                var point = this.getProjection().fromLatLngToDivPixel(this.position);
                if (point) {
                    div.style.left = point.x + 'px';
                    div.style.top = point.y + 'px';
                }
            };
            CustomMarker.prototype.remove = function () {
                if (this.div) {
                    this.div.parentNode.removeChild(this.div);
                    this.div = null;
                }
                this.deleted = true;
            };
            customMarker = function (map, pos, data) {
                var marker = new CustomMarker({
                    position: pos,
                    map: map,
                    data: data
                });
                setTimeout(function () {
                    marker.remove();
                    marker.div = null;
                }, 5000);
            };
            Position = google.maps.LatLng;
        }
    }
});

//# sourceMappingURL=map.component.js.map
