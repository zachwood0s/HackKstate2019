import { Planet } from "../../shared/Planet";

export class UIUpdater{
    private _uiElements = {
        InputButton: document.getElementById("inputButton"),
        OutputButton: document.getElementById("outputButton"),
        InsOutsList: document.getElementById("insOutsList")
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

}