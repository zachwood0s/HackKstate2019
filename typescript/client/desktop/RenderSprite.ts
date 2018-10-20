import { Vector } from "../../shared/Vector";

class RenderSprite {
    // Position
    private _ctx : CanvasRenderingContext2D;
    public Position : Vector;
    private _size : Vector;;

    // Animation
    private _spriteSheet : CanvasImageSource = new Image();
    private _windowPosition : Vector = new Vector(0, 0);
    private _windowSize : Vector = new Vector(0, 0);
    private _windowTicks : number = 1;
    private _speed : number = 1;
    private _frame : number = 0;
    private _isSprite : boolean = true;
    private _startTime : number = 0;

    constructor(ctx : CanvasRenderingContext2D, position : Vector, size : Vector = new Vector(0,0), 
                spriteSheet : string = "") {
        if (spriteSheet != "") {
            this._spriteSheet = new Image()
            this._spriteSheet.src = spriteSheet
            this._windowSize = new Vector(this._spriteSheet.width, this._spriteSheet.height)
        }
        else {
            this._isSprite = false;
        }

        this._ctx = ctx;
        this.Position = position;
        this._size = size;
    }

    public SetRenderLocation(position : Vector, size : Vector = this._size) {
        this.Position = position;
        this._size = size;
    }

    public SetAnimationFrame(windowPosition : Vector, windowSize : Vector, windowTicks : number, 
                             speed : number = 5) : void {
        this._windowPosition = windowPosition;
        this._windowSize = windowSize;
        this._windowTicks = windowTicks;
        this._speed = speed;
    }

    public Draw() : void {
        // Render Sprite / Animation
        if (this._isSprite) {
            if(((Date.now() - this._startTime)/1000) > (this._speed / this._windowTicks)) {
                this._frame++;
                this._startTime = Date.now();
                if(this._frame >= this._windowTicks) this._frame = 0;
            }
            this._ctx.drawImage(this._spriteSheet, this._windowPosition.x + (this._frame * this._windowSize.x), 
                                this._windowPosition.y, this._windowSize.x, this._windowSize.y, this.Position.x, 
                                this.Position.y, this._size.x, this._size.y)
            console.log("Planet")
        }
    }
}

class SpriteData {
    public Src : string;
    public WindowPosition : Vector;
    public WindowSize : Vector;
    public Tics : number;
    public Speed : number;

    constructor(src : string, pos : Vector, size : Vector, tics : number, speed : number) {
        this.WindowPosition = pos;
        this.WindowSize = size;
        this.Tics = tics;
        this.Src = src;
        this.Speed = speed;
    }
}

export { RenderSprite }
export { SpriteData }