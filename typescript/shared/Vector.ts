export class Vector {
    public x : number;
    public y : number

    constructor(x : number, y : number){
        this.x = x
        this.y = y
    }

    public equals(obj: Vector): boolean{
        console.log(this, obj);
        return Math.abs(this.x - obj.x) < .01 && Math.abs(this.y - obj.y) <.01;
    }
}