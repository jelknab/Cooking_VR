import {Vec3} from "../Vec3";
import {Application} from "../index";
import {Animation} from "./Animation";

export class AframeObject {
    public constructor (
        public id: string,
        public html?: HTMLElement
    ) {
        if (this.html == null) {
            this.html = <HTMLElement>document.getElementById(this.id);

            if (this.html == null) {
                const error = new Error(`Failed to get element with id: '${this.id}'.`);
                console.log(error.stack);
                throw error;
            }
        }
    }

    public moveTo(to: Vec3, duration: number = 500, after?: any) {
        new Animation(
            { 'dur': String(duration), 'attribute': 'position', 'to': to.toString()},
            this,
            () => {if (after) after();}
        ).play();
    }

    public rotateTo(to: Vec3, duration: number = 500, after?: any) {
        new Animation(
            { 'dur': String(duration), 'attribute': 'rotation', 'to': to.toString()},
            this,
            () => {if (after) after();}
        ).play();
    }

    public getPosition(): Vec3 {
        const attr = (<any>this.html).object3D.position;

        return new Vec3(attr.x, attr.y, attr.z);
    }

    public setPosition(position: Vec3) {
        // (<any>this.html).object3D.position.set(position.x, position.y, position.z);
        this.moveTo(position, 200);
    }

    public setPositionStr(position: string) {
        this.html.setAttribute('position', position);
    }

    public getRotation(): Vec3 {
        const attr = (<any>this.html).object3D.rotation;

        return new Vec3(attr.x, attr.y, attr.z);
    }

    public setRotation(rotation: Vec3) {
        // (<any>this.html).object3D.rotation.set(rotation.x * 0.01745, rotation.y * 0.01745, rotation.z * 0.01745);
        this.rotateTo(rotation, 200);
    }

    public parentTo(other: AframeObject) {
        if (other == null) {
            Application.instance.world.html.appendChild(this.html);
            return;
        }

        other.html.appendChild(this.html);
    }

    public remove() {
        this.html.parentElement.removeChild(this.html);
    }

    public mark() {
        Application.instance.marker.showAt(this.getPosition());
    }

    public hide() {
        this.html.setAttribute('visible', 'false');
    }

    public show() {
        this.html.setAttribute('visible', 'true');
    }
}