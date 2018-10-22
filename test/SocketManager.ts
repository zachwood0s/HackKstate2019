import {expect} from 'chai';
import {SocketManager, SocketAdapter} from '../typescript/client/phone/SocketManager';
import { List } from 'linqts';
import { Events } from '../typescript/shared/events';

class FakeSocket implements SocketAdapter{
    private _handlers: {[event: string]: List<Function>} = {};
    public on(evt: string, fn: Function){
        if(!this._handlers[evt]){
            this._handlers[evt] = new List<Function>();
        }
        this._handlers[evt].Add(fn);
    }
    public DoFakeBroadcast(evt: string, ...data: any[]){
        if(this._handlers[evt]){
            this._handlers[evt].ForEach(elm => {
                if(elm) elm(...data);
            });
        }
    }
}
describe('SocketManager', () => {
    let fakeSocket = new FakeSocket();
    it("Can register a handler", ()=>{
        let m = new SocketManager(fakeSocket);
        let wasTriggered = false;
        m.Register(Events.PLAYER_ID, {
            handler: () => {
                wasTriggered = true;
            }
        });

        fakeSocket.DoFakeBroadcast(Events.PLAYER_ID, false);
        expect(wasTriggered).to.equal(true);
    });
    it("Doesn't respond to events not being listened to", () => {
        let m = new SocketManager(fakeSocket);
        let wasTriggered = false;
        m.Register(Events.PLAYER_ID, {
            handler: () => {
                wasTriggered = true;
            }
        });

        //Notice I'm sending PLAYER_JOINED, not PLAYER_ID
        fakeSocket.DoFakeBroadcast(Events.PLAYER_JOINED);
        expect(wasTriggered).to.equal(false);
    });
    it("Allows multiple handlers for one event type", ()=>{
        let m = new SocketManager(fakeSocket);
        let wasTriggered1 = false;
        let wasTriggered2 = false;

        m.Register(Events.PLAYER_ID, {
            handler: () =>{
                wasTriggered1 = true;
            }
        })
        m.Register(Events.PLAYER_ID, {
            handler: () =>{
                wasTriggered2 = true;
            }
        })
        fakeSocket.DoFakeBroadcast(Events.PLAYER_ID);
        expect(wasTriggered1).to.equal(true);
        expect(wasTriggered2).to.equal(true);
    });
    it("Allows for an extra condition to be met before applying", () => {
        let m = new SocketManager(fakeSocket);
        let wasTriggered1 = false;
        let wasTriggered2 = false;
        let val1 = 10;
        m.Register(Events.PLAYER_ID, {
            predicates: [()=>val1 > 0],
            handler: () =>{
                wasTriggered1 = true;
            }
        })
        m.Register(Events.PLAYER_ID, {
            predicates: [()=>val1 < 0],
            handler: () =>{
                wasTriggered2 = true;
            }
        })
        fakeSocket.DoFakeBroadcast(Events.PLAYER_ID);
        expect(wasTriggered1).to.equal(true);
        expect(wasTriggered2).to.equal(false);
    });
    it("Allows for multiple conditions to be met before applying", () => {
        let m = new SocketManager(fakeSocket);
        let wasTriggered1 = false;
        let wasTriggered2 = false;
        let val1 = 10; let val2 = 100;
        m.Register(Events.PLAYER_ID, {
            predicates: [()=>val1 > 0, ()=>val2<200],
            handler: () => {
                wasTriggered1 = true;
            }
        })
        m.Register(Events.PLAYER_ID, {
            predicates: [()=>val1>0, ()=>val2<100],
            handler: ()=>{
                wasTriggered2 = true;
            }
        });
        fakeSocket.DoFakeBroadcast(Events.PLAYER_ID);
        expect(wasTriggered1).to.equal(true);
        expect(wasTriggered2).to.equal(false);
    });
    it("Can pass data through an event", () =>{
        let m = new SocketManager(fakeSocket);
        let passedString = "";
        let expected = "Hello";
        m.Register(Events.PLAYER_ID, {
            handler: (data: string) => {
                passedString = data;
            }
        })
        fakeSocket.DoFakeBroadcast(Events.PLAYER_ID, expected);
        expect(passedString).to.equal(expected);
    })
});