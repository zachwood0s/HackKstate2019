import { Vector } from "../../shared/Vector";
import { RenderSprite, SpriteData } from "./RenderSprite";
import { HoverDraw } from "./HoverDraw";
import { TransferDraw } from "./TransferDraw";
import { ResourceType } from "../../shared/globals";
import { Planet } from "../../shared/Planet";

class PlanetDraw {
    private _ctx : CanvasRenderingContext2D;
    private _planet : Planet;
    private _position : Vector;
    private _size : number;

    private _planetSprite : RenderSprite | null;
    private _selection : HoverDraw;
    private _transfers : Array<TransferDraw> = [];

    constructor (ctx : CanvasRenderingContext2D, position : Vector, size : number, planet : Planet){
        this._ctx  = ctx;
        this._position = position;
        this._size = size;
        this._planet = planet;

        this._planetSprite = null;
        this._selection = new HoverDraw(ctx, position, size)
    }

    public CreateSpriteAnimation(spriteSheet : string, windowPosition : Vector, windowSize : Vector, 
                                 tics : number, speed : number = 1) : void {
        this._planetSprite = new RenderSprite(this._ctx, this._position, new Vector(this._size, this._size), spriteSheet);
        this._planetSprite.SetAnimationFrame(windowPosition, windowSize, tics, speed)
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

    public AddTransfer(endpos : Vector, restype : ResourceType) {
        this._transfers.push(new TransferDraw(this._ctx, this._position, endpos, this._selection.OWNERSPACE, restype))
    }

    public RemoveTransfers(){
        this._transfers = [];
    }

    public SetPlanet(sprite : SpriteData) : void  {
        this.CreateSpriteAnimation(sprite.Src, sprite.WindowPosition, sprite.WindowSize, sprite.Tics, sprite.Speed);
    
        this.RemoveHovers();
        this._planet.hovered.forEach(player => {
            this.AddHover(player.ID + 1);
        });
    
        if (this._planet.owner != null) this.SetOwner(this._planet.owner.ID + 1);
    
        this.RemoveTransfers();
        this._planet.outputs.forEach(out => {
            this.AddTransfer(out.to.position, out.type)
        });
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