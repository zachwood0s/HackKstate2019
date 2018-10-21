import {PlanetServ} from './PlanetServ';
import { Link } from '../shared/Link';
import { ResourceType } from '../shared/globals';
import {Planet, Focus} from '../shared/Planet';
import { Player } from '../shared/Player';
import { Events } from '../shared/events';
import { GeneratePlanets } from './GeneratePlanets';

export class Game{
    planets : Array<PlanetServ> = new Array<PlanetServ>();
    players: Array<Player> = [];


    private playerCount: number = 0;
    private nextId: number = 0;
    private pairedScreen?: SocketIO.Socket;
    private updateInterval: any;
    private broadcastInterval: any;
    private io: SocketIO.Server;
    private avalibleIds : Array<number> = [0, 1, 2, 3];
    private nextLinkId = 0;

    
    public constructor(planetCount : number, io: SocketIO.Server){
        this.io = io;
    }

    public AddPlayer(): Player{
        let newPlayer = new Player(this.nextId);
        this.playerCount++;
        this.nextId++;
        this.planets[this.playerCount].owner = newPlayer;
        this.planets[this.playerCount].buffers.quantities[ResourceType.Millitary] = 30;
        console.log("Number of players:", this.playerCount);
        return newPlayer;
    }

    public RemovePlayer(player: Player){
        var i = this.players.length;
        while (i--) {
            if (this.players[i].id == player.id) {
                this.players.splice(i, 1);
            }
        }
        this.playerCount--;
    }

    public PairScreen(socket: SocketIO.Socket){
        this.pairedScreen = socket;
    }

    public SelectPlanet(name: string, player: Player){
        for(let planet of this.planets){
            if(planet.name == name){
                if(!this.ArrayHas(planet.hovered, (elm: Player) => player.id == elm.id)){
                    planet.hovered.push(player)
                    console.log("Added player to hovered:", player.id);
                }
                else{
                    console.log("Player already had planet selected");
                }
            }
            else{
                for(let i = planet.hovered.length - 1; i >= 0; i--){
                    if(planet.hovered[i].id == player.id){
                        planet.hovered.splice(i,1);
                        console.log("Player removed from hoverd:", player.id);
                    }
                }
            }
        }
    }

    public ArrayFind<T>(array: T[], callback: (a1: T)=>boolean) : T | null{
        for(let elm of array){
            if(callback(elm)){
                return elm;
            }
        }
        return null;
    }
    public ArrayIndex<T>(array: T[], callback: (a1: T)=>boolean) : number | null{
        for(let i = 0; i < array.length; i++){
            if(callback(array[i])){
                return i;
            }
        }
        return null;
    }
    public ArrayHas<T>(array: T[], callback: (a1: T)=>boolean){
        for(let elm of array){
            if(callback(elm)){
                return true;
            }
        }
        return false;
    }
    
    //////////////////////////////////////////

    public update(){
       
        for(let planet of this.planets){
            planet.Update();
        }
    }

    private GenPlanets(){
        this.planets = GeneratePlanets(32, 1600, 775)
    }
    public broadcastInfo(){
        this.io.sockets.emit(Events.SERVER_TICK, this.planets);
    }
    public StartGame(){
        this.GenPlanets();
        this.updateInterval = setInterval(this.update.bind(this), 100);
        this.broadcastInterval = setInterval(this.broadcastInfo.bind(this), 200);
    }

    public EndGame(){
        clearInterval(this.updateInterval);
        clearInterval(this.broadcastInterval);
    }

    public createLink(link:Link) : Link | null{
        let toPlanet = this.ArrayFind(this.planets, (elm: Planet) => link.to.name == elm.name);
        let fromPlanet = this.ArrayFind(this.planets, (elm: Planet) => link.from.name == elm.name);

        if(toPlanet && fromPlanet){
            let newlink = new Link(fromPlanet, toPlanet, link.rate, link.type, this.nextLinkId);
            fromPlanet.outputs.push(newlink);
            toPlanet.inputs.push(newlink);
            let nonCircleLink = new Link(new Planet(fromPlanet.name, fromPlanet.carryingCapacity, fromPlanet.reasourceDensity), toPlanet, link.rate, link.type, this.nextLinkId);
            this.nextLinkId++;
            return nonCircleLink;
        }
        return null;
    }

