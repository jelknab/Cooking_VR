import {AObjective} from "./AObjective";
import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Animation} from "../a-frame_wrappers/Animation";
import {AInteractable} from "../Interactables/AInteractable";
import {Vec3} from "../Vec3";

export class Objective04 extends AObjective {
    constructor () {
        super('Put the spaghetti in the pan')
    }

    protected onInit(): void {
        const spaghetti = new AInteractable('spaghetti', () => {
            this.player.equip(spaghetti);
            spaghetti.stopListening();

            const pan = new AInteractable('spaghet-pan', () => {
                pan.stopListening();

                this.player.drop(pan.getPosition().add(new Vec3(0, 2, 0)));

                new Animation(
                    { 'dur': 500, 'attribute': 'position', 'to': pan.getPosition().add(new Vec3(0, 2, 0)).toString()},
                    spaghetti,
                    () => {
                        new Animation(
                            { 'dur': 500, 'attribute': 'position', 'to': pan.getPosition().toString()},
                            spaghetti,
                            () => {
                                spaghetti.remove();
                                new AframeObject('beef').html.setAttribute('src', 'Textures/groundbeefCooked.png');
                                this.progressObjective();
                            }
                        ).play();
                    }
                ).play();
            });

            pan.mark();
        });

        spaghetti.mark();
    }

    protected onDestroy(): void {
        this.marker.hide();
    }

}