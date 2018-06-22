import {AObjective} from "./AObjective";
import {AInteractable} from "../Interactables/AInteractable";
import {Vec3} from "../Vec3";
import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Animation} from "../a-frame_wrappers/Animation";

export class Objective02_B extends AObjective {
    constructor () {
        super('Put a little bit of olive oil\nin the pan.')
    }

    protected onInit(): void {
        const oliveOil = new AInteractable(
            'oliveOil',
            () => {
                this.player.equip(oliveOil, new Vec3(0,0,0));
                oliveOil.stopListening();

                const pan = new AInteractable(
                    'pan',
                    () => {
                        this.player.drop(new Vec3(-7, -1, -4.25));
                        pan.stopListening();

                        new Animation(
                            { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, -150).toString()},
                            oliveOil,
                            () => {
                                new Animation(
                                    { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, 0).toString()},
                                    oliveOil,
                                    () => {
                                        oliveOil.setPosition(new Vec3(-10.200, -2.253, -3.843));
                                        this.progressObjective();
                                    }
                                ).play();
                            }
                        ).play();
                    }
                );
                this.marker.showAt(pan.getPosition());
            }
        );

        this.marker.showAt(oliveOil.getPosition());
    }

    protected onDestroy(): void {
        this.marker.hide();
    }

}