    public deleteLink(link:Link){
        let toPlanet = this.ArrayFind(this.planets, (elm: Planet) => link.to.name == elm.name);
        let fromPlanet = this.ArrayFind(this.planets, (elm: Planet) => link.from.name == elm.name);
        if(toPlanet && fromPlanet){
            let indexFrom = this.ArrayIndex(fromPlanet.outputs, (elm: Link) => link.id == elm.id)
            if(indexFrom) fromPlanet.outputs.slice(indexFrom, 1);
            let indexTo = this.ArrayIndex(toPlanet.inputs, (elm: Link) => link.id == elm.id)
            if(indexTo) fromPlanet.outputs.slice(indexTo, 1);
        }
    }

    public createPlayer() : Player | null{

        let id = this.avalibleIds.pop();
        if(id){
            let newPlayer = new Player(id);
            return newPlayer;
        }
        return null;
    }

    
    public setFocus(planet: Planet, focus: Focus){
        let realPlanet = this.ArrayFind(this.planets, (elm: Planet) => planet.name == elm.name);
        if(realPlanet && realPlanet.owner){
            realPlanet.focus = focus;
        }
    }


    //////////////////////////////////////////

}

class Test{
    static testTransfer(){
        let testPlanet3 = new Planet("TestPlanetName", 1, 1);
        let testPlanet2 = new PlanetServ("TestPlanetName2", 1, 1);
        let testPlanet = PlanetServ.DownCast(testPlanet3);

        //testPlanet.Receive(10, ResourceType.Labor);
        testPlanet.outputs.push(new Link(testPlanet, testPlanet2, 1, ResourceType.Labor, 1));
        testPlanet.UpdateOutputs(1);

        console.log(testPlanet.buffers.quantities[ResourceType.Labor]);
        console.log(testPlanet2.buffers.quantities[ResourceType.Labor]);
    }

    static testAttack(){
        let testPlanet = new PlanetServ("TestPlanetName", 1, 1);
        testPlanet.owner = new Player(1);
        let testPlanet2 = new PlanetServ("TestPlanetName2", 1, 1);
        testPlanet2.owner = new Player(2);

        testPlanet.buffers.quantities[ResourceType.Millitary] = 15;
        testPlanet2.buffers.quantities[ResourceType.Millitary] = 50;

        testPlanet.outputs.push(new Link(testPlanet, testPlanet2, 5, ResourceType.Millitary, 1));
  
        for(var i = 0; i < 10; i++ ){
            testPlanet.UpdateOutputs(1);
        }
        
        console.log(testPlanet.buffers.quantities[ResourceType.Millitary]);
        console.log("P1 part ", testPlanet.owner);
        console.log("P1 part ", testPlanet.partialForceOwner);
        if(testPlanet.partialForceOwner){
            console.log(testPlanet.partialForceOwner.id);
        }
        
        console.log(testPlanet2.buffers.quantities[ResourceType.Millitary]);
        console.log("P2 part ", testPlanet2.owner);
        console.log("P2 part ", testPlanet2.partialForceOwner);
        if(testPlanet2.partialForceOwner){
            console.log(testPlanet2.partialForceOwner.id);
        }
        
    }

    static testProduce(){
        let testPlanet = new PlanetServ("TestPlanetName", 1, 1);
        testPlanet.owner = new Player(1);

        for(var i = 0; i < 50; i++ ){
            testPlanet.focus = Focus.Labor;
            testPlanet.Update();
        }
        for(var i = 0; i < 10; i++ ){
            testPlanet.focus = Focus.Material;
            testPlanet.Update();
        }
        for(var i = 0; i < 1; i++ ){
            testPlanet.focus = Focus.Millitary;
            testPlanet.Update();
        }
        for(var i = 0; i < 100; i++ ){
            testPlanet.focus = Focus.Technology;
            testPlanet.Update();
        }

        for(var i = 0; i < 3; i++){
            console.log(testPlanet.buffers.quantities[i]);
        }
        console.log(testPlanet.owner.TechnologyLevel);

    }

}

Test.testProduce();