import {AInteractable} from "./Interactables/AInteractable";
import {Application} from "./index";
import {Vec3} from "./Vec3";
import {AframeObject} from "./a-frame_wrappers/AframeObject";
import {Animation} from "./a-frame_wrappers/Animation";
import {Sound} from "./Interactables/Sound";

export class Player extends AframeObject {
    private static toDeg = Math.PI / 180;

    public equippedItem: AInteractable;
    public camera: AframeObject;

    constructor(public camera_wrapper_id: string, camera_id:string) {
        super(camera_wrapper_id);

        this.camera = new AframeObject(camera_id)
    }

    public equip(item: AInteractable, rotation: Vec3 = new Vec3(0, 0, 0)) {
        if (this.equippedItem != null) {
            throw `Cannot pick ${item.id}, ${this.equippedItem.id} is already being helt`;
        }

        new Sound('Sound/coin_sound.wav', false);

        this.equippedItem = item;

        // Animate object flying to calculated position for smooth transition
        new Animation(
            {'dur': '500', 'attribute': 'position', 'to': this.calculateWorldHoldingPosition().toString()},
            this.equippedItem,
            () => {
                this.equippedItem.setPosition(this.calculateLocalHoldingPosition());
                this.equippedItem.parentTo(this.camera);

                // Animate object rolling to user view rotation
                new Animation(
                    { 'dur': '250', 'attribute': 'rotation', 'to': rotation},
                    this.equippedItem
                ).play();
            }
        ).play();
    }

    moveTo(where: Vec3) {
        new Sound('Sound/woosh_1.wav', false);

        this.html.setAttribute('position', where.toString());
    }

    public drop(position: Vec3) {
        // remove camera as parent and set position to calculated world holding pos
        this.equippedItem.setPosition(this.calculateWorldHoldingPosition());
        this.equippedItem.parentTo(null);

        // Animate object flying to target position for smooth transition
        new Animation(
            { 'dur': '500', 'attribute': 'position', 'to': position.toString()},
            this.equippedItem
        ).play();

        // Animate object taking on default rotation
        new Animation(
            { 'dur': '500', 'attribute': 'rotation', 'to': new Vec3(0, 0, 0)},
            this.equippedItem
        ).play();

        this.equippedItem = null;
    }

    private calculateWorldHoldingPosition(): Vec3 {
        const yaw = (this.camera.getRotation().y + 30)* Player.toDeg;

        return this.getPosition().add(
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