import { JSON } from 'json-as/assembly';

@serializable
export class Position {
    constructor(
        public startTick: i32,
        public endTick: i32,
        public weight: i32
    ) { }
}