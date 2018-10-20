import { Vector } from "../../shared/Vector";
import { posix } from "path";

class StorageStat {
    private _ctx : CanvasRenderingContext2D;
    private _position : Vector;
    private _size : Vector;
    private _currentStat : number;
    private _maxStat : number;

    constructor(ctx : CanvasRenderingContext2D, postion : Vector, size : Vector, currentStat : number, maxStat : number){
        this._ctx = ctx;
        this._position = postion;
        this._size = size;
        this._currentStat = currentStat;
        this._maxStat = maxStat;
        this._ctx.lineWidth = size.y
    }

    public Render() : void {
        this._ctx.beginPath();
        this._ctx.moveTo(this._position.x, this._position.y);
        this._ctx.lineTo(this._position.x + this._size.x, this._position.y);
        this._ctx.stroke();
    }
}

export { StorageStat }