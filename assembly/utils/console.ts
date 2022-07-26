declare function log(s: string): void;

export class console {
    constructor() {}

    static log(s: string): void {
        log(s);
    }
}