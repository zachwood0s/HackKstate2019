import {Player} from "./Player";
import {ResourceType} from "./globals";
import {Link} from "./Link";
import { Vector } from "./Vector";

enum Focus {
    Unfocused,
    Labor,
    Material,
    Millitary,
    Technology
}


class Buffer{
    public static readonly BUFFER_MAX : number = 100;
    public quantities : number[] = [0,0,0];
}

class Planet{
    public name: string;
    public reasourceDensity: number;
    public carryingCapacity: number;
    public occupyingForce = 10;

    public position: Vector         = new Vector(0, 0);
    public focus: Focus             = Focus.Unfocused;
    public inputs: Array<Link>      = [];
    public outputs: Array<Link>     = [];
    public owner: Player | null     = null;
    public hovered: Array<Player>   = [];
    public buffers: Buffer          = new Buffer();

    constructor(nameIn: string, carryingCapacityIn: number, reasourceDensityIn: number){
        this.name = nameIn;
        this.carryingCapacity = carryingCapacityIn;
        this.reasourceDensity = reasourceDensityIn;
    }
}
export{Buffer};
export{Planet};