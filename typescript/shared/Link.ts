import {ResourceType} from "./globals";

class Link{
    public from: string;
    public to: string;
    public rate: number;
    public type: ResourceType;

    constructor(fromIn: string, toIn: string, rateIn: number, typeIn: ResourceType){
        this.from   = fromIn;
        this.to     = toIn;
        this.rate   = rateIn;
        this.type   = typeIn;
    }

}

export{Link};