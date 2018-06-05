import {Interactable} from "../Interactable";

export class FridgeDoor extends Interactable {
    private isOpen: boolean = false;
    private animationElement: HTMLElement = null;

    constructor (id: string) {
        super(id);
    }

    interact() {
        this.isOpen = !this.isOpen;

        this.cleanup();
        if (this.isOpen) {
            this.openDoor()
        } else {
            this.closeDoor()
        }
    }

    private openDoor() {
        console.log('opening');

        const animation = <HTMLElement>document.createElement('a-animation');
        animation.setAttribute('attribute', 'rotation');
        animation.setAttribute('to', '0 0 0');
        animation.setAttribute('dur', '1500');

        this.html.appendChild(animation);
    }

    private closeDoor() {
        const animation = <HTMLElement>document.createElement('a-animation');
        animation.setAttribute('attribute', 'rotation');
        animation.setAttribute('to', '0 90 0');
        animation.setAttribute('dur', '1500');

        this.html.appendChild(animation);
    }

    private cleanup() {
        if (this.animationElement != null) this.html.removeChild(this.animationElement);
        this.animationElement = null;
    }
}