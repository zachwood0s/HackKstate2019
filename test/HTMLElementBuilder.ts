import {expect} from 'chai';
import { HTMLElementBuilder } from '../typescript/shared/HTMLElementBuilder';
var jsdom = require("mocha-jsdom");

describe("HTMLElementBuilder", () => {

    jsdom();

    it("Allows for creation of a simple html element", () => {
        let elm = new HTMLElementBuilder("div").Build();
        expect(elm.tagName).to.equal("div");
    });

    it("Allows for creation of multiple simple html elements", () => {
        let div = new HTMLElementBuilder("div");
        let elm1 = div.Build();
        let elm2 = div.Build();
        expect(elm1.tagName).to.equal(elm2.tagName).to.equal("div");
    });
});