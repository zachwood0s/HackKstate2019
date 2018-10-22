import {Events} from '../../shared/events';
import {List} from 'linqts';


type Predicate<T> = (e: T) => boolean;

interface EventHandler<T>{
    predicate?: Predicate<T>;
    handler: (e: T) => void;
}

class SocketManager{
    private _handlers: {[event: string]: List<EventHandler<any>>} = {};
    private _socket: SocketIOClient.Socket;

    constructor(socket: SocketIOClient.Socket){
        this._socket = socket;

    }

    private _SetupSockets(){
        for(let ev in Events){
            let evt: Events = Events[ev] as Events;
            let handleSpecific = curry2(this._HandleOn)(evt);
            this._socket.on(ev, handleSpecific);
        }
    }

    public On(event: Events, handler: EventHandler<any>){
        this._handlers[event].Add(handler);
    }

    private _HandleOn(event: Events, ...data: any){

    }
}

function curry2<T1, T2, T3>(fn: (a: T1, b: T2) => T3): (a: T1) => (b: T2) => T3{
    return function(a: T1){
        return function(b: T2){
            return fn(a, b);
        }
    }
}