import {AObjective} from "../AObjective";
import {Vec3} from "../../Vec3";
import {AframeObject} from "../../a-frame_wrappers/AframeObject";
import {Animation} from "../../a-frame_wrappers/Animation";

export class PlayerMoveObjective extends AObjective {
    constructor (public target: Vec3) {
        super('')
    }

    protected onInit(): void {
        const blinderOBJ = document.createElement("a-plane");
        blinderOBJ.setAttribute('width', '10');
        blinderOBJ.setAttribute('height', '10');
        blinderOBJ.setAttribute('opacity', '0');
        const blinder = new AframeObject(null, blinderOBJ);
        blinder.setPosition(new Vec3(0, -0.131, -0.526));
        blinder.parentTo(this.player.camera);

        // Blind
        new Animation(
            { 'dur': '2000', 'attribute': 'opacity', 'to': '1'},
            blinder,
            () => {
                // While blinded move player
                this.player.moveTo(this.target);

                //Unblind
                new Animation(
                    { 'dur': '2000', 'attribute': 'opacity', 'to': '0'},
                    blinder,
                    () => {
                        blinder.remove();
                        this.progressObjective();
                    }
                ).play();
            }
        ).play();
    }

    protected onDestroy(): void {
    }

}