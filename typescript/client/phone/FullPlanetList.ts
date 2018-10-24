import { Planet } from "../../shared/Planet";
import { List } from "linqts";


class PlanetListElement{
    private _planet: Planet;
    
    constructor(planet: Planet){
        this._planet = planet;
    }

}

class FullPlanetList{
    private _planets: List<Planet>;
    private _planetListElements: List<PlanetListElement>

    constructor(planets: Planet[]){
        this._planets = new List(planets);
        this._planetListElements = new List();

        this._CreateListElements();
    }

    private _CreateListElements(){
        this._planets.ForEach((planet) => {
            if(planet) this._planetListElements.Add(new PlanetListElement(planet));
        });
    }
}