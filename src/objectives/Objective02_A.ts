import {AObjective} from "./AObjective";
import {Box} from "../Interactables/Box";
import {Vec3} from "../Vec3";

export class Objective02_A extends AObjective {
    static panPos = new Vec3(-7, -2.1, -4.4);

    private box: Box;

    constructor () {
        super("Great!\nI've marked a spot on the stove\nplease put it down there.")
    }

    protected onInit(): void {
        this.box = new Box(
            Objective02_A.panPos,
            null,
            () => {
                this.player.drop(Objective02_A.panPos);
                this.progressObjective();
            }
        );

        this.marker.showAt(Objective02_A.panPos)
    }

    protected onDestroy(): void {
        this.box.remove();
        this.marker.hide();
    }

}