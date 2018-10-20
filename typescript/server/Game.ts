import {PlanetServ} from './PlanetServ';
import { Link } from '../shared/link';
import { ResourceType } from '../shared/globals';
import {Planet} from '../shared/Planet';
class Game{
    public update(){

    }
}

let testPlanet3 = new Planet("TestPlanetName", 1, 1);
let testPlanet2 = new PlanetServ("TestPlanetName2", 1, 1);
let testPlanet =
testPlanet.Receive(10, ResourceType.Labor);
testPlanet.outputs.push(new Link(testPlanet, testPlanet2, 1, ResourceType.Labor));
testPlanet.UpdateOutputs(1);

console.log(testPlanet.buffers.quantities[ResourceType.Labor]);
console.log(testPlanet2.buffers.quantities[ResourceType.Labor]);

