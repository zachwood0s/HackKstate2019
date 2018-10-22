import {Events} from '../../shared/events';
import {List} from 'linqts';

export interface SocketAdapter{
    on(event: String, handler: Function) : void;
}

export type Predicate<T> = (...e: T[]) => boolean;

export interface EventHandler<T>{
    predicates?: Predicate<T|any>[];
    handler: (...e: (T | any)[]) => void;
}

export class SocketManager{
    private _handlers: {[event: string]: List<EventHandler<any>>} = {};
    private _socket: SocketAdapter;

    constructor(socket: SocketAdapter){
        this._socket = socket;

        this._SetupSockets();
    }

    private _SetupSockets(){
        for(let ev in Events){
            let evt: Events = Events[ev] as Events;
            let handleSpecific = curry2(this._HandleOn, this)(evt);
            this._socket.on(ev, handleSpecific);
        }
    }

    public Register<T>(event: string, handler: EventHandler<T>){
        if(!this._handlers[event]){
            this._handlers[event] = new List<EventHandler<T>>();
        }
        this._handlers[event].Add(handler);
    }

    private _HandleOn(event: string, ...data: any[]){
        if(this._handlers[event]){
            this._handlers[event].ForEach(elm => {
                if(elm){
                    if(!elm.predicates || elm.predicates.every(p => p(elm))){
                        elm.handler(...data)
                    }
                }
            });
        }
    }
}

function curry2<T1, T2, T3>(fn: (a: T1, b: T2) => T3, bind?: any): (a: T1) => (b: T2) => T3{
    return function(a: T1){
        return function(b: T2){
            return fn.bind(bind)(a, b);
        };
    };
}