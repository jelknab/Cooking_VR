import {Interactable} from "./Interactable";

export class Player {
    constructor (
        public camera: HTMLElement
    ) {

    }

    public grabItem(item: Interactable) {
        this.camera.appendChild(item.html);
        item.html.setAttribute('position', '-2 0 0')
    }
}