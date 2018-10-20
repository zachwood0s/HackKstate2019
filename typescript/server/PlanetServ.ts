import {Planet} from "../shared/Planet";
import {Buffer} from "../shared/Planet";
import {ResourceType} from "../shared/globals";

class PlanetServ extends Planet{

    public Update(){

    }

    public UpdateOutputs(dt : number){
        for(let output of this.outputs){
            let outQuantity = (output.rate*dt);
            if(outQuantity > this.buffers.quantities[output.type]){
                (<PlanetServ>output.to).Receive(this.buffers.quantities[output.type], output.type);
                this.buffers.quantities[output.type] = 0;
            }else{
                (<PlanetServ>output.to).Receive(outQuantity, output.type);
                this.buffers.quantities[output.type] -= outQuantity;
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

<<<<<<< HEAD
        return 0;
=======
>>>>>>> 37d17ca2904b1a898e74d6d74ba41e3b53b1f7dc
    }

    public CalculateConflict(){

    }

    public Attack(){

    }

}

export{PlanetServ};