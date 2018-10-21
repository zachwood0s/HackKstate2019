import {Planet, Focus} from "../shared/Planet";
import {Buffer} from "../shared/Planet";
import {ResourceType} from "../shared/globals";
import {Player} from "../shared/Player";
import {Link} from "../shared/Link";

class PlanetServ extends Planet{

    public Update(){
        this.Produce(1);
        this.UpdateOutputs(1);   
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
    public Produce(dt : number){
        if(!this.owner || this.focus == Focus.Unfocused){
            this.focus = Focus.Unfocused;
            return;
        }
        let selected = this.buffers.quantities;

        if(this.focus == Focus.Labor){
            selected[this.focus]++;
        }else if(this.focus == Focus.Material){
            if(selected[ResourceType.Labor] >= 1){
                selected[ResourceType.Labor]--;
                selected[this.focus]++;
            }
        }else if(this.focus == Focus.Millitary){
            if(selected[ResourceType.Labor] >= 1 && selected[ResourceType.Material] >= 1){
                selected[ResourceType.Labor]--;
                selected[ResourceType.Material]--;
                selected[this.focus]++;
            }
        }else if(this.focus == Focus.Technology){
            if(selected[ResourceType.Labor] >= 1 && selected[ResourceType.Material] >= 1){
                selected[ResourceType.Labor]--;
                selected[ResourceType.Material]--;
                this.owner.TechnologyLevel++;
            }
        }
    }
    
    public UpdateOutputs(dt : number){
        for(let output of this.outputs){
            if(this.owner != null){
                let outQuantitySet = (output.rate*dt);
                let outQuantityMax : number;

                if(outQuantitySet > this.buffers.quantities[output.type]){
                    outQuantityMax = 0;
                }else{
                    outQuantityMax = outQuantitySet;
                }

                let amountUsed = outQuantityMax - (<PlanetServ>output.to).Receive(outQuantityMax, output.type, output.from);

                output.from.buffers.quantities[output.type] -= amountUsed;
                
                //Checks for stripped planet
                if(this.buffers.quantities[ResourceType.Millitary] < this.occupyingForce){
                    this.partialForceOwner = this.owner;
                    this.owner = null;
                }
            }
        }
    }

    public Receive(amount : number, type : ResourceType, from: Planet) : number{

        if(type == ResourceType.Millitary){
            return this.ReceiveMillitary(amount, type, from);
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
        return total - overage;
    }

    ReceiveMillitary(amount : number, type : ResourceType.Millitary, from: Planet) : number{

        if(from.owner == this.owner || this.partialForceOwner == from.owner){
            //Adding to a force
            let total = amount + this.buffers.quantities[ResourceType.Millitary];
            let overage: number;

            if(total > Buffer.BUFFER_MAX){
                this.buffers.quantities[ResourceType.Millitary] = Buffer.BUFFER_MAX;
                overage = total - Buffer.BUFFER_MAX;
            }else{
                this.buffers.quantities[ResourceType.Millitary] = total; 
                overage = 0;
            }

            //planet has been taken over
            if(!this.owner && this.buffers.quantities[ResourceType.Millitary] > this.occupyingForce){
                this.owner = this.partialForceOwner;
                this.partialForceOwner = null;
            }
            return overage;
        }else{

            //Actual attack
            let remainingMillitary = this.buffers.quantities[ResourceType.Millitary] - amount;

            if(remainingMillitary < 0){//Enemies gone from planet
                let winningMillitary = Math.abs(remainingMillitary)

                if(winningMillitary > this.occupyingForce){//Taken over
                    this.owner = from.owner;
                    this.partialForceOwner = null;
                }else{//added partial force, but not owned yet
                    this.partialForceOwner = from.owner;
                    this.owner = null;
                }
                
                if(winningMillitary > Buffer.BUFFER_MAX){
                    this.buffers.quantities[ResourceType.Millitary] = Buffer.BUFFER_MAX;
                    return remainingMillitary - Buffer.BUFFER_MAX;
                }else{
                    this.buffers.quantities[ResourceType.Millitary] = winningMillitary;
                    return 0;
                }
                
            }else{//Attack but surives
                this.buffers.quantities[ResourceType.Millitary] = remainingMillitary;

                if(remainingMillitary < this.occupyingForce){
                    this.partialForceOwner = this.owner;
                    this.owner = null;
                }

                return 0;
            }
        }
    }
}

export{PlanetServ};