import {AObjective} from "./AObjective";
import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Animation} from "../a-frame_wrappers/Animation";
import {Vec3} from "../Vec3";
import {Sound} from "../Interactables/Sound";

export class Objective03 extends AObjective {
    completed: boolean = false;

    constructor () {
        super('')
    }

    protected onInit(): void {
        const water = new AframeObject('water');
        water.show();

        const pan_water = new AframeObject('pan-water');
        pan_water.show();

        new Sound('Sound/water.mp3', false).setPosition(water.getPosition());

        new Animation(
            {'dur': '5000', 'attribute': 'scale', 'to': new Vec3(16, 10, 16)},
            pan_water,
            () => {
                water.hide();
                pan_water.show();

                if (!this.completed) {
                    this.progressObjective()
                }
                this.completed = true;
            }
        ).play();
    }

    protected onDestroy(): void {
    }

}