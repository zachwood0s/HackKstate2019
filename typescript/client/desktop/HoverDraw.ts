import { Vector } from "../../shared/Vector";

class HoverDraw {
    private static readonly COLORS : Array<string> = ["red", "yellow", "blue", "green"];

    private _ctx : CanvasRenderingContext2D;
    private _position : Vector;
    private _radius : number;
    private _playerCount : number
    private _playersHovered : Array<number>;

    constructor(ctx : CanvasRenderingContext2D, position : Vector, diameter : number) {
        this._ctx = ctx;
        this._position = position;
        this._radius = diameter/2;
        this._playersHovered = new Array()
        this._playerCount = 0;
    }

    public AddPlayer(playerNumber : number) {
        this._playersHovered.push(playerNumber)
        this._playerCount++;
    }

    public RemovePlayer(playerNumber : number) {
        this._playersHovered.slice(playerNumber)
        this._playerCount--;
    }

    public Render() : void {
        let pathSize : number = (2 * Math.PI) / this._playerCount
        let startAngle : number = (this._playerCount - 1) * pathSize;
        let endAngle : number = this._playerCount * pathSize;
        this._ctx.beginPath();
        this._ctx.arc(this._position.x, this._position.y, this._radius, startAngle, endAngle);
        this._ctx.fill();
    }
}

export {HoverDraw}