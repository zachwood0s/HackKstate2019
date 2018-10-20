import {Player} from "./player";

enum Focus {
    Unfocused,
    Labor,
    Material,
    Millitary,
    Technology
}

enum ResourceType {
    Labor,
    Material,
    Millitary,
}

class Buffer{
    public laborQuantity: [ResourceType.Labor, Number]          = [ResourceType.Labor, 0];
    public materialsQuantity: [ResourceType.Material, Number]   = [ResourceType.Material, 0];
    public millitaryQuantity: [ResourceType.Millitary, Number]  = [ResourceType.Millitary, 0];
}

class Planet{
    public name: string;
    public reasourceDensity: Number;
    public carryingCapacity: Number;

    public focus: Focus             = Focus.Unfocused;
    public inputs: Array<Link>      = [];
    public outputs: Array<Link>     = [];
    public owner: Player | null     = null;
    public hovered: boolean         = false;
    public buffer: Buffer           = new Buffer();


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