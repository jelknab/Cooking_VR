import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Vec3} from "../Vec3";

// Text message with user instructions accessible by Application.instance
export class Instruction extends AframeObject{
    private message: string;
    private position: Vec3;
    private rotation: Vec3;
    private size: number;

    public showMessage(
        message: string,
        position: Vec3 = new Vec3(0,1.5,-8),
        rotation: Vec3 = new Vec3(0, 0, 0),
        size: number = 15
    ) {
        this.message = message;
        this.position = position;
        this.rotation = rotation;
        this.size = size;

        this.update();
    }

    public setSize(size: number) {
        this.size = size;
        this.update();
    }

    public update() {
        this.html.setAttribute('text', `value: ${this.message}; color: #000; width: ${this.size}; align: center`);

        this.setPosition(this.position);
        this.setRotation(this.rotation);
    }
}