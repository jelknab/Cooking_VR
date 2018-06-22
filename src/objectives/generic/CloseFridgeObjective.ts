import {AObjective} from "../AObjective";
import {AInteractable} from "../../Interactables/AInteractable";
import {Animation} from "../../a-frame_wrappers/Animation";
import {Application} from "../../index";
import {Vec3} from "../../Vec3";
import {Sound} from "../../Interactables/Sound";

export class CloseFridgeObjective extends AObjective {
    fridge_door: AInteractable;

    constructor (
        private pos: Vec3 = new Vec3(0,1.5,-8),
        private rot: Vec3 = new Vec3(0,0,0)
    ) {
        super('Please close the fridge.');
    }

    protected onDestroy(): void {
        this.fridge_door.stopListening();
    }

    protected onInit(): void {
        this.instruction.setPosition(this.pos);
        this.instruction.setRotation(this.rot);

        this.fridge_door = new AInteractable(
            'fridge_door',
            () => {
                new Sound('Sound/close_fridge.wav', false);

                new Animation(
                    {
                        'dur': '1000', 'attribute': 'rotation', 'to': new Vec3(0, 90, 0)
                    },
                    this.fridge_door,
                    () => {
                        this.progressObjective();
                    }
                ).play();
            }
        )
    }

}