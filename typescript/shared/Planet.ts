import {Player} from "./Player";
import {ResourceType} from "./globals";
import {Link} from "./Link";
import { Vector } from "./Vector";

export enum Focus {
    Labor,
    Material,
    Millitary,
    Technology,
    Unfocused
}

export class Buffer{
    public static readonly BUFFER_MAX : number = 100;
    public quantities : number[] = [0,0,0];
}

export class SpriteData {
    public Src : string = "";
    public Rotation : number = 0;
    public WindowPosition : Vector = new Vector(0, 0);
    public WindowSize : Vector = new Vector(0, 0);
    public Tics : number = 0;
    public Speed : number = 1;
}

export class Planet{
    public name: string;
    public reasourceDensity: number;
    public carryingCapacity: number;
    public occupyingForce = 10;

    public spriteData: SpriteData           = new SpriteData()
    public position: Vector                 = new Vector(0, 0);
    public size: number                     = 0;
    public focus: Focus                     = Focus.Unfocused;
    public inputs: Array<Link>              = [];
    public outputs: Array<Link>             = [];
    public owner: Player | null             = null;
    public hovered: Array<Player>           = [];
    public buffers: Buffer                  = new Buffer();
    public partialForceOwner: Player | null = null;

    constructor(nameIn: string, carryingCapacityIn: number, reasourceDensityIn: number){
        this.name = nameIn;
        this.carryingCapacity = carryingCapacityIn;
        this.reasourceDensity = reasourceDensityIn;
    }
}