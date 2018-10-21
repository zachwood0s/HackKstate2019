import { Vector } from "../../shared/Vector";
import { RenderSprite } from "./RenderSprite";
import { HoverDraw } from "./HoverDraw";
import { TransferDraw } from "./TransferDraw";
import { ResourceType } from "../../shared/globals";
import { Planet } from "../../shared/Planet";
import { version } from "punycode";

class PlanetDraw {
    public name : string;
    private _ctx : CanvasRenderingContext2D;
    private _position : Vector;
    private _size : number;

    private _planetSprite : RenderSprite | null;
    private _selection : HoverDraw;
    private _transfers : Array<TransferDraw> = [];

    constructor (ctx : CanvasRenderingContext2D, position : Vector, size : number, name : string) {
        this._ctx  = ctx;
        this._position = position;
        this._size = size;
        this.name = name;

        this._planetSprite = null;
        this._selection = new HoverDraw(ctx, position, size)
    }

    public CreateSpriteAnimation(spriteSheet : string, windowPosition : Vector, windowSize : Vector, 
                                 tics : number, speed : number = 1, rotation : number = 0) : void {
        this._planetSprite = new RenderSprite(this._ctx, this._position, new Vector(this._size, this._size), spriteSheet);
        this._planetSprite.SetAnimationFrame(windowPosition, windowSize, tics, speed, rotation)
    }

    public AddHover(playerNum : number) : void {
        this._selection.AddPlayer(playerNum);
    }

    public RemoveHovers() : void {
        this._selection.RemoveAll();
    }

    public SetOwner(playerNum : number) : void {
        this._selection.SetOwner(playerNum);
    }

    public AddTransfer(endpos : Vector, restype : ResourceType, speed : number, id : number, pnum : number) {
        let pos = new Vector(this._position.x + (this._size / 2), this._position.y + (this._size / 2));
        let end = new Vector(endpos.x + this._size / 2, endpos.y + this._size / 2);
        let rad = this._selection.OWNERSPACE + (this._size / 2)
        let add = true;
        let trans = new TransferDraw(this._ctx, pos, end, rad, restype, speed, id, pnum)
        this._transfers.forEach(t => {
            if (t._resource == restype) add = false;
        });
        if(add) {
            this._transfers.push(trans)
        }
    }

    public RemoveTransfer(id : number){
        for (let i = 0; i < this._transfers.length; i++){
            if(this._transfers[i]._ID == id) {
                this._transfers.splice(i, 1);
                break;
            }
        }
    }

    public Render() : void {
        this._transfers.forEach(t => {
            t.Render();
        });
        this._selection.Render();
        if (this._planetSprite != null) this._planetSprite.Draw();      
    }
}

export {PlanetDraw}