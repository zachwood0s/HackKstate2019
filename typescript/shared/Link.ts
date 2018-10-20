import {ResourceType} from "./globals";
import {Planet} from "./planet";

class Link{
    public readonly from: Planet;
    public readonly to: Planet;
    public readonly rate: number;
    public readonly type: ResourceType;
    public readonly id: number;

    constructor(fromIn: Planet, toIn: Planet, rateIn: number, typeIn: ResourceType, idIn: number){
        this.from   = fromIn;
        this.to     = toIn;
        this.rate   = rateIn;
        this.type   = typeIn;
        this.id     = idIn;
    }

}

export{Link};