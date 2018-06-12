import {Player} from "./Player";
import {AObjective} from "./objectives/AObjective";
import {Instruction} from "./helper_items/Instruction";
import {TextObjective} from "./objectives/TextObjective";
import {Marker} from "./helper_items/Marker";
import * as objectives from "./objectives/index";

export class Application {
    static instance: Application;
    static objectives: AObjective[];

    static loadApplication() {
        // Make new application instance
        Application.instance = new Application();

        // Add objectives
        Application.objectives = [
            new objectives.Objective01_start(),     // Start button objective
            new TextObjective("Awesome!! Let's get started!", 2000),
            new TextObjective("We're going to start\nby making the sauce.", 2000),
            new objectives.Objective02(),           // Pan pickup objective
            new objectives.Objective02_A(),         // Pan drop objective
        ];

        // Start first objective
        Application.instance.start();
    }

    private activeObjective: AObjective;

    // Globally needed items
    public world: HTMLElement;
    public player: Player;
    public instruction: Instruction;
    public marker: Marker;

    constructor() {
        this.world = document.getElementById('scene');
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
        this.activeObjective = Application.objectives[2];
        this.activeObjective.start();
    }
}

Application.loadApplication(); // Application starts here