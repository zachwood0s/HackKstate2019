import { Vector } from "../../shared/Vector";

class RenderSprite {
    // Position
    private _ctx : CanvasRenderingContext2D;
    public Position : Vector;
    private _size : Vector;
    private _rotation : number = 0;

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
                             speed : number = 5, rotation : number = 0) : void {
        this._windowPosition = windowPosition;
        this._windowSize = windowSize;
        this._windowTicks = windowTicks;
        this._speed = speed;
        this._rotation = rotation;
    }

    public Draw() : void {
        // Render Sprite / Animation
        if (this._isSprite) {
            if(((Date.now() - this._startTime)/1000) > (this._speed / this._windowTicks)) {
                this._frame++;
                this._startTime = Date.now();
                if(this._frame >= this._windowTicks) this._frame = 0;
            }
            this._ctx.save();
            this._ctx.translate(this.Position.x + (this._size.x/2), this.Position.y + (this._size.y/2));
            this._ctx.rotate(this._rotation);
            this._ctx.drawImage(this._spriteSheet, this._windowPosition.x + (this._frame * this._windowSize.x), 
                                this._windowPosition.y, this._windowSize.x, this._windowSize.y, -this._size.x/2, 
                                -this._size.y/2, this._size.x, this._size.y)
            this._ctx.restore();
        }
    }
}

export { RenderSprite }
