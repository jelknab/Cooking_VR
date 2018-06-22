import {AframeObject} from "../a-frame_wrappers/AframeObject";

export class AInteractable extends AframeObject{
    public constructor (id: string, private interact: any, html?: HTMLElement) {
        super(id, html);
        this.html.addEventListener("click", this.interact);
    }

    public stopListening() {
        this.html.removeEventListener("click", this.interact);
    }

    public remove() {
        this.stopListening();
        this.html.parentElement.removeChild(this.html);
    }
}