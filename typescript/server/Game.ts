import {PlanetServ} from './PlanetServ';
import { Link } from '../shared/Link';
import { ResourceType } from '../shared/globals';
import {Planet} from '../shared/Planet';
import { Player } from '../shared/Player';
import { Events } from '../shared/events';
export class Game{
    planets : Array<PlanetServ> = new Array<PlanetServ>();
    players: Array<Player> = [];

    private playerCount: number = 0;
    private nextId: number = 0;
    private pairedScreen?: SocketIO.Socket;
    private updateInterval: any;
    private io: SocketIO.Server;

    public constructor(planetCount : number, io: SocketIO.Server){
        this.io = io;
    }

    public AddPlayer(): Player{
        let newPlayer = new Player(this.nextId);
        this.playerCount++;
        this.nextId++;
        console.log("Number of players:", this.playerCount);
        return newPlayer;
    }

    public RemovePlayer(player: Player){
        var i = this.players.length;
        while (i--) {
            if (this.players[i].ID == player.ID) {
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
                if(!this.arrayHas(planet.hovered, (elm: Player) => player.ID == elm.ID)){
                    planet.hovered.push(player)
                    console.log("Added player to hovered:", player.ID);
                }
                else{
                    console.log("Player already had planet selected");
                }
                break;
            }
        }
    }

    public arrayHas<T>(array: T[], callback: (a1: T)=>boolean){
        for(let elm of array){
            if(callback(elm)){
                return true;
            }
        }
        return false;
    }
    


    public update(){
        this.io.sockets.emit(Events.SERVER_TICK, this.planets);
        for(let planet of this.planets){
            planet.Update();
        }
    }

    public StartGame(){
        this.planets.push(new PlanetServ("earth", 0, 0), new PlanetServ("mars", 0, 0)) 
        this.updateInterval = setInterval(this.update.bind(this), 1000);
    }

    public EndGame(){
        clearInterval(this.updateInterval);
    }
}

class Test{
    static testTransfer(){
        let testPlanet3 = new Planet("TestPlanetName", 1, 1);
        let testPlanet2 = new PlanetServ("TestPlanetName2", 1, 1);
        let testPlanet = PlanetServ.DownCast(testPlanet3);

        testPlanet.Receive(10, ResourceType.Labor);
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

        testPlanet.buffers.quantities[ResourceType.Millitary] = 8;
        testPlanet2.buffers.quantities[ResourceType.Millitary] = 50;

        testPlanet.outputs.push(new Link(testPlanet, testPlanet2, 1, ResourceType.Millitary, 1));
        testPlanet.UpdateOutputs(1);

        console.log(testPlanet.buffers.quantities[ResourceType.Millitary]);
        console.log(testPlanet2.buffers.quantities[ResourceType.Millitary]);
        console.log(testPlanet2.owner.ID);
        //console.log(testPlanet2.partialForceOwner.ID!);
    }

}

Test.testAttack();