import {AObjective} from "./AObjective";
import {Box} from "../Interactables/Box";
import {Vec3} from "../Vec3";
import {Application} from "../index";

export class Objective03_A extends AObjective {
    static panPos = new Vec3(-8.5, -2.15, -4.2);

    private box: Box;

    constructor () {
        super("Great!\nI've marked a spot on the stove\nplease put it down there.")
    }

    protected onInit(): void {
        this.box = new Box(
            Objective03_A.panPos,
            Application.instance.world,
            () => {
                Application.instance.player.drop(Objective03_A.panPos);
                Application.instance.progressObjective();
            }
        );

        Application.instance.marker.show(Objective03_A.panPos)
    }

    protected onDestroy(): void {
        this.box.remove();
        Application.instance.marker.hide();
    }

}