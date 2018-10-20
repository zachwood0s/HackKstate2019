
export function setupClicks(){
    let setInputButton = document.getElementById("inputButton");
    let setOutputButton = document.getElementById("outputButton");
    let insOutsList = document.getElementById("insOutsList");
    let leftPosition = window.getComputedStyle(document.body).getPropertyValue('--selected-planet-bar-width');
    
    let listIsOpen =false;
    function toggleInOutList(){
        if(insOutsList != null){
            if(!listIsOpen){
                insOutsList.style.left = leftPosition;
                listIsOpen = true;
            }
            else{
                insOutsList.style.left = "0px";
                listIsOpen = false;
            }
        }
    }
    if(setInputButton) setInputButton.onclick = toggleInOutList;
    if(setOutputButton) setOutputButton.onclick = toggleInOutList;
};