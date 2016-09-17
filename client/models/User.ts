export class User{
    name: string;
    socket: SocketIO.Socket;

    constructor(name: string){
        this.name = name;
    }
}