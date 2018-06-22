import {AObjective} from "./AObjective";
import {AInteractable} from "../Interactables/AInteractable";
import {Vec3} from "../Vec3";

export class Objective02_C extends AObjective {
    constructor () {
        super('Now place the beef in the pan');
    }

    protected onInit(): void {
        const beef = new AInteractable(
            'beef',
            () => {
                this.player.equip(beef, new Vec3(0, 0, 0));
                beef.stopListening();

                const pan = new AInteractable(
                    'pan',
                    () => {
                        pan.stopListening();
                        this.player.drop(new Vec3(.5, -0.060, .2));

                        beef.parentTo(pan);

                        this.progressObjective();
                    }
                );

                pan.mark();
            }
        );

        beef.mark();
    }

    protected onDestroy(): void {
        this.marker.hide();
    }

}