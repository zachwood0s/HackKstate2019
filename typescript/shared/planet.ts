//Test
class Planet{
    public name: string;

    constructor(n: string){
        this.name = n;
    }

    public toString(): string{
        return this.name+";";
    }
}

export{Planet};