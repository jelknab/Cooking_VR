import {AObjective} from "./AObjective";
import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Animation} from "../a-frame_wrappers/Animation";
import {AInteractable} from "../Interactables/AInteractable";
import {Vec3} from "../Vec3";

export class Objective05_B extends AObjective {
    constructor () {
        super('Add the sauce to the spaghetti');
    }

    protected onInit(): void {
        const saucepan = new AInteractable('pan', () => {
            this.player.equip(saucepan);
            saucepan.stopListening();

            const spaghettiPan = new AInteractable('spaghet-pan', () => {
                spaghettiPan.stopListening();

                this.player.drop(spaghettiPan.getPosition().add(new Vec3(0, 2, 0)));

                new Animation(
                    { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, -150).toString()},
                    saucepan,
                    () => {
                        new Animation(
                            { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, 0).toString()},
                            saucepan,
                            () => {
                                saucepan.setPosition(new Vec3(-4.4, -2.1, -3.75));
                                new AframeObject('tomatoSaucePot').show();
                                this.progressObjective();
                            }
                        ).play();
                    }
                ).play();
            });

            spaghettiPan.mark();
        });

        saucepan.mark();
    }

    protected onDestroy(): void {
        this.marker.hide();
    }

}