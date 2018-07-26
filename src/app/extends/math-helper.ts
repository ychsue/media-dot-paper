export class MathHelper {
    static colorToString(r: number, g: number, b: number, a: number = -1) {
        let rgba = ('0' + r.toString(16)).slice(-2)
        + ('0' + g.toString(16)).slice(-2)
        + ('0' + b.toString(16)).slice(-2);

        rgba = rgba + ((a < 0) ? '' : ('0' + (a * 255).toString(16)).slice(-2));

        return '#' + rgba;
    }
}
