import {Interactable} from "../Interactable";
import {Application} from "../index";
import {GasPit} from "./GasPit";
import {Vec3} from "../Vec3";
import {Beef} from "./Beef";
import {Heatable} from "../Heatable";

export class Pan extends Interactable implements Heatable {
    private beef: Beef;

    constructor (id: string) {
        super(id);
    }

    interact() {
        if (!Application.player.isHoldingItem()) {
            Application.player.equip(this);
            return;
        }

        // Put beef in pan if holding beef
        if (Application.player.equippedItem.id == 'beef') {
            this.beef = <Beef>Application.player.getEquippedItem();

            Application.player.drop(new Vec3(0, 0.1, 0));

            this.html.appendChild(this.beef.html);
            return;
        }
    }

    onPlayerPickup() {
        for (let interactable of Application.interactables)
            if (interactable.id.indexOf('panSpot') != -1)
                (<GasPit>interactable).setVisible(true);
    }

    onPlayerSetDown() {
        for (let interactable of Application.interactables)
            if (interactable.id.indexOf('panSpot') != -1)
                (<GasPit>interactable).setVisible(false);
    }


    heat(): void {
        if (this.beef) {
            this.beef.heat();
        }
    }
}