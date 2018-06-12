import {Application} from "../index";

export abstract class AObjective {
    protected constructor (private messsage: string) {}

    protected abstract onInit(): void;

    protected abstract onDestroy(): void;

    start() {
        Application.instance.instruction.showMessage(this.messsage);
        this.onInit();
    }

    public finish() {
        this.onDestroy();
    }
}