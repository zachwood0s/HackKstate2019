import {Player} from "./Player";
import {ResourceType} from "./globals";
import {Link} from "./Link";

enum Focus {
    Unfocused,
    Labor,
    Material,
    Millitary,
    Technology
}


class Buffer{
    public static readonly BUFFER_MAX : number = 100;
    public laborQuantity: [ResourceType.Labor, number]          = [ResourceType.Labor, 0];
    public materialsQuantity: [ResourceType.Material, number]   = [ResourceType.Material, 0];
    public millitaryQuantity: [ResourceType.Millitary, number]  = [ResourceType.Millitary, 0];
}

class Planet{
    public name: string;
    public reasourceDensity: number;
    public carryingCapacity: number;

    public focus: Focus             = Focus.Unfocused;
    public inputs: Array<Link>      = [];
    public outputs: Array<Link>     = [];
    public owner: Player | null     = null;
    public hovered: boolean         = false;
    public buffers: Buffer           = new Buffer();

    constructor(nameIn: string, carryingCapacityIn: number, reasourceDensityIn: number){
        this.name = nameIn;
        this.carryingCapacity = carryingCapacityIn;
        this.reasourceDensity = reasourceDensityIn;
    }

    public toString(): string{
        return this.name+";";
    }
}
export{Buffer};
export{Planet};