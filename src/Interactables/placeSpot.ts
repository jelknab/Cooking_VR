import {Interactable} from "../Interactable";
import {Application} from "../index";

export class PlaceSpot extends Interactable {

    constructor(id: string, private filter: String[]) {
        super(id);
    }

    interact(): void {
        if (Application.player.isHoldingItem()) {

        }
    }

    public show() {
        if (this.filter != null && Application.player.isHoldingItem()) {
            if (this.filter.indexOf(Application.player.getEquippedItem().id) == -1) {
                return;
            }
        }

        this.html.setAttribute('visible', 'true');
    }

    public hide() {
        this.html.setAttribute('visible', 'false');
    }

    onPlayerPickup() {
        super.onPlayerPickup();
    }

    static load() {
        const placeSpots = document.querySelectorAll(".place-spot");
        for (let i = 0; i < placeSpots.length; i++) {
            const spot: PlaceSpot = new PlaceSpot(placeSpots[i].id);
        }
    }

}