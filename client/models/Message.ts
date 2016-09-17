export class Message{
    lat: number;
    lng: number;

    body: string;

    constructor(lat: number, lng: number, body: string){
        this.lat = lat;
        this.lng = lng;
        this.body = body;
    }
}