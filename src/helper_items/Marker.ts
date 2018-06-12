import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Vec3} from "../Vec3";

// Arrow that is used to point to things
export class Marker extends AframeObject {
    show(position: Vec3) {
        this.setPosition(position.add(new Vec3(0, 1, 0)));
        this.html.setAttribute('visible', 'true')
    }

    hide() {
        this.html.setAttribute('visible', 'false')
    }
}