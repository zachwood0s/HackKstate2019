import {Planet} from "../shared/planet";
import {Buffer} from "../shared/planet";
import {ResourceType} from "../shared/globals";

class PlanetServ extends Planet{

    public Update(){

    }
    public UpdateReasources(dt : number){
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

    }

    public CalculateConflict(){

    }

    public Attack(){

    }

}