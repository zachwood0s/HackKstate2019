import {Planet} from "../shared/Planet";
import {Buffer} from "../shared/Planet";
import {ResourceType} from "../shared/globals";

class PlanetServ extends Planet{

    public Update(){

    }
    public UpdateReasources(dt : number){
        
        let netLabor : number = 0;
        let netMaterials : number = 0;
        let netMillitary : number = 0;

        let Link , input, output;

        for(output of this.inputs){
            switch(output.type){
                case  ResourceType.Labor:{
                    netLabor        -= output.rate;
                    break;
                }
                case ResourceType.Material:{
                    netMaterials    -= output.rate;
                    break;
                }
                case ResourceType.Millitary:{
                    netMillitary    -= output.rate;
                    break;
                }
            }
        }




    }

    public Receive(amount : number, type : ResourceType) : number{

        switch(type){
            case  ResourceType.Labor:{
                this.buffers.laborQuantity[1] += amount;
                let overage = this.buffers.laborQuantity[1] - Buffer.BUFFER_MAX;

                if(overage > 0 ) {
                    this.buffers.laborQuantity[1] -= overage;
                    return overage;
                }
                return 0;

                break;
            }
            case ResourceType.Material:{
                this.buffers.laborQuantity[1] += amount;
                let overage = this.buffers.laborQuantity[1] - Buffer.BUFFER_MAX;

                if(overage > 0 ) {
                    this.buffers.laborQuantity[1] -= overage;
                    return overage;
                }
                return 0;

                break;
            }
            case ResourceType.Millitary:{
                this.buffers.laborQuantity[1] += amount;
                let overage = this.buffers.laborQuantity[1] - Buffer.BUFFER_MAX;

                if(overage > 0 ) {
                    this.buffers.laborQuantity[1] -= overage;
                    return overage;
                }
                return 0;

                break;
            }
        }
        

        return 0;
    }
    public CalculateConflict(){

    }

    public Attack(){

    }

}