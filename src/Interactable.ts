import {Vec3} from "./Vec3";

export abstract class Interactable {
    public html: HTMLElement;

    protected constructor (public id: string) {
        this.html = <HTMLElement>document.getElementById(id);

        if (this.html == null) {
            throw new Error(`Failed to get element with id: '${id}'.`);
        }

        this.html.addEventListener("click", () => {
            this.interact();
        });
    }

    abstract interact(): void;

    // Called when item is picked up by user
    onPlayerPickup() {
        console.log(`Warning ${this.id} has no specific pickup functionality.`);
    }

    // Called when item is dropped by player
    onPlayerSetDown() {
        console.log(`Warning ${this.id} has no specific setDown functionality.`);
    }

    public getPosition(): Vec3 {
        const attr =  eval(this.html.getAttribute('position'));

        return new Vec3(attr.x, attr.y, attr.z);
    }

    public setPosition(position: Vec3) {
        this.html.setAttribute('position', `${position.x} ${position.y} ${position.z}`)
    }

    public setPositionStr(position: string) {
        this.html.setAttribute('position', position);
    }
}