import {AObjective} from "./AObjective";
import {AInteractable} from "../Interactables/AInteractable";
import {Vec3} from "../Vec3";
import {AframeObject} from "../a-frame_wrappers/AframeObject";

export class Objective01_C extends AObjective {
    bowl: AframeObject;

    constructor() {
        super('Put the vegetables in the bowl');
    }

    protected onInit(): void {
        this.bowl = new AframeObject('bowl');

        const items: AframeObject[] = [
            new AframeObject('onion'),
            new AframeObject('carrot')
        ];

        items[0].moveTo(
            this.bowl.getPosition().add(new Vec3(0, 2, 0)),
            500,
            () => {
                items[0].moveTo(this.bowl.getPosition().add(new Vec3(0, -.75, 0)), 500);
                items[1].moveTo(
                    this.bowl.getPosition().add(new Vec3(0, 2, 0)),
                    500,
                    () => {
                        items[1].moveTo(
                            this.bowl.getPosition().add(new Vec3(0, -.75, 0)),
                            500,
                            () => {
                                for (let item of items) {
                                    item.remove();
                                }

                                this.progressObjective();
                            }
                        );
                    }
                )
            }
        )
    }

    protected onDestroy(): void {

    }
}