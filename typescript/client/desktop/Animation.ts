import { Vector } from "../.././shared/Vector";

class Animation {
    private _ctx : CanvasRenderingContext2D;
    private _spriteSheet : HTMLImageElement;
    private _windowX : number;
    private _windowY : number;
    private _windowWidth : number;
    private _windowHeight : number;
    private _windowTicks : number;
    private _speed : number;
    private _frame : number;
    private _startTime : number;

    constructor(ctx : CanvasRenderingContext2D, spriteSheet : string, windowX : number, windowY : number, 
                windowWidth : number, windowHeight : number, windowTicks : number, speed : number = 1){
        this._spriteSheet = new Image()
        this._spriteSheet.src = spriteSheet
        this._ctx = ctx;
        this._windowX = windowX;
        this._windowY = windowY;
        this._windowWidth = windowWidth;
        this._windowHeight = windowHeight;
        this._windowTicks = windowTicks;
        this._speed = speed;

        this._frame = 0;
        this._startTime = 0;
    }

    public SetPosition(position : Vector, size : Vector) {
        
    }

    public Draw(x : number, y : number, width : number, height : number) : void {
        if(((Date.now() - this._startTime)/1000) > (this._speed / this._windowTicks)) {
            this._frame++;
            this._startTime = Date.now();
            if(this._frame >= this._windowTicks) this._frame = 0;
        }

        this._ctx.drawImage(this._spriteSheet, this._windowX + (this._frame * this._windowWidth), this._windowY, 
                            this._windowWidth, this._windowHeight, x, y, width, height)
    }

    //public MoveObject(x : ) {

    //}
}

export { Animation }