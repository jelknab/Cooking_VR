import {AObjective} from "./AObjective";
import {AInteractable} from "../Interactables/AInteractable";
import {Vec3} from "../Vec3";
import {Animation} from "../a-frame_wrappers/Animation";

export class Objective04_B extends AObjective {
    constructor () {
        super('Add the vegetables to the beef.')
    }

    protected onInit(): void {
        const bowl = new AInteractable('bowl', () => {
            this.player.equip(bowl);
            bowl.stopListening();

            const pan = new AInteractable('pan', () => {
                pan.stopListening();

                this.player.drop(pan.getPosition().add(new Vec3(0, 1, 0)));

                new Animation(
                    { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, -150).toString()},
                    bowl,
                    () => {
                        new Animation(
                            { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, 0).toString()},
                            bowl,
                            () => {
                                bowl.setPosition(new Vec3(-4, -2.2, -6));
                                this.progressObjective();
                            }
                        ).play();
                    }
                ).play();
            });

            pan.mark();
        });

        bowl.mark();
    }

    protected onDestroy(): void {
        this.marker.hide();
    }

}