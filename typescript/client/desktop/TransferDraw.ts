import { Vector } from "../../shared/Vector";

class TransferDraw {
    private static readonly FOCUS_COLORS : Array<string> = [];

    private _ctx : CanvasRenderingContext2D;
    private _startPosition : Vector;
    private _endPosition : Vector;
    private _ownerSpace : number;
    private _vec : Vector;

    constructor (ctx : CanvasRenderingContext2D, startPos : Vector, endPos : Vector, ownerSpace : number) {
        this._ctx = ctx;
        this._startPosition = startPos;
        this._endPosition = endPos;
        this._ownerSpace = ownerSpace;
        let difX = this._endPosition.x - this._startPosition.y;
        let difY = this._endPosition.y - this._startPosition.y
        let mag = Math.sqrt(difX * difX + difY * difY);
        this._vec = new Vector(difX / mag ,difY / mag)
        this._startPosition.x -= this._vec.x * ownerSpace;
        this._startPosition.y -= this._vec.y * ownerSpace;
    }

    public Render() : void {
        this._ctx.beginPath();
        this._ctx.moveTo(this._startPosition.x, this._startPosition.y)
        this._ctx.lineTo(this._endPosition.x, this._endPosition.y)
        this._ctx.stroke();
    }
}

export { TransferDraw }