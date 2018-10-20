import { Vector } from "../../shared/Vector";

function MoveObject(position : Vector, endPosition : Vector, speed : number = 1) : Vector {
    let difX : number = endPosition.x - position.x;
    let difY : number = endPosition.y - position.y;
    let mag : number = Math.sqrt(difX*difX + difY*difY);
    let velocity = new Vector((difX / mag)*speed, (difY / mag)*speed)
    endPosition = endPosition; 
    
    // Move animation
    if(Math.abs(position.x - endPosition.x) > velocity.x && 
        Math.abs(position.y - endPosition.y) > velocity.y ){
        position.x += velocity.x;
        position.y += velocity.y;
    }
    return position;
}

export { MoveObject }