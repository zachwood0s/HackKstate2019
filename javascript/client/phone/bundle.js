(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("../../shared/events");
var MenuClicks = __importStar(require("./menuOnclicks"));
var socket = io();
socket.on("connect", function () {
    console.log("Connected to server!");
    socket.emit(events_1.Events.PLAYER_JOINED);
});
socket.on(events_1.Events.SERVER_TICK, function (planets) {
});
socket.on(events_1.Events.OWNED_PLANET, function (planet) {
});
window.onload = function () {
    MenuClicks.setupClicks();
};

},{"../../shared/events":3,"./menuOnclicks":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setupClicks() {
    var setInputButton = document.getElementById("inputButton");
    var setOutputButton = document.getElementById("outputButton");
    var insOutsList = document.getElementById("insOutsList");
    var leftPosition = window.getComputedStyle(document.body).getPropertyValue('--selected-planet-bar-width');
    var listIsOpen = false;
    function toggleInOutList() {
        if (insOutsList != null) {
            if (!listIsOpen) {
                insOutsList.style.left = leftPosition;
                listIsOpen = true;
            }
            else {
                insOutsList.style.left = "0px";
                listIsOpen = false;
            }
        }
    }
    if (setInputButton)
        setInputButton.onclick = toggleInOutList;
    if (setOutputButton)
        setOutputButton.onclick = toggleInOutList;
}
exports.setupClicks = setupClicks;
;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events;
(function (Events) {
    Events["SELECTED_PLANET"] = "selected_planet";
    Events["SERVER_TICK"] = "server_tick";
    Events["OWNED_PLANET"] = "owned_planet";
    Events["SCREEN_PAIRED"] = "screen_paired";
    Events["PLAYER_JOINED"] = "player_joined";
    Events["LINK_CREATED"] = "link_created";
})(Events = exports.Events || (exports.Events = {}));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0eXBlc2NyaXB0L2NsaWVudC9waG9uZS9tYWluLnRzIiwidHlwZXNjcmlwdC9jbGllbnQvcGhvbmUvbWVudU9uY2xpY2tzLnRzIiwidHlwZXNjcmlwdC9zaGFyZWQvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUEsOENBQTJDO0FBRTNDLHlEQUE2QztBQUU3QyxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUVsQixNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtJQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxXQUFXLEVBQUUsVUFBQyxPQUFpQjtBQUVoRCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBTSxDQUFDLFlBQVksRUFBRSxVQUFDLE1BQWM7QUFFOUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxHQUFHO0lBQ1osVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzdCLENBQUMsQ0FBQTs7Ozs7QUNyQkQsU0FBZ0IsV0FBVztJQUN2QixJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVELElBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFFMUcsSUFBSSxVQUFVLEdBQUUsS0FBSyxDQUFDO0lBQ3RCLFNBQVMsZUFBZTtRQUNwQixJQUFHLFdBQVcsSUFBSSxJQUFJLEVBQUM7WUFDbkIsSUFBRyxDQUFDLFVBQVUsRUFBQztnQkFDWCxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7Z0JBQ3RDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDckI7aUJBQ0c7Z0JBQ0EsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3RCO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsSUFBRyxjQUFjO1FBQUUsY0FBYyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7SUFDNUQsSUFBRyxlQUFlO1FBQUUsZUFBZSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7QUFDbEUsQ0FBQztBQXJCRCxrQ0FxQkM7QUFBQSxDQUFDOzs7OztBQ3JCRixJQUFZLE1BT1g7QUFQRCxXQUFZLE1BQU07SUFDViw2Q0FBbUMsQ0FBQTtJQUNuQyxxQ0FBMkIsQ0FBQTtJQUMzQix1Q0FBNkIsQ0FBQTtJQUM3Qix5Q0FBK0IsQ0FBQTtJQUMvQix5Q0FBK0IsQ0FBQTtJQUMvQix1Q0FBNkIsQ0FBQTtBQUNyQyxDQUFDLEVBUFcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBT2pCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHtFdmVudHN9IGZyb20gJy4uLy4uL3NoYXJlZC9ldmVudHMnO1xuaW1wb3J0IHsgUGxhbmV0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL3BsYW5ldCc7XG5pbXBvcnQgKiBhcyBNZW51Q2xpY2tzIGZyb20gJy4vbWVudU9uY2xpY2tzJztcblxubGV0IHNvY2tldCA9IGlvKCk7XG5cbnNvY2tldC5vbihcImNvbm5lY3RcIiwgKCk9PntcbiAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBzZXJ2ZXIhXCIpO1xuXG4gICAgc29ja2V0LmVtaXQoRXZlbnRzLlBMQVlFUl9KT0lORUQpO1xufSlcblxuc29ja2V0Lm9uKEV2ZW50cy5TRVJWRVJfVElDSywgKHBsYW5ldHM6IFBsYW5ldFtdKT0+e1xuXG59KTtcblxuc29ja2V0Lm9uKEV2ZW50cy5PV05FRF9QTEFORVQsIChwbGFuZXQ6IFBsYW5ldCkgPT4ge1xuXG59KTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+e1xuICAgIE1lbnVDbGlja3Muc2V0dXBDbGlja3MoKTtcbn1cblxuIiwiXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBDbGlja3MoKXtcbiAgICBsZXQgc2V0SW5wdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0QnV0dG9uXCIpO1xuICAgIGxldCBzZXRPdXRwdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dEJ1dHRvblwiKTtcbiAgICBsZXQgaW5zT3V0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluc091dHNMaXN0XCIpO1xuICAgIGxldCBsZWZ0UG9zaXRpb24gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLXNlbGVjdGVkLXBsYW5ldC1iYXItd2lkdGgnKTtcbiAgICBcbiAgICBsZXQgbGlzdElzT3BlbiA9ZmFsc2U7XG4gICAgZnVuY3Rpb24gdG9nZ2xlSW5PdXRMaXN0KCl7XG4gICAgICAgIGlmKGluc091dHNMaXN0ICE9IG51bGwpe1xuICAgICAgICAgICAgaWYoIWxpc3RJc09wZW4pe1xuICAgICAgICAgICAgICAgIGluc091dHNMaXN0LnN0eWxlLmxlZnQgPSBsZWZ0UG9zaXRpb247XG4gICAgICAgICAgICAgICAgbGlzdElzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGluc091dHNMaXN0LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICAgICAgICAgIGxpc3RJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihzZXRJbnB1dEJ1dHRvbikgc2V0SW5wdXRCdXR0b24ub25jbGljayA9IHRvZ2dsZUluT3V0TGlzdDtcbiAgICBpZihzZXRPdXRwdXRCdXR0b24pIHNldE91dHB1dEJ1dHRvbi5vbmNsaWNrID0gdG9nZ2xlSW5PdXRMaXN0O1xufTsiLCJcbmV4cG9ydCBlbnVtIEV2ZW50cyB7XG4gICAgICAgIFNFTEVDVEVEX1BMQU5FVCA9IFwic2VsZWN0ZWRfcGxhbmV0XCIsXG4gICAgICAgIFNFUlZFUl9USUNLID0gXCJzZXJ2ZXJfdGlja1wiLFxuICAgICAgICBPV05FRF9QTEFORVQgPSBcIm93bmVkX3BsYW5ldFwiLFxuICAgICAgICBTQ1JFRU5fUEFJUkVEID0gXCJzY3JlZW5fcGFpcmVkXCIsXG4gICAgICAgIFBMQVlFUl9KT0lORUQgPSBcInBsYXllcl9qb2luZWRcIixcbiAgICAgICAgTElOS19DUkVBVEVEID0gXCJsaW5rX2NyZWF0ZWRcIixcbn1cblxuIl19
