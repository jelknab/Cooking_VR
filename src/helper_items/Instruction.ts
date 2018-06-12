import {AframeObject} from "../a-frame_wrappers/AframeObject";

// Text message with user instructions accessible by Application.instance
export class Instruction extends AframeObject{
    public showMessage(message: string) {
        this.html.setAttribute('value', message);
    }
}