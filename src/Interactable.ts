export abstract class Interactable {
    public html: HTMLElement;

    protected constructor (private id: string) {
        this.html = <HTMLElement>document.getElementById(id);

        if (this.html == null) {
            throw new Error(`Failed to get element with id: '${id}'.`);
        }

        this.html.addEventListener("click", () => {
            this.interact();
        });
    }

    abstract interact(): void;

    // Called when item is picked up by user
    onPlayerPickup() {
        console.log(`Warning ${this.id} has no specific pickup functionality.`);
    }

    // Called when item is dropped by player
    onPlayerSetDown() {
        console.log(`Warning ${this.id} has no specific setDown functionality.`);
    }
}