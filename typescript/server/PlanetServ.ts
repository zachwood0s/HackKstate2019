import {Planet} from "../shared/Planet";
import {Buffer} from "../shared/Planet";
import {ResourceType} from "../shared/globals";
import {Player} from "../shared/Player";

class PlanetServ extends Planet{

    public Update(){
     this.UpdateOutputs(1);   
     this.UpdateOwner();
    }
    
    public static DownCast(planet : Planet) : PlanetServ{
        let planetServ = new PlanetServ(planet.name, planet.carryingCapacity, planet.reasourceDensity);
        planetServ.focus = planet.focus;
        planetServ.inputs = planet.inputs;
        planetServ.outputs = planet.outputs;
        planetServ.owner = planet.owner;
        planetServ.hovered = planet.hovered;
        planetServ.buffers = planet.buffers;
        return planetServ;
    }

    public UpdateOutputs(dt : number){
        for(let output of this.outputs){
            let outQuantitySet = (output.rate*dt);
            let outQuantityMax : number;

            if(outQuantitySet > this.buffers.quantities[output.type]){
                outQuantityMax = 0;
            }else{
                outQuantityMax = outQuantitySet;
            }

            let amountUsed = 0;

            if(output.type == ResourceType.Millitary && output.from.owner != output.to.owner && output.from.owner != output.to.partialForceOwner){
                //Attack is happening
                
                let newMil = output.to.buffers.quantities[ResourceType.Millitary] - outQuantityMax;

                if(newMil < 0){//Defending force has lost
                    newMil = Math.abs(newMil);
                    
                    if(newMil > Buffer.BUFFER_MAX){//set quantities
                        output.to.buffers.quantities[ResourceType.Millitary] = Buffer.BUFFER_MAX;
                        let overage = newMil - Buffer.BUFFER_MAX;
                        amountUsed = outQuantityMax - overage;
                    }else{
                        amountUsed = outQuantityMax;
                        output.to.buffers.quantities[ResourceType.Millitary] = newMil;
                    }

                    if(newMil > output.to.occupyingForce){//set owners
                        output.to.owner = output.from.owner;
                        output.to.partialForceOwner = null;
                    }else{
                        output.to.owner = null;
                        output.to.partialForceOwner = output.from.owner;
                    }

                }else{//Defending force is surviving
                    
                    output.to.buffers.quantities[ResourceType.Millitary] = newMil;
                    amountUsed = outQuantityMax;

                    if(newMil < output.to.occupyingForce){
                        output.to.owner = null;
                    }
                }
                output.from.buffers.quantities[ResourceType.Millitary] -= amountUsed;
            }
            else{
                //Adding reasource types if not an attack
                amountUsed = outQuantityMax - (<PlanetServ>output.to).Receive(outQuantityMax, output.type);
                output.from.buffers.quantities[output.type] -= amountUsed;
                console.log("ammount", amountUsed);
            }

            output.from.buffers.quantities[ResourceType.Material] -= amountUsed;
        }
    }

    public Receive(amount : number, type : ResourceType) : number{

        let total = this.buffers.quantities[type] + amount;
        let overage;

        if(total > Buffer.BUFFER_MAX) {
            this.buffers.quantities[type] = Buffer.BUFFER_MAX;
            overage = (total - Buffer.BUFFER_MAX);
        }else{
            this.buffers.quantities[type] = total;
            overage = 0;
        }
        return 0;
    }

    public updateAttackState(){
     //   if(this.buffers.quantities[ResourceType.Millitary])
    }

    public UpdateOwner(attacker?: Player){

        if(this.buffers.quantities[ResourceType.Millitary] < this.occupyingForce){
            this.owner = null;
        }else if(attacker){
            this.owner = attacker;
        }

    }

}

export{PlanetServ};