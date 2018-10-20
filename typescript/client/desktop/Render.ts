import { Vector } from "../../shared/Vector";

class Render {
    private _ctx : CanvasRenderingContext2D;
    private _spriteSheet : HTMLImageElement;
    private _windowPosition : Vector;
    private _windowSize : Vector;
    private _position : Vector;
    private _size : Vector;
    private _windowTicks : number;
    private _speed : number;
    private _frame : number;
    private _startTime : number;

    constructor(ctx : CanvasRenderingContext2D, spriteSheet : string, position : Vector, size : Vector){
        this._spriteSheet = new Image()
        this._spriteSheet.src = spriteSheet
        this._ctx = ctx;
        this._position = position;
        this._size = size;

        this._windowPosition = new Vector(0, 0);
        this._windowSize = new Vector(this._spriteSheet.width, this._spriteSheet.height);
        this._windowTicks = 1;
        this._speed = 1;
        this._frame = 0;
        this._startTime = 0;
    }

    public SetRenderLocation(position : Vector, size : Vector = this._size) {
        this._position = position;
        this._size = size;
    }

    public SetAnimationFrame(windowPosition : Vector, windowSize : Vector, windowTicks : number, 
                             speed : number = 1){
        this._windowPosition = windowPosition;
        this._windowSize = windowSize;
        this._windowTicks = windowTicks;
    }

    public Draw() : void {
        if(((Date.now() - this._startTime)/1000) > (this._speed / this._windowTicks)) {
            this._frame++;
            this._startTime = Date.now();
            if(this._frame >= this._windowTicks) this._frame = 0;
        }

        this._ctx.drawImage(this._spriteSheet, this._windowPosition.x + (this._frame * this._windowSize.x), 
                            this._windowSize.y, this._windowSize.x, this._windowSize.y, this._position.x, this._position.y,
                            this._size.x, this._size.y)
    }

    public MoveObject(startPosition : Vector, endPosition : Vector, speed : number = 1) : void {
        let difX : number = endPosition.x - startPosition.x;
        let difY : number = endPosition.y - startPosition.y;
        this._position.x += difX * speed * .01;
        this._position.y += difY * speed * .01;
    }
}

export { Render }