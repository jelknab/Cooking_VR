import {AObjective} from "./AObjective";

export class ObjectiveFinale extends AObjective{
    constructor() {
        super("You've done it!\nNow see if you can do it for real!")
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }

}