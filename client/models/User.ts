export class User {
    name: string;
    lat: number;
    long: number;

    socket: SocketIO.Socket;

    constructor(name: string, lat: number, long: number){
        this.name = name;
        this.lat = lat;
        this.long = long;
    }
}