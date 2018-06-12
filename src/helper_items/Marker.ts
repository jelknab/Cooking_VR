import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Vec3} from "../Vec3";

// Arrow that is used to point to things
export class Marker extends AframeObject {
    show(position: Vec3) {
        this.setPosition(position);
        this.html.setAttribute('visible', 'false')
    }

    hide() {
        this.html.setAttribute('visible', 'false')
    }
}