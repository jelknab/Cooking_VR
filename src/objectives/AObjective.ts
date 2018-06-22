import {Application} from "../index";
import {Instruction} from "../helper_items/Instruction";
import {Player} from "../Player";
import {Marker} from "../helper_items/Marker";
import {Vec3} from "../Vec3";
import {Sound} from "../Interactables/Sound";

export abstract class AObjective {
    protected player: Player;
    protected instruction: Instruction;
    protected marker: Marker;

    protected constructor(private messsage: string, public instruction_pos?: Vec3, public instruction_rot?: Vec3) {
        this.player = Application.instance.player;
        this.instruction = Application.instance.instruction;
        this.marker = Application.instance.marker;
    }

    protected abstract onInit(): void;

    protected abstract onDestroy(): void;

    start() {
        this.instruction.showMessage(this.messsage, this.instruction_pos, this.instruction_rot);
        this.onInit();
    }

    public finish() {
        this.onDestroy();
    }

    protected progressObjective() {
        Application.instance.progressObjective();
    }

    protected playSound(file: string, looping: boolean): Sound {
        return new Sound(file, looping);
    }
}