import { List } from "linqts";


export class HTMLElementBuilder<T extends keyof HTMLElementTagNameMap>{
    private _classes: List<string>;
    private _id?: string;
    private _innerHTML?: string;
    private _type: T;
    private _eventListeners: {[type: string]: EventListenerOrEventListenerObject} = {};


    constructor(type: T){
        this._type = type;
        this._classes = new List();
    }

    public Copy(): HTMLElementBuilder<T>{
        let copy = new HTMLElementBuilder(this._type);
        copy._classes.AddRange(this._classes.ToArray());
        copy._innerHTML = this._innerHTML;
        copy._id = this._id;
        copy._eventListeners = this._eventListeners;
        return copy;
    }


    public AddID(id: string): HTMLElementBuilder<T>{
        this._id = id;
        return this;
    }
    public WithID(id: string): HTMLElementBuilder<T>{
        return this.Copy().AddID(id);
    }


    public AddClasses(...classes: string[]): HTMLElementBuilder<T>{
        this._classes.AddRange(classes);
        return this;
    }
    public WithClasses(...classes: string[]): HTMLElementBuilder<T>{
        return this.Copy().AddClasses(...classes);
    }


    public AddEventListener(event:string, eventListener: EventListenerOrEventListenerObject){
        this._eventListeners[event] = eventListener;
        return this;
    }
    public WithEventListener(event: string, eventListener: EventListenerOrEventListenerObject): HTMLElementBuilder<T>{
        return this.Copy().AddEventListener(event, eventListener);
    }


    public AddInnerHTML(text: string){
        this._innerHTML = text;
        return this;
    }
    public WithInnerHTML(text: string):HTMLElementBuilder<T>{
        return this.Copy().AddInnerHTML(text);
    }

    public Build (): HTMLElementTagNameMap[T]{
        let elm = document.createElement<T>(this._type);
        elm.classList.add(...this._classes.ToArray());
        if(this._id) elm.id = this._id;
        if(this._innerHTML) elm.innerHTML = this._innerHTML;

        for(let a in this._eventListeners){
            elm.addEventListener(a, this._eventListeners[a]);
        }

        return elm;
    }
}