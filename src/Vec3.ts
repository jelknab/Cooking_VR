export class Vec3 {
    constructor (public x: number, public y:number, public z:number) {

    }

    public multiplyNum(x: number): Vec3 {
        return new Vec3(this.x * x, this.y * x, this.z * x);
    }

    public multiply(other: Vec3): Vec3 {
        return new Vec3(this.x * other.x, this.y * other.y, this.z * other.z);
    }

    public divideNum(x: number): Vec3 {
        return new Vec3(this.x / x, this.y / x, this.z / x);
    }

    public add(that: Vec3) {
        return new Vec3(this.x + that.x, this.y + that.y, this.z + that.z);
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

    public getNormalized() {
        const length = this.length();

        return new Vec3(this.x / length, this.y / length, this.z / length);
    }

    public toString() {
        return `${this.x} ${this.y} ${this.z}`;
    }
}