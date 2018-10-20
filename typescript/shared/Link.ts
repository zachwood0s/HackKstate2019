import {ResourceType} from "./globals";
import {Planet} from "./Planet";

class Link{
    public from: Planet;
    public to: Planet;
    public rate: number;
    public type: ResourceType;

    constructor(fromIn: Planet, toIn: Planet, rateIn: number, typeIn: ResourceType){
        this.from   = fromIn;
        this.to     = toIn;
        this.rate   = rateIn;
        this.type   = typeIn;
    }

}

export{Link};