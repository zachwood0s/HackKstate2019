import {Planet} from "../shared/Planet";
import {Buffer} from "../shared/Planet";
import {ResourceType} from "../shared/globals";
import {Player} from "../shared/Player";
import {Link} from "../shared/Link";

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

            let amountUsed = outQuantityMax - (<PlanetServ>output.to).Receive(outQuantityMax, output.type, output.from);

            output.from.buffers.quantities[output.type] -= amountUsed;
        }
    }

    public Receive(amount : number, type : ResourceType, from: Planet) : number{
        if(type == ResourceType.Millitary){
            this.ReceiveMillitary(amount, type, from);
        }

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

    ReceiveMillitary(amount : number, type : ResourceType.Millitary, from: Planet) : number{

        if(from.owner == this.owner || this.partialForceOwner == from.owner){
            //Adding to partial force
            let total = amount + this.buffers.quantities[ResourceType.Millitary];

            if(total > Buffer.BUFFER_MAX){
                this.buffers.quantities[ResourceType.Millitary] = Buffer.BUFFER_MAX;
                return total - Buffer.BUFFER_MAX;
            }else{
                this.buffers.quantities[ResourceType.Millitary] += amount; 
                return 0;
            }

            //check for stripped planet
            if(from.buffers.quantities[ResourceType.Millitary] < from.occupyingForce){
                from.owner = null;
                from.partialForceOwner = from.owner;
            }
        }else{
            //Actual attack
            let remainingMillitary = this.buffers.quantities[ResourceType.Millitary] - amount;

            if(remainingMillitary < 0){
                let winningMillitary = Math.abs(remainingMillitary)

                if(winningMillitary > this.occupyingForce){
                    this.owner = from.owner;
                    this.partialForceOwner = null;
                }else{
                    this.owner = null;
                    this.partialForceOwner = from.owner;
                }
                
                if(winningMillitary > Buffer.BUFFER_MAX){
                    this.buffers.quantities[ResourceType.Millitary] = Buffer.BUFFER_MAX;
                    return remainingMillitary - Buffer.BUFFER_MAX;
                }else{
                    this.buffers.quantities[ResourceType.Millitary] = winningMillitary;
                    return 0;
                }
                
            }else{
                let survivingMillitary = remainingMillitary;

                if(survivingMillitary > Buffer.BUFFER_MAX){
                    this.buffers.quantities[ResourceType.Millitary] = Buffer.BUFFER_MAX;
                    return survivingMillitary - Buffer.BUFFER_MAX;
                }else{
                    this.buffers.quantities[ResourceType.Millitary] = survivingMillitary;
                    return 0;
                }
            }
        }
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