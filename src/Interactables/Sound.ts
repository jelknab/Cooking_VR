import {AframeObject} from "../a-frame_wrappers/AframeObject";

export class Sound extends AframeObject {
    constructor (private soundFile: string, private looping: boolean) {
        super(null, document.createElement("a-sound"));

        this.html.setAttribute('src', soundFile);
        this.html.setAttribute('autoplay', 'true');
        this.html.setAttribute('loop', String(looping));

        this.parentTo(null);
    }
}