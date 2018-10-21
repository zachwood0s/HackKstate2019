import { Planet, Focus } from "../../shared/Planet";
import {Buffer} from "../../shared/Planet";
import { Events } from "../../shared/events";
import { Player } from "../../shared/Player";
import { Link } from "../../shared/Link";
import { ResourceType } from "../../shared/globals";
import {parse, stringify} from 'flatted';
export class UIUpdater{
    private _uiElements = {
        InsOutsList: document.getElementById("insOutsList"),
        PlanetList: document.getElementById("planetList"),
        SelectedPlanet: document.getElementById("selectedPlanet"),
        SetFocusButton: document.getElementById("setFocusButton"),
        SetFocusDrawer: document.getElementById("setFocusDrawer")
    }

    private _planets: Planet[];
    public _socket: SocketIOClient.Socket;
    private _player: Player;
    private _planetListDivs: HTMLElement[];
    private _selectedPlanet: Planet | null;
    public _handlers : Array<Function>;

    constructor(socket: SocketIOClient.Socket, player: Player){
        this._planets = [];
        this._socket = socket;
        this._player = player;
        this._planetListDivs = [];
        this._selectedPlanet = null;
        this._handlers = [];

        this._socket.on(Events.LINK_ID, (linkText: string) => {
            let link: Link = parse(linkText) as Link;
            for(let fn of this._handlers){
                fn(link);
            }
        });
    }

    private _ToggleInOutList(planet: Planet, input: boolean){
        return () => {
            if(this._uiElements.InsOutsList){
                if(this._uiElements.InsOutsList.classList.contains("open")){
                    this._CloseInOutList();
                }
                else{
                    this._OpenInOutList(planet, input);
                }
            }
        }
    }

    private _OpenInOutList(planet: Planet, input: boolean){
        console.log("Opening ins-outs list for planet: ",planet);
        if(this._uiElements.InsOutsList){
            this._uiElements.InsOutsList.classList.add("open");
            this._CreateInsOutsList(planet, input);
        }
    }

    private _CloseInOutList(){
        if(this._uiElements.InsOutsList){
            this._uiElements.InsOutsList.classList.remove("open");
        }
    }

    private _ToggleSetFocusList(planet: Planet){
        return () => {
            if(this._uiElements.SetFocusDrawer){
                if(this._uiElements.SetFocusDrawer.classList.contains("open")){
                    this._CloseSetFocusList();
                }
                else{
                    this._OpenSetFocusList(planet);
                }
            }
        }
    }

    private _OpenSetFocusList(planet: Planet){
        if(this._uiElements.SetFocusDrawer){
            this._uiElements.SetFocusDrawer.classList.add("open");

            for(let i = 0; i<this._uiElements.SetFocusDrawer.children.length; i++){
                let elm = this._uiElements.SetFocusDrawer.children[i] as HTMLElement;
                let index = parseInt(elm.getAttribute("data-type")!);

                elm.onclick = () => {
                    for(let i = 0; i<this._uiElements.SetFocusDrawer!.children.length; i++){
                        let elm = this._uiElements.SetFocusDrawer!.children[i] as HTMLElement;
                        elm.classList.remove("selected");
                    }
                    this._socket.emit(Events.FOCUS_SET, index, stringify(planet));
                    elm.classList.add("selected");
                } 
            }
        } 
    }

    private _CloseSetFocusList(){
        if(this._uiElements.SetFocusDrawer){
            this._uiElements.SetFocusDrawer.classList.remove("open");
        }
    }

    public UpdatePlanets(planets: Planet[]){
        this._planets = planets;

        if(this._planetListDivs.length == 0){
            this._CreatePlanetList();
        }
        else{
            for(let i = 0; i<planets.length; i++){
                (<any>this._planetListDivs[i]).planet = planets[i];
            }
            //Check if selected is displayed and if so update its info
            //Check if owned planets has changed and if so move the divs around
        }
    }

