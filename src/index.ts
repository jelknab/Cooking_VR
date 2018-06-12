import {Player} from "./Player";
import {AObjective} from "./objectives/AObjective";
import {Objective01_start} from "./objectives/Objective01_start";
import {Instruction} from "./helper_items/Instruction";
import {TextObjective} from "./objectives/TextObjective";
import {Objective02} from "./objectives/Objective02";

export class Application {
    static instance: Application;
    static objectives: AObjective[];

    static loadApplication() {
        // Make new application instance
        Application.instance = new Application();

        // Add objectives
        Application.objectives = [
            new Objective01_start(),    // Start button objective
            new TextObjective("Awesome!! Let's get started!", 2000),
            new Objective02(),          // Pan pickup objective
        ];

        // Start first objective
        Application.instance.start();
    }

    private activeObjective: AObjective;

    // Globally needed items
    public world: HTMLElement;
    public player: Player;
    public instruction: Instruction;

    constructor() {
        this.world = document.getElementById('scene');
        this.player = new Player('camera');
        this.instruction = new Instruction('instructions');
    }

    public progressObjective() {
        this.activeObjective.finish();
        this.activeObjective = Application.objectives[Application.objectives.indexOf(this.activeObjective) + 1];
        this.activeObjective.start();
    }

    public start() {
        this.activeObjective = Application.objectives[1];
        this.activeObjective.start();
    }
}

Application.loadApplication(); // Application starts here