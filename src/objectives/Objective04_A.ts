import {AObjective} from "./AObjective";
import {Animation} from "../a-frame_wrappers/Animation";
import {AInteractable} from "../Interactables/AInteractable";
import {Vec3} from "../Vec3";
import {AframeObject} from "../a-frame_wrappers/AframeObject";

export class Objective04_A extends AObjective {
    constructor() {
        super('Add the tomato sauce\nto the sauce pan.')
    }

    protected onInit(): void {
        const can = new AInteractable('tomatoCan', () => {
            this.player.equip(can);
            can.stopListening();

            const pan = new AInteractable('pan', () => {
                pan.stopListening();

                this.player.drop(pan.getPosition().add(new Vec3(0, 1, 0)));

                new Animation(
                    { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, -150).toString()},
                    can,
                    () => {

                        new AframeObject('tomatoSauce').show();

                        new Animation(
                            { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, 0).toString()},
                            can,
                            () => {
                                can.setPosition(new Vec3(3, -2, -6));
                                this.progressObjective();
                            }
                        ).play();
                    }
                ).play();
            });

            pan.mark();
        });

        can.mark();
    }

    protected onDestroy(): void {
        this.marker.hide();
    }

}