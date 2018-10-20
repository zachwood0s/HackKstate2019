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
