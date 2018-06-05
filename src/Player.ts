import {Interactable} from "./Interactable";
import {Application} from "./index";

export class Player {
    public equippedItem: Interactable;

    constructor (public camera: HTMLElement) {

    }

    public equip(item: Interactable) {
        if (!this.isHoldingItem()) {
            this.camera.appendChild(item.html);
            this.equippedItem = item;

            item.html.setAttribute('position', '-1 -.5 -1');

            this.equippedItem.onPlayerPickup();
        }
    }

    public drop(position: string) {
        Application.world.appendChild(this.equippedItem.html);

        this.equippedItem.html.setAttribute('position', position);
        this.equippedItem.onPlayerSetDown();
        this.equippedItem = null;
    }

    public isHoldingItem() {
        return this.equippedItem != null;
    }
}