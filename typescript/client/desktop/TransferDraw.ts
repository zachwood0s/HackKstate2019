import { Vector } from "../../shared/Vector";
import { ResourceType } from "../../shared/globals"

class TransferDraw {
    private readonly FOCUS_COLORS : Array<string> = ["red", "green", "yellow"];

    private _ctx : CanvasRenderingContext2D;
    private _startPosition : Vector = new Vector(0,0);
    private _endPosition : Vector = new Vector(0,0)

    private _resource : number;
    private _vec : Vector;

    constructor (ctx : CanvasRenderingContext2D, startPos : Vector, endPos : Vector, rad : number, resource : ResourceType) {
        this._ctx = ctx;
        this._resource = resource;

        let difX = endPos.x - startPos.x;
        let difY = endPos.y - startPos.y
        let mag = Math.sqrt(difX * difX + difY * difY);
        this._vec = new Vector(difX / mag ,difY / mag);
        this._startPosition.x = startPos.x + (this._vec.x * rad);
        this._startPosition.y = startPos.y + (this._vec.y * rad);
        this._endPosition.x = endPos.x - (this._vec.x * rad);
        this._endPosition.y = endPos.y - (this._vec.y * rad);
    }

    public Render() : void {
        this._ctx.beginPath();
        this._ctx.moveTo(this._startPosition.x, this._startPosition.y)
        this._ctx.lineTo(this._endPosition.x, this._endPosition.y)
        this._ctx.strokeStyle = this.FOCUS_COLORS[this._resource]
        this._ctx.stroke();
    }
}

export { TransferDraw }