    private _CreatePlanetList(){
        let ownedPlanets = this._CreateDiv("ownedPlanets", "planetList");        
        let oSectionHeader = this._CreateDiv(undefined, "sectionHeader", "colorWhite", "darkish");
        oSectionHeader.innerHTML = "Owned";

        let unOwnedPlanets = this._CreateDiv("notOwnedPlanets", "planetList");         
        let uoSectionHeader = this._CreateDiv(undefined, "sectionHeader", "colorWhite", "darkish")
        uoSectionHeader.innerHTML = "Null Space"

        unOwnedPlanets.appendChild(uoSectionHeader);
        ownedPlanets.appendChild(oSectionHeader);

        if(this._uiElements.PlanetList){
            this._uiElements.PlanetList.innerHTML = "";
            this._uiElements.PlanetList.appendChild(ownedPlanets);
            this._uiElements.PlanetList.appendChild(unOwnedPlanets);
        }

        for(let planet of this._planets){
            let planetDiv = this._CreateDiv(undefined, "planet");
            (<any>planetDiv).planet = planet;

            let planetIcon = this._CreateDiv(undefined, "planetIcon");
            let planetName = this._CreateDiv(undefined, "planetName", "colorWhite");
            planetName.innerHTML = planet.name;

            planetDiv.appendChild(planetIcon);
            planetDiv.appendChild(planetName);

            if(planet.owner && planet.owner.id == this._player.id){
                ownedPlanets.appendChild(planetDiv);
            }
            else{
                unOwnedPlanets.appendChild(planetDiv);
            }
            this._planetListDivs.push(planetDiv);

            let UIUpdater = this;
            planetDiv.onclick = function(){
                UIUpdater.OpenSelectedPlanetsList((<any>this).planet);
            }
        }
    }

    private _CreateInsOutsList(selPlanet: Planet, importing: boolean){
        if(!this._selectedPlanet) return;
        if(!this._uiElements.InsOutsList) return;
        this._uiElements.InsOutsList.innerHTML = "";

        for(let planet of this._planets){
            if(planet.name == this._selectedPlanet.name) continue;
            if(importing && (!planet.owner || planet.owner.id != this._player.id)) continue;

            let planetDiv = this._CreateDiv(undefined, "planet");
            //let planetIcon = this._CreateDiv(undefined, "planetIcon"); 
            let planetName = this._CreateDiv(undefined, "planetName", "colorWhite");
            planetName.innerHTML = planet.name;

            let setMatButton = this._CreateDiv(undefined, "setButton", "dark", "icon-cogs", "colorWhite");
            setMatButton.onclick = () => setButtonClick(this,ResourceType.Material, setMatButton, importing, planet, selPlanet);
            let setMiltButton = this._CreateDiv(undefined, "setButton", "dark", "icon-shield", "colorWhite");
            setMiltButton.onclick = () => setButtonClick(this,ResourceType.Millitary, setMiltButton, importing, planet, selPlanet);
            let setLabButton = this._CreateDiv(undefined, "setButton", "dark", "icon-user", "colorWhite");
            setLabButton.onclick = () => setButtonClick(this,ResourceType.Labor, setLabButton, importing, planet, selPlanet);
            /*
            setMatButton.onclick = () => {
                let link: Link;
                if(importing) link = new Link(planet, selPlanet, 10, ResourceType.Labor, 0);
                else link = new Link(selPlanet, planet, 10, ResourceType.Labor, 0);
                this._socket.emit(Events.LINK_CREATED, stringify(link));
            }
            */

            //planetDiv.appendChild(planetIcon);
            planetDiv.appendChild(planetName);
            planetDiv.appendChild(setMatButton);
            planetDiv.appendChild(setMiltButton);
            planetDiv.appendChild(setLabButton);

            this._uiElements.InsOutsList.appendChild(planetDiv);
        }
    }

    public OpenSelectedPlanetsList(planet: Planet){
        console.log("Toggling selected with planet: ",planet)

        if(this._uiElements.SelectedPlanet && planet){
            this._uiElements.SelectedPlanet.innerHTML = "";
            this._CreateSelectedPlanetHTML(this._uiElements.SelectedPlanet, planet).innerHTML;
            this._uiElements.SelectedPlanet.classList.add("open");
            this._selectedPlanet = planet;
            console.log(document.getElementById("outputButton"));
        }

        if(planet.owner && planet.owner.id == this._player.id && this._uiElements.SetFocusButton){
            this._uiElements.SetFocusButton.classList.add("shown");
            this._uiElements.SetFocusButton.onclick = this._ToggleSetFocusList(planet);
        }

        console.log("Sendeng selected planet:",planet.name);
        this._socket.emit(Events.SELECTED_PLANET, planet.name);
    }

    public CloseSelectedPlanetsList(){
        if(this._uiElements.SelectedPlanet){
            this._selectedPlanet = null;
            this._uiElements.SelectedPlanet.classList.remove("open");
            this._CloseInOutList();
        }
        if(this._uiElements.SetFocusButton){
            this._uiElements.SetFocusButton.classList.remove("shown");
        }
        this._CloseSetFocusList();
    }

