import {Player} from "./player";

enum Focus {
    unfocused,
    Labor,
    Material,
    Millitary,
}

class Planet{
    public name: string;
    public reasourceDensity: Number;
    public carryingCapacity: Number;

    public focus: Focus             = Focus.unfocused;
    public inputs: Array<Link>      = [];
    public outputs: Array<Link>     = [];
    public owner: Player | null     = null;
    public hover: boolean           = false;

    

    constructor(n: string, c: Number, r: Number){
        this.name = n;
        this.carryingCapacity = c;
        this.reasourceDensity = r;
    }

    public toString(): string{
        return this.name+";";
    }
}

export{Planet};