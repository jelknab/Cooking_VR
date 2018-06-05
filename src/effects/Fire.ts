import {Application} from "../index";

export class Fire {
    constructor (private html: HTMLElement) {
    }

    setState(on: boolean) {
        this.html.setAttribute('visible', String(on));
    }
}