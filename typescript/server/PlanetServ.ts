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
            let netLost = 0;

            if(output.type == ResourceType.Millitary && output.from.owner != output.to.owner){
                
                if(!output.to.owner){
                    //Attacking an unowned planet
                    if(output.to.partialForceOwner == output.from.owner){
                        //Adding to partial force
                        let overage = (<PlanetServ>output.to).Receive(
                            outQuantityMax, 
                            ResourceType.Millitary);
                        netLost = outQuantityMax - overage;
                        
                    }else{
                        //Subtracting from partial force
                        output.to.buffers.quantities
              
                    }
                }else{
                    //Attacking an owned planet

                }
                output.to.buffers.quantities[output.type] -= netLost;
            }else{
                //Adding reasource types if not an attack
                (<PlanetServ>output.to).Receive(this.buffers.quantities[output.type], output.type);
            }

            
        }
    }

    public Receive(amount : number, type : ResourceType) : number{

        let total = this.buffers.quantities[type] + amount;

        if(total > Buffer.BUFFER_MAX) {
            this.buffers.quantities[type] = Buffer.BUFFER_MAX;
            return (total - Buffer.BUFFER_MAX);
        }else{
            this.buffers.quantities[type] = total;
            return 0;
        }

    }

    public Attack(target: Player){

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