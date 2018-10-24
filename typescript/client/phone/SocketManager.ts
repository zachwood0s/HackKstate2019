import {Events} from '../../shared/events';
import {List} from 'linqts';

export interface SocketAdapter{
    on(event: string, handler: Function) : void;
    emit(event: string, args: any[]): void;
}

export type Predicate<T> = (...e: T[]) => boolean;

export interface EventHandler{
    predicates?: Predicate<any>[];
    handler: (...e: any[]) => void;
}

export class SocketManager{
    private _handlers: {[event: string]: List<EventHandler>} = {};
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

    public Register<T>(event: string, handler: EventHandler){
        if(!this._handlers[event]){
            this._handlers[event] = new List<EventHandler>();
        }
        this._handlers[event].Add(handler);
    }

    private _HandleOn(event: string, data: any[]){
        if(this._handlers[event]){
            this._handlers[event].ForEach(elm => {
                if(elm){
                    if(!elm.predicates || elm.predicates.every(p => p(...data))){
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