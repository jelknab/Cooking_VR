import {AObjective} from "./AObjective";
import {Application} from "../index";
import {Vec3} from "../Vec3";
import {AInteractable} from "../Interactables/AInteractable";
import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Animation} from "../a-frame_wrappers/Animation";

export class Objective01_A extends AObjective {
    cutProgress: number = 0;
    onion: AInteractable;
    knife: AInteractable;

    private completed: boolean = false;

    constructor () {
        super('Look at the onion to chop it');
    }

    protected onDestroy(): void {
        this.player.equip(this.knife, new Vec3(218, 180, 270));
    }

    protected onInit(): void {
        this.instruction.setPosition(new Vec3(-3, -1, 8));
        this.instruction.setRotation(new Vec3(0, 180, 0));

        this.knife = new AInteractable('knife', () =>{});

        this.onion = new AInteractable(
            'onion',
            () => {
                this.player.drop(new Vec3(-5.2, -2, 4.8));
                // this.knife.setRotation(new Vec3(-130, 0, -90));
                this.onion.stopListening();
                this.cutNext();

                this.onion.rotateTo(new Vec3(0, -90, 0));
            }
        );

        this.onion.mark()
    }

    private cutNext() {
        new Animation(
            { 'dur': '500', 'attribute': 'position', 'to': `${-5.3 + this.cutProgress * .05} -2 4.6`},
            this.knife,
            () => {
                new Animation(
                    { 'dur': '500', 'attribute': 'rotation', 'to': '-90 0 -90'},
                    this.knife,
                    () => {
                        new Animation(
                            { 'dur': '500', 'attribute': 'rotation', 'to': '-130 0 -90'},
                            this.knife,
                            () => {
                                if (this.cutPiece()) {
                                    this.cutProgress++;
                                    this.cutNext();
                                } else {
                                    if (!this.completed) {
                                        this.progressObjective();
                                    }
                                    this.completed = true;
                                }
                            }
                        ).play();
                    }
                ).play();
            }
        ).play();
    }

    private cutPiece(): boolean {
        const slice: HTMLElement = <HTMLElement>this.onion.html.children.item(this.cutProgress);
        if (slice == null) {
            return false;
        }

        new Animation(
            { 'dur': '500', 'attribute': 'position', 'to': `0 0 ${(4-this.cutProgress)*.2 + .5}`},
            new AframeObject(null, slice)
        ).play();

        return true;
    }
}