    private _CreateSelectedPlanetHTML(selectedPlanet: HTMLElement, planet: Planet): HTMLElement{
        //Icon stuff
        let mainIcon = this._CreateDiv(undefined, "mainIcon");
        let planetIcon = this._CreateDiv("tempPlanetIcon", "white");
        let planetName = this._CreateDiv("planetName", "colorWhite");
        planetName.innerHTML = planet.name;
        planetName.onclick = function(){
            console.log("stupd");
        }

        let iconStats = this._CreateDiv("iconStats");
        let createStat = (id: string, iconName: string, value: number, direction: number): HTMLElement => {
            let stat = this._CreateDiv(id, "iconStat");
            if(direction > 0) stat.classList.add("importing");
            else if(direction < 0) stat.classList.add("exporting");

            let icon = document.createElement("span");
            icon.classList.add(iconName);
            let iconValue = document.createElement("span");
            iconValue.classList.add("value");
            iconValue.innerHTML = value.toString();

            stat.appendChild(icon);
            stat.appendChild(iconValue);
            return stat;
        }
        let techStat = createStat("techStat", "icon-lab", 10, 1);
        let miltStat = createStat("techStat", "icon-shield", 10, -1);
        let matStat = createStat("techStat", "icon-cogs", 10, 1);
        let laborStat = createStat("techStat", "icon-user", 10, -1);

        iconStats.appendChild(techStat);
        iconStats.appendChild(miltStat);
        iconStats.appendChild(matStat);
        iconStats.appendChild(laborStat);

        mainIcon.appendChild(planetIcon);
        mainIcon.appendChild(planetName);
        mainIcon.appendChild(iconStats);

        let hr = document.createElement("hr");
        hr.classList.add("white");

        // Stat Bars
        let mineral = this._CreateDiv("stat1", "stat");
        let mineralName= this._CreateDiv(undefined, "name", "colorWhite", "roboto");
        mineralName.innerHTML = "Mineral Density";
        let mineralBar =this._CreateDiv(undefined, "bar");
        let mineralPerc = (planet.reasourceDensity/Buffer.BUFFER_MAX) * 100;
        mineralBar.setAttribute("style", "--bar-width:"+mineralPerc+"%");

        mineral.appendChild(mineralName);
        mineral.appendChild(mineralBar);

        let capacity = this._CreateDiv("stat2", "stat");
        let capacityName= this._CreateDiv(undefined, "name", "colorWhite", "roboto");
        capacityName.innerHTML = "Carrying Capacity";
        let capacityBar =this._CreateDiv(undefined, "bar");
        let capactiyPerc = (planet.carryingCapacity/Buffer.BUFFER_MAX) * 100;
        capacityBar.setAttribute("style", "--bar-width:"+capactiyPerc+"%");

        capacity.appendChild(capacityName);
        capacity.appendChild(capacityBar);

        //Input/Output buttons
        let inputOutputButtons = this._CreateDiv("inOutButtons");
        let inputButton = this._CreateDiv("inputButton", "button", "white", "colorDark");
        inputButton.innerHTML = "Inputs";
        inputButton.onclick = this._ToggleInOutList(planet, true);
        inputOutputButtons.appendChild(inputButton);

        if(planet.owner && planet.owner.id == this._player.id){
            let outputButton = this._CreateDiv("outputButton", "button", "white", "colorDark");
            outputButton.innerHTML = "Outputs";
            outputButton.onclick = this._ToggleInOutList(planet, false);
            inputOutputButtons.appendChild(outputButton);
        }
        
        selectedPlanet.appendChild(mainIcon);
        selectedPlanet.appendChild(hr);
        selectedPlanet.appendChild(mineral);
        selectedPlanet.appendChild(capacity);
        selectedPlanet.appendChild(inputOutputButtons);


        return selectedPlanet;
    }

    private _CreateDiv(id = "", ...classes: string[]):HTMLDivElement{
        let elm = document.createElement('div');
        if(id != "") elm.id = id;
        elm.classList.add(...classes);
        return elm;
    }
}

function setButtonClick(obj: UIUpdater, type: ResourceType, elm: HTMLElement, importing: boolean, planet: Planet, selPlanet: Planet){
    
    if(!(<any>elm).createdLink){
        let link: Link;
        if(importing) link = new Link(planet, selPlanet, 1, type, 0);
        else link = new Link(selPlanet, planet, 1, type, 0);
        obj._socket.emit(Events.LINK_CREATED, stringify(link));
        elm.classList.add("selected");
        obj._handlers.push((link: Link)=>{
            (<any>elm).createdLink = link;
        })
    }
    else{
        console.log("Removed link", (<any>elm).createdLink);
        obj._socket.emit(Events.LINK_DELETED, stringify((<any>elm).createdLink));
        (<any>elm).createdLink = null;
        elm.classList.remove("selected");
    }
}