import { Vector } from "../../shared/Vector";

class HoverDraw {
    private readonly COLORS : Array<string> = ["red", "yellow", "blue", "green"];
    private readonly OWNERSPACE : number = 20;
    private readonly HOVERSPACE : number = 10;

    private _ctx : CanvasRenderingContext2D;
    private _position : Vector;
    private _radiusHover : number;
    private _radiusOwner : number;
    private _playerHoverCount : number
    private _playersHovered : Array<number>;
    private _owner : number;

    constructor(ctx : CanvasRenderingContext2D, position : Vector, diameter : number) {
        this._ctx = ctx;
        this._position = position;
        this._radiusHover = (diameter / 2) +  this.HOVERSPACE;
        this._radiusOwner = (diameter / 2) + this.OWNERSPACE
        this._playersHovered = new Array()
        this._playerHoverCount = 0;
        this._owner = 0;
    }

    public AddPlayer(playerNumber : number) {
        this._playersHovered.push(playerNumber)
        this._playerHoverCount++;
    }

    public RemovePlayer(playerNumber : number) {
        this._playersHovered.slice(playerNumber)
        this._playerHoverCount--;
    }

    public SetOwner(playerNumber : number) {
        this._owner = 0;
    }

    public Render() : void {
        if (this._playerHoverCount >= 1){
            this._playersHovered.forEach(playerNum => {
                let pathSize : number = (2 * Math.PI) / this._playerHoverCount
                let startAngle : number = (playerNum - 1) * pathSize;
                let endAngle : number = playerNum * pathSize;
                this._ctx.beginPath();
                this._ctx.arc(this._position.x, this._position.y, this._radiusHover, startAngle, endAngle);
                this._ctx.fillStyle = this.COLORS[playerNum - 1]
                this._ctx.fill();
            });  
        }
        if(this._owner != 0) {
            this._ctx.beginPath();
            this._ctx.arc(this._position.x, this._position.y, this._radiusOwner, 0, Math.PI*2);
            this._ctx.strokeStyle = this.COLORS[this._owner]
            this._ctx.stroke();
        }
    }
}

export {HoverDraw}