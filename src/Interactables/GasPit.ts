import {Interactable} from "../Interactable";
import {Fire} from "../effects/Fire";
import {Application} from "../index";
import {Heatable} from "../Heatable";

export class GasPit extends Interactable {
    isActive: boolean = false;
    activeItem: Interactable;

    interval: any;

    constructor(id: string, private fireEffect: Fire) {
        super(id);
    }

    interact(): void {
        if (Application.player.isHoldingItem()) {
            this.activeItem = Application.player.getEquippedItem();
            console.log(this.activeItem.id);

            Application.player.drop(this.getPosition());
        }
    }

    setActive(active: boolean) {

        this.isActive = active;
        this.fireEffect.setState(this.isActive);

        if (active) {
            this.interval = window.setInterval(
                () => {this.heat()},
                1000
            )
        } else {
            window.clearInterval(this.interval);
        }
    }

    public setVisible(value: boolean) {
        this.html.setAttribute('visible', String(value));
    }

    public heat() {
        if (!this.activeItem) return;

        if (this.activeItem.getPosition().distance(this.getPosition()) == 0) {
            (<Heatable><any>this.activeItem).heat();
        }
    }

}