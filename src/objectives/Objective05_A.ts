import {AObjective} from "./AObjective";
import {AInteractable} from "../Interactables/AInteractable";
import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Animation} from "../a-frame_wrappers/Animation";
import {Vec3} from "../Vec3";

export class Objective05_A extends AObjective {
    constructor() {
        super('Time to filter the spaghetti\nfrom the water.');
    }

    protected onInit(): void {
        const spaghettipan = new AInteractable('spaghet-pan', () => {
            this.player.equip(spaghettipan);
            spaghettipan.stopListening();

            const strainer = new AInteractable('strainer', () => {
                strainer.stopListening();

                this.player.drop(strainer.getPosition().add(new Vec3(0, 1, 0)));

                new Animation(
                    { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, -150).toString()},
                    spaghettipan,
                    () => {
                        new Animation(
                            { 'dur': 1000, 'attribute': 'rotation', 'to': new Vec3(0, 0, 0).toString()},
                            spaghettipan,
                            () => {
                                spaghettipan.setPosition(new Vec3(2.5, -2, -3));
                                new AframeObject('pan-water').remove();
                                this.progressObjective();
                            }
                        ).play();
                    }
                ).play();
            });

            strainer.mark();
        });

        spaghettipan.mark();
    }

    protected onDestroy(): void {
        this.marker.hide();
    }
}