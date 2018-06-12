import {AframeObject} from "./AframeObject";

export class Animation {
    private animation: HTMLElement;

    constructor (
        public attributes: any,
        public target: AframeObject,
        public onComplete: any
    ) {}

    play() {
        this.animation = document.createElement("a-animation");
        for (let index in this.attributes) {
            this.animation.setAttribute(index, this.attributes[index])
        }
        this.target.html.appendChild(this.animation);

        this.animation.addEventListener('animationend', () => this.complete());
    }

    complete() {
        this.animation.parentElement.removeChild(this.animation);
        this.onComplete();
    }
}