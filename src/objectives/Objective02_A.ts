import {AObjective} from "./AObjective";
import {Box} from "../Interactables/Box";
import {Vec3} from "../Vec3";
import {Application} from "../index";

export class Objective02_A extends AObjective {
    static panPos = new Vec3(-8.5, -2.1, -4.2);

    private box: Box;

    constructor () {
        super("Great!\nI've marked a spot on the stove\nplease put it down there.")
    }

    protected onInit(): void {
        this.box = new Box(
            Objective02_A.panPos,
            () => {
                Application.instance.player.drop(Objective02_A.panPos);
                Application.instance.progressObjective();
            }
        );

        Application.instance.marker.show(Objective02_A.panPos)
    }

    protected onDestroy(): void {
        this.box.remove();
        Application.instance.marker.hide();
    }

}