import {AInteractable} from "./Interactables/AInteractable";
import {Application} from "./index";
import {Vec3} from "./Vec3";
import {AframeObject} from "./a-frame_wrappers/AframeObject";
import {Animation} from "./a-frame_wrappers/Animation";

export class Player {
    private static toDeg = Math.PI / 180;

    public equippedItem: AInteractable;
    private camera: AframeObject;

    constructor (public camera_id: string) {
        this.camera = new AframeObject(null, document.getElementById(camera_id));
    }

    public equip(item: AInteractable) {
        // Animate object flying to calculated position for smooth transition
        new Animation(
            { 'dur': '500', 'attribute': 'position', 'to': this.calculateWorldHoldingPosition().toString()},
            item,
            () => {
                // set object position to local holding position and set camera as parent
                item.setPosition(this.calculateLocalHoldingPosition());
                this.camera.html.appendChild(item.html);
            }
        ).play();

        this.equippedItem = item;
    }

    public drop(position: Vec3) {
        // remove camera as parent and set position to calculated world holding pos
        Application.instance.world.appendChild(this.equippedItem.html);
        this.equippedItem.setPosition(this.calculateLocalHoldingPosition());

        // Animate object flying to target position for smooth transition
        new Animation(
            { 'dur': '500', 'attribute': 'position', 'to': position.toString()},
            this.equippedItem,
            () => {}
        ).play();

        this.equippedItem = null;
    }

    private calculateWorldHoldingPosition(): Vec3 {
        const rotation = eval(this.camera.html.getAttribute('rotation'));
        const yaw = (rotation.y + 30)* Player.toDeg;

        return this.camera.getPosition().add(
            new Vec3(
                -Math.sin(yaw) * 2,
                -1,
                -Math.cos(yaw) * 2
            )
        );
    }

    private calculateLocalHoldingPosition(): Vec3 {
        return new Vec3(
            -Math.sin(30 * Player.toDeg) * 2,
            -.5,
            -Math.cos(30 * Player.toDeg) * 2
        );
    }
}