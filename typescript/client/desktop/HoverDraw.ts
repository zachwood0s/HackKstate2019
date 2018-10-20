import { Vector } from "../../shared/Vector";

class HoverDraw {
    private readonly COLORS : Array<string> = ["red", "yellow", "blue", "green"];
    public readonly OWNERSPACE : number = 5;
    private readonly HOVERSPACE : number = 3;
    private readonly HOVERALFA : number = .5;

    private _ctx : CanvasRenderingContext2D;
    private _position : Vector;
    private _radiusHover : number;
    private _radiusOwner : number;
    private _playerHoverCount : number
    private _playersHovered : Array<number>;
    private _owner : number;

    constructor(ctx : CanvasRenderingContext2D, position : Vector, diameter : number) {
        this._ctx = ctx;
        this._position = new Vector(position.x + diameter/2, position.y + diameter/2);
        this._radiusHover = (diameter / 2) +  this.HOVERSPACE;
        this._radiusOwner = (diameter / 2) + this.OWNERSPACE
        this._playersHovered = new Array()
        this._playerHoverCount = 0;
        this._owner = -1;
    }

    public AddPlayer(playerNumber : number) {
        this._playersHovered.push(playerNumber)
        this._playerHoverCount++;
    }

    public RemoveAll() {
        this._playersHovered = [];
        this._playerHoverCount = 0;
    }

    public SetOwner(playerNumber : number) {
        this._owner = playerNumber;
    }

    public Render() : void {
        if (this._playerHoverCount >= 1){
            let i = 0;
            this._playersHovered.forEach(playerNum => {
                let pathSize : number = (2 * Math.PI) / this._playerHoverCount
                let startAngle : number = (i) * pathSize;
                let endAngle : number = (i+1) * pathSize;
                this._ctx.beginPath();
                this._ctx.arc(this._position.x, this._position.y, this._radiusHover, startAngle, endAngle);
                this._ctx.globalAlpha = this.HOVERALFA;
                this._ctx.fillStyle = this.COLORS[playerNum - 1]
                this._ctx.fill();
                i++
            });  
        }
        if(this._owner >= 1) {
            this._ctx.beginPath();
            this._ctx.arc(this._position.x, this._position.y, this._radiusOwner, 0, Math.PI*2);
            this._ctx.strokeStyle = this.COLORS[this._owner - 1]
            this._ctx.stroke();
        }
    }
}

export {HoverDraw}