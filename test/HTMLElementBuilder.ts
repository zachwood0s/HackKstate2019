import {expect} from 'chai';
import { HTMLElementBuilder } from '../typescript/shared/HTMLElementBuilder';

var jsdom = require("mocha-jsdom");
var chai = require("chai");
chai.use(require("chai-dom"));

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
        expect(elm).to.have.class("testClass");
        expect(elm).to.have.class("class2");
    });

    it("Allows for innerHTML to be added", () => {
        let text = "test text";
        let elm = new HTMLElementBuilder("div").WithInnerHTML(text).Build();
        expect(elm).to.have.html(text);
    });

    it("Allows for ids to be added", () => {
        let id = "testID";
        let elm = new HTMLElementBuilder("div").WithID(id).Build();
        expect(elm).to.have.id(id);
    });

    it("Allows for event listeners to be added", () => {
        let clicked = false;
        let elm = new HTMLElementBuilder("div")
            .WithEventListener("click", () => {
                clicked = true;
            }).Build();
        expect(clicked).to.equal(false);
        elm.click();
        expect(clicked).to.equal(true);
    });
    
    it("Allows for correct copying", () => {
        let builder1 = new HTMLElementBuilder("div").AddClasses("class1");
        let builder2 = builder1.WithClasses("class2").AddInnerHTML("text");
        let builder3 = builder2.WithClasses("class3");

        //Notice the AddClasses instead of WithClasses
        let builder4 = builder1.AddClasses("added").AddInnerHTML("test");

        let elm1 = builder1.Build();
        let elm2 = builder2.Build();
        let elm3 = builder3.Build();
        let elm4 = builder4.Build();

        expect(elm1).to.have.html("test").and
                    .to.have.class("class1").and.class("added")
                    .and.not.class("class2").and.class("class3");
                    
        expect(elm2).to.have.html("text").and
                    .to.have.class("class1").and.class("class2")
                    .and.not.class("class3");

        expect(elm3).to.have.html("text").and
                    .to.have.class("class1")
                        .and.class("class2")
                        .and.class("class3");

        expect(elm4).to.have.html("test").and
                    .to.have.class("class1").and.class("added")
                    .and.not.class("class2").and.class("class3");
    });
});