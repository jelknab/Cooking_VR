import {AObjective} from "./AObjective";
import {Application} from "../index";
import {Vec3} from "../Vec3";
import {AInteractable} from "../Interactables/AInteractable";
import {AframeObject} from "../a-frame_wrappers/AframeObject";
import {Animation} from "../a-frame_wrappers/Animation";

export class Objective01_B extends AObjective {
    cutProgress: number = 0;
    carrot: AInteractable;
    knife: AInteractable;

    private completed: boolean = false;

    constructor () {
        super('Look at the carrot to chop it');
    }

    protected onDestroy(): void {
        this.knife.setRotation(new Vec3(0, -90, 0));
        this.marker.hide();
    }

    protected onInit(): void {
        this.instruction.setPosition(new Vec3(-3, -1, 8));
        this.instruction.setRotation(new Vec3(0, 180, 0));

        this.knife = new AInteractable('knife', () =>{});

        this.carrot = new AInteractable(
            'carrot',
            () => {
                this.player.drop(new Vec3(-5.2, -2, 4.8));
                // this.knife.setRotation(new Vec3(-130, 0, -90));
                this.carrot.stopListening();
                this.cutNext();
            }
        );

        this.carrot.mark();
    }

    private cutNext() {
        new Animation(
            { 'dur': '500', 'attribute': 'position', 'to': `${-4.7 + this.cutProgress * .1} -2 4.6`},
            this.knife,
            () => {
                new Animation(
                    { 'dur': '500', 'attribute': 'rotation', 'to': '-90 0 -90'},
                    this.knife,
                    () => {
                        this.playSound('sound/carrotCut.mpeg', false);

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
        const slice: HTMLElement = <HTMLElement>this.carrot.html.children.item(this.cutProgress);
        if (slice == null) {
            return false;
        }

        new Animation(
            { 'dur': '500', 'attribute': 'position', 'to': `${(-(4-this.cutProgress)*.2 + .5)} 0 0`},
            new AframeObject(null, slice)
        ).play();

        return true;
    }
}