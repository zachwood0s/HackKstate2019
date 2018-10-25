import { Planet } from "../../shared/Planet";
import { List } from "linqts";
import { SocketAdapter, SocketManager } from "./SocketManager";


class PlanetListElement{
    private _planet: Planet;
    private _socket: SocketManager;

    private _listElement: HTMLElement;
    
    constructor(planet: Planet, socket: SocketManager, list: HTMLElement){
        this._planet = planet;
        this._listElement = list;
        this._socket = socket;

        this._CreateHTMLElement();
    }

    private _CreateHTMLElement(){
        
    }
}

export class FullPlanetList{
    private _planets: List<Planet>;
    private _planetListElements: List<PlanetListElement>
    private _socket: SocketManager;

    private _listElement?: HTMLElement;

    constructor(planets: Planet[], socket: SocketManager){
        this._planets = new List(planets);
        this._planetListElements = new List();
        this._socket = socket;

        this._CreateListElements();
    }

    private _CreateListElements(){
        this._listElement = document.createElement('div');

        this._planets.ForEach((planet) => {
            if(this._listElement){
                if(planet) this._planetListElements.Add(new PlanetListElement(planet, this._socket, this._listElement));
            }
        });
    }
}