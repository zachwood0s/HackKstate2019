import { Vector } from "../../shared/Vector";
import { ResourceType } from "../../shared/globals";

class HoverDraw {
    public static readonly COLORS : Array<string> = ["#F44336", "#2196F3", "#4CAF50", "#FFC107"];
    public readonly OWNERSPACE : number = 10;
    private readonly HOVERSPACE : number = 10;
    private readonly HOVERALFA : number = .8;

    private _ctx : CanvasRenderingContext2D;
    private _position : Vector;
    private _radiusHover : number;
    private _radiusOwner : number;
    private _playerHoverCount : number
    private _playersHovered : Array<number>;
    private _owner : number;
    private _resource : ResourceType = 0;

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

    public SetResourceProduced(r : ResourceType){
        this._resource = r;
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
                this._ctx.fillStyle = HoverDraw.COLORS[playerNum - 1]
                this._ctx.fill();
                this._ctx.globalAlpha = 1;
                i++
            });  
        }
        if(this._owner >= 1) {
            this._ctx.beginPath();
            this._ctx.lineWidth = 4;
            this._ctx.arc(this._position.x, this._position.y, this._radiusOwner, 0, Math.PI*2);
            this._ctx.strokeStyle = HoverDraw.COLORS[this._owner - 1]
            this._ctx.stroke();
        }
        else {
            this._ctx.beginPath();
            this._ctx.lineWidth = 4;
            this._ctx.arc(this._position.x, this._position.y, this._radiusOwner, 0, Math.PI*2);
            this._ctx.strokeStyle = "#424242"
            this._ctx.stroke();
        }
        let text = ""
        if(this._resource == ResourceType.Labor) text = "Labor";
        if(this._resource == ResourceType.Material) text = "Material";
        if(this._resource == ResourceType.Millitary) text = "Military";
        console.log(this._resource)
        this._ctx.fillText(text, this._position.x, this._position.y + this._radiusHover + 10)
    }
}

export {HoverDraw}