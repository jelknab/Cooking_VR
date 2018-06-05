import {Application} from "../index";

export class Fire {
    constructor (private html: HTMLElement) {
    }

    setState(on: boolean) {
        console.log(String(on));
        this.html.setAttribute('visible', String(on));
    }
}