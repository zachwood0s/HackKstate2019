import {PlanetServ} from './PlanetServ';
import { Link } from '../shared/Link';
import { ResourceType } from '../shared/globals';
import {Planet} from '../shared/Planet';
import { Player } from '../shared/Player';
class Game{
    planets : Array<PlanetServ> = new Array<PlanetServ>();

    public constructor(playerCount: number, planetCount : number){

    }

    public update(){
        for(let planet of this.planets){
            planet.Update();
        }
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
        console.log(testPlanet2.partialForceOwner.ID!);
    }

}

Test.testAttack();