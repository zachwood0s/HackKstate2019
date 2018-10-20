import { Vector } from "../../shared/Vector";
import { ResourceType } from "../../shared/globals"

const FOCUS_COLORS : Array<string> = ["red", "green", "yellow"];
class TransferDraw {
    private readonly AN_DEN : number = 5;
    private readonly SIZE : number = 5;

    private _ctx : CanvasRenderingContext2D;
    public _startPosition : Vector = new Vector(0,0);
    public _endPosition : Vector = new Vector(0,0)
    private _rects : Array<Rectangle> = [];
    private _statTime : number;
    public _ID : number;

    public _resource : number;
    public _vec : Vector;
    private _speed : number;

    constructor (ctx : CanvasRenderingContext2D, startPos : Vector, endPos : Vector, rad : number, resource : ResourceType,
         speed : number, id : number) {
        this._ctx = ctx;
        this._resource = resource;
        this._speed = speed;
        this._ID = id;

        let difX = endPos.x - startPos.x;
        let difY = endPos.y - startPos.y
        let mag = Math.sqrt(difX * difX + difY * difY);
        this._vec = new Vector(difX / mag ,difY / mag);
        this._startPosition.x = startPos.x + (this._vec.x * rad);
        this._startPosition.y = startPos.y + (this._vec.y * rad);
        this._endPosition.x = endPos.x - (this._vec.x * rad);
        this._endPosition.y = endPos.y - (this._vec.y * rad);
        this._statTime = Date.now();
    }

    public Set(startPos : Vector, endPos : Vector, rad : number, resource : ResourceType, speed : number) {
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
        this._ctx.strokeStyle = FOCUS_COLORS[this._resource]
        this._ctx.stroke();    

        let rm = -1;
        for(let i = 0; i < this._rects.length; i++) {
            this._ctx.beginPath();
            this._ctx.arc(this._rects[i].Position.x, this._rects[i].Position.y, this.SIZE, 0, Math.PI*2);
            this._ctx.fillStyle = FOCUS_COLORS[this._resource]
            this._ctx.fill();
            let difX = this._endPosition.x - this._rects[i].Position.x;
            let difY = this._endPosition.y - this._rects[i].Position.y;
            if(Math.abs(difX) < Math.abs(this._vec.x*this._speed*2) && Math.abs(difY) < Math.abs(this._vec.y*this._speed*2)) {
                rm = i;
            }
            this._rects[i].Position.x += this._vec.x * this._speed;
            this._rects[i].Position.y += this._vec.y * this._speed;
        }
        if(rm != -1) this._rects.splice(rm, 1);

        if(((Date.now() - this._statTime)/1000) > (1/this._speed)) {
            let rec = new Rectangle();
            rec.Position = new Vector(this._startPosition.x, this._startPosition.y);
            this._rects.push(rec)
            this._statTime = Date.now();
        }
    }
}

class Rectangle {
    public Position : Vector = new Vector(0,0);
    public Size : Vector = new Vector(0,0);
}

export { TransferDraw }