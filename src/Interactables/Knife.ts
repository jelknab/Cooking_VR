import {Interactable} from "../Interactable";
import {Application} from "../index";
import {Vec3} from "../Vec3";

export class Knife extends Interactable {

    constructor (id: string) {
        super(id);
    }

    interact() {
        Application.player.equip(this);

        // // Put beef in pan if holding beef
        // if (Application.player.equippedItem.id == 'beef') {
        //     this.beef = <Beef>Application.player.getEquippedItem();
        //
        //     Application.player.drop(new Vec3(0, 0.1, 0));
        //
        //     this.html.appendChild(this.beef.html);
        //     return;
        // }
    }

    onPlayerPickup() {
    }
    //
    // onPlayerSetDown() {
    //     for (let interactable of Application.interactables)
    //         if (interactable.id.indexOf('knifeSpot') != -1)
    //             (<GasPit>interactable).setVisible(false);
    // }

}