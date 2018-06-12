import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Vec3} from "../Vec3";

// Text message with user instructions accessible by Application.instance
export class Instruction extends AframeObject{
    public showMessage(
        message: string,
        position: Vec3 = new Vec3(0,1.5,-8),
        rotation: Vec3 = new Vec3(0, 0, 0),
        size: number = 15
    ) {
        this.html.setAttribute('text', `value: ${message}; color: #000; width: ${size}; align: center`);

        this.setPosition(position);
        this.setRotation(rotation);
    }

    public setSize(size: number) {
        this.html.setAttribute('width', String(size));
    }
}