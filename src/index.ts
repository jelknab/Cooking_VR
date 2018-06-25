import {Player} from "./Player";
import {AObjective} from "./objectives/AObjective";
import {Instruction} from "./helper_items/Instruction";
import {TimeoutObjective} from "./objectives/generic/TimeoutObjective";
import {Marker} from "./helper_items/Marker";
import * as objectives from "./objectives/index";
import {AframeObject} from "./a-frame_wrappers/AframeObject";
import {ConfirmationObjective} from "./objectives/generic/ConfirmationObjective";
import {TurnToBackObjective} from "./objectives/TurnToBackObjective";
import {OpenFridgeObjective} from "./objectives/generic/OpenFridgeObjective";
import {Vec3} from "./Vec3";
import {TakeAndPlaceObjective} from "./objectives/generic/TakeAndPlaceObjective";
import {PickupObjective} from "./objectives/generic/PickupObjective";
import {CloseFridgeObjective} from "./objectives/generic/CloseFridgeObjective";

export class Application {
    static instance: Application;
    static objectives: AObjective[];

    static loadApplication() {
        // Make new application instance
        Application.instance = new Application();

        // Add objectives
        Application.objectives = [
            new ConfirmationObjective(),     // Start button objective
            new TimeoutObjective("Awesome!! Let's get started!", 2000),
            new TimeoutObjective("We're going to start\nby making the sauce.", 5000),
            new TimeoutObjective("For the sauce we need\nto cut some vegetables.", 5000),
            new TurnToBackObjective(),
            new OpenFridgeObjective(new Vec3(-3, -1, 8), new Vec3(0, 180, 0)),
            new TakeAndPlaceObjective('carrot', new Vec3(-4.8, -2, 4.8), new Vec3(-10, -1.7, .5), new Vec3(0, 90, 0)),
            new TakeAndPlaceObjective('onion', new Vec3(-5.2, -2, 4.8), new Vec3(-10, -1.7, 1), new Vec3(0, 90, 0)),
            new CloseFridgeObjective(new Vec3(-3, -1,   8), new Vec3(0, 180, 0)),
            new PickupObjective('knife', new Vec3(-3, -1, 8), new Vec3(0, 180, 0), new Vec3(218, 180, 270)),
            new objectives.Objective01_A(),
            new objectives.Objective01_B(),
            new objectives.Objective01_C(),
            new TakeAndPlaceObjective('bowl', new Vec3(-4, -2.2, -6.25), new Vec3(-5, -.5, 7), new Vec3(0, 180, 0)),
            new objectives.Objective02(),
            new objectives.Objective02_A(),
            new objectives.Objective02_B(),
            new OpenFridgeObjective(),
            new objectives.Objective02_C(),
            new CloseFridgeObjective(),
            new TakeAndPlaceObjective('spaghet-pan', new Vec3(-0.55, -3, -5.72)),
            new objectives.Objective03(),
            new TakeAndPlaceObjective('spaghet-pan', new Vec3(-6.5, -2.2, -6)),
            new TimeoutObjective("Don't forget to steer\nthe grounded beef.", 5000),
            new objectives.Objective04(),
            new OpenFridgeObjective(),
            new objectives.Objective04_A(),
            new CloseFridgeObjective(),
            new objectives.Objective04_B(),
            new TimeoutObjective('Put the sauce on a low fire', 5000),
            new TimeoutObjective('wait for about\n15 minutes', 5000),
            new TakeAndPlaceObjective('strainer', new Vec3(-0.55, -2.5, -4)),
            new objectives.Objective05_A(),
            new objectives.Objective05_B(),
            new objectives.ObjectiveFinale(),
        ];

        // Start first objective
        Application.instance.start();
    }

    private activeObjective: AObjective;

    // Globally needed items
    public world: AframeObject;
    public player: Player;
    public instruction: Instruction;
    public marker: Marker;

    constructor() {
        this.world = new AframeObject('scene');
        this.player = new Player('cameraWrapper', 'camera');
        this.instruction = new Instruction('instructions');
        this.marker = new Marker('marker');
    }

    public progressObjective() {
        this.activeObjective.finish();
        this.activeObjective = Application.objectives[Application.objectives.indexOf(this.activeObjective) + 1];
        this.activeObjective.start();
    }

    public start() {
        this.activeObjective = Application.objectives[0];
        this.activeObjective.start();
    }
}

Application.loadApplication(); // Application starts here