import {Vec3} from "../Vec3";

export class AframeObject {
    public constructor (
        public id: string,
        public html?: HTMLElement
    ) {
        if (this.html == null) {
            this.html = <HTMLElement>document.getElementById(id);

            if (this.html == null) {
                throw new Error(`Failed to get element with id: '${id}'.`);
            }
        }
    }

    public getPosition(): Vec3 {
        const attr =  eval(this.html.getAttribute('position'));

        return new Vec3(attr.x, attr.y, attr.z);
    }

    public setPosition(position: Vec3) {
        this.html.setAttribute('position', `${position.x} ${position.y} ${position.z}`)
    }

    public setPositionStr(position: string) {
        this.html.setAttribute('position', position);
    }

    public getRotation(): Vec3 {
        const attr =  eval(this.html.getAttribute('rotation'));

        return new Vec3(attr.x, attr.y, attr.z);
    }

    public setRotation(rotation: Vec3) {
        this.html.setAttribute('rotation', `${rotation.x} ${rotation.y} ${rotation.z}`)
    }

    public parentTo(other: AframeObject) {
        other.html.appendChild(this.html);
    }
}