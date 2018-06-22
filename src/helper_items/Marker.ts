import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Vec3} from "../Vec3";
import {Application} from "../index";
import {Player} from "../Player";

// Arrow that is used to point to things
export class Marker extends AframeObject {

    showAt(position: Vec3) {
        this.setPosition(position.add(new Vec3(0, 1, 0)));
        this.show();
    }
}