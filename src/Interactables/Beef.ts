import {Interactable} from "../Interactable";
import {Application} from "../index";

export class Beef extends Interactable {
    timeHeated: number = 0;

    constructor (id:string) {
        super(id);
    }

    interact(): void {
        Application.player.equip(this);
    }

    // Called every second that pan is heated
    heat() {
        this.timeHeated++;

        console.log(this.timeHeated);

        if (this.timeHeated > 5 && this.timeHeated < 10) {// Require stirring?

        } else if (this.timeHeated > 10) {
            this.html.setAttribute('src', 'groundbeefCooked.png')
        }
    }
}