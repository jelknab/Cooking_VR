import {Player} from "./Player";
import {AObjective} from "./objectives/AObjective";
import {Instruction} from "./helper_items/Instruction";
import {TimeoutObjective} from "./objectives/generic/TimeoutObjective";
import {Marker} from "./helper_items/Marker";
import * as objectives from "./objectives/index";
import {AframeObject} from "./a-frame_wrappers/AframeObject";
import {ConfirmationObjective} from "./objectives/generic/ConfirmationObjective";

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
            new TimeoutObjective("We're going to start\nby making the sauce.", 2000),
            new objectives.Objective03(),           // Pan pickup objective
            new objectives.Objective03_A(),         // Pan drop objective
            new objectives.ObjectiveFinale(),       // User completed
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
        this.player = new Player('camera');
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