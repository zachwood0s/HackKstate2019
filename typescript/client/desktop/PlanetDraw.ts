import { Vector } from "../../shared/Vector";
import { RenderSprite } from "./RenderSprite";
import { HoverDraw } from "./HoverDraw";

class PlanetDraw {
    private _ctx : CanvasRenderingContext2D;
    private _position : Vector;
    private _size : number;

    private _planetSprite : RenderSprite | null;
    private _selection : HoverDraw;

    constructor (ctx : CanvasRenderingContext2D, position : Vector, size : number){
        this._ctx  = ctx;
        this._position = position;
        this._size = size;

        this._planetSprite = null;
        this._selection = new HoverDraw(ctx, position, size + 10)
    }

    public CreateSpriteAnimation(spriteSheet : string, windowPosition : Vector, windowSize : Vector, 
                                 tics : number, speed : number = 1) : void {
        this._planetSprite = new RenderSprite(this._ctx, this._position, new Vector(this._size, this._size), spriteSheet);
        this._planetSprite.SetAnimationFrame(windowPosition, windowSize, tics, speed)
    }

    public AddHover(playerNum : number) : void {
        this._selection.AddPlayer(playerNum)
    }

    public RemoveHover(playerNum : number) : void {
        this._selection.RemovePlayer(playerNum)
    }

    public SetOwner(playerNum : number) : void {
        this._selection.SetOwner(playerNum);
    }

    public Render() : void {
        if (this._planetSprite != null) this._planetSprite.Draw()
    }
}

export {PlanetDraw}