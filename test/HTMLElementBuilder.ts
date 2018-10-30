import {expect} from 'chai';
import { HTMLElementBuilder } from '../typescript/shared/HTMLElementBuilder';
var jsdom = require("mocha-jsdom");

describe("HTMLElementBuilder", () => {

    jsdom();

    it("Allows for creation of a simple html element", () => {
        let elm = new HTMLElementBuilder("div").Build();
        expect(elm.tagName).to.equal("DIV");
    });

    it("Allows for creation of multiple simple html elements", () => {
        let div = new HTMLElementBuilder("div");
        let elm1 = div.Build();
        let elm2 = div.Build();
        expect(elm1.tagName).to.equal(elm2.tagName).to.equal("DIV");
    });

    it("Allows for classes to be added", () => {
        let elm = new HTMLElementBuilder("div").WithClasses("testClass", "class2").Build();
        expect(elm.classList.length).to.equal(2);
        expect(elm.classList).to.contain("testClass");
        expect(elm.classList).to.contain("class2");
    });
});