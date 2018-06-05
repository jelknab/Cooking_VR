import {Interactable} from "./Interactable";
import {Application} from "./index";
import {Vec3} from "./Vec3";

export class Player {
    public equippedItem: Interactable;
    public cooldown_timestamp: Date;

    constructor (public camera: HTMLElement) {

    }

    public equip(item: Interactable) {
        if (this.isHoldingItem() || (+new Date()) - (+this.cooldown_timestamp) < 2000) return;
        this.cooldown_timestamp = new Date();

        this.camera.appendChild(item.html);
        this.equippedItem = item;

        item.setPosition(new Vec3(-1, -.5, -1));

        this.equippedItem.onPlayerPickup();
    }

    public drop(position: Vec3) {
        Application.world.appendChild(this.equippedItem.html);

        this.equippedItem.setPosition(position);
        this.equippedItem.onPlayerSetDown();
        this.equippedItem = null;
    }

    public isHoldingItem() {
        return this.equippedItem != null;
    }

    public getEquippedItem(): Interactable {
        return this.equippedItem;
    }
}