export class Vec3 {
    constructor (public x: number, public y:number, public z:number) {

    }

    public distance(that: Vec3): number {
        return this.subtract(that).length();
    }

    public subtract(that: Vec3): Vec3 {
        return new Vec3(this.x - that.x, this.y - that.y, this.z - that.z);
    }

    public length(): number {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
    }
}