import { Planet } from "../../shared/Planet";
import {Buffer} from "../../shared/Planet";
export class UIUpdater{
    private _uiElements = {
        InputButton: document.getElementById("inputButton"),
        OutputButton: document.getElementById("outputButton"),
        InsOutsList: document.getElementById("insOutsList"),
        PlanetList: document.getElementById("planetList"),
        SelectedPlanet: document.getElementById("selectedPlanet")
    }

    private _planets: Planet[];

    constructor(){
        this._planets = [];
    }


    public SetupOnClicks(){
        let leftPosition = window.getComputedStyle(document.body).getPropertyValue('--selected-planet-bar-width');

        let listIsOpen =false;
        const toggleInOutList = ()=>{
            if(this._uiElements.InsOutsList){
                if(!listIsOpen){
                    this._uiElements.InsOutsList.style.left = leftPosition;
                    listIsOpen = true;
                }
                else{
                    this._uiElements.InsOutsList.style.left = "0px";
                    listIsOpen = false;
                }
            }
        }
        if(this._uiElements.InputButton) this._uiElements.InputButton.onclick = toggleInOutList;
        if(this._uiElements.OutputButton) this._uiElements.OutputButton.onclick = toggleInOutList;
    }

    public UpdatePlanets(planets: Planet[]){
        this._planets = planets;

        this._CreatePlanetList();
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

            unOwnedPlanets.appendChild(planetDiv);

            let UIUpdater = this;
            planetDiv.onclick = function(){
                UIUpdater.OpenSelectedPlanetsList((<any>this).planet);
            }
        }
    }

    public OpenSelectedPlanetsList(planet: Planet){
        console.log("Toggling selected with planet: ",planet)

        if(this._uiElements.SelectedPlanet && planet){
            this._uiElements.SelectedPlanet.innerHTML = "";
            this._uiElements.SelectedPlanet.innerHTML = this._CreateSelectedPlanetHTML(planet).innerHTML;
            this._uiElements.SelectedPlanet.style.left = "0px";
        }
    }

    public CloseSelectedPlanetsList(){
        if(this._uiElements.SelectedPlanet){
            this._uiElements.SelectedPlanet.style.left = "-400px";
        }
    }

    private _CreateSelectedPlanetHTML(planet: Planet): HTMLDivElement{
        let selectedPlanet = this._CreateDiv("selectedPlanet", "dark");

        //Icon stuff
        let mainIcon = this._CreateDiv(undefined, "mainIcon");
        let planetIcon = this._CreateDiv("tempPlanetIcon", "white");
        let planetName = this._CreateDiv("planetName", "colorWhite");
        planetName.innerHTML = planet.name;

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

        let outputButton = this._CreateDiv("outputButton", "button", "white", "colorDark");
        outputButton.innerHTML = "Outputs";

        inputOutputButtons.appendChild(inputButton);
        inputOutputButtons.appendChild(outputButton);
        
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
