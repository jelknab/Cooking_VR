import {AObjective} from "../AObjective";
import {Application} from "../../index";

// This is nothing more than a change of text
export class TimeoutObjective extends AObjective {
    constructor (message: string, private duration: number) {
        super(message)
    }

    protected onDestroy(): void {

    }

    protected onInit(): void {
        setTimeout(() => this.progressObjective(), this.duration)
    }

}