import { Position } from "./types";

// NOTE: Trigger functions return true when action should be taken, if false then the strategy can return 'continue' to skip exeuction

// Gets active range from the output of LM.getPositions()
export function parsePositions(_positions: string): Position {
    // _positions will be '[[#,#,#],[#,#,#],[#,#,#]]' presumably. lower, upper, weight
    // clean up our list by removing spaces and brackets
    let positions = _positions.replaceAll(' ','');
    positions = positions.replaceAll('[','');
    let rangeArray = positions.split(']',2);
    let startTick = rangeArray[0].split(',')[0];
    let endRange = rangeArray[1].split(']',2);
    const endTicks = endRange[0].split(',');
    let endTick = endTicks[endTicks.length-1]
    // if trailing comma
    if (endTick == '') endTick = endTicks[endTicks.length-2]
    const strArrays = [startTick, endTick];
    // check null
    if (strArrays[0] == '' || strArrays[0] == null || strArrays[1] == '' || strArrays[1] == null) {
        return new Position(0, 0, 0);
    }
    // else return normal
    const lowerTick = i32(parseInt(strArrays[0]));
    const upperTick = i32(parseInt(strArrays[1]));
    // weights shouldn't matter in this context, we just want the total active range
    return new Position(lowerTick, upperTick, 100);
}

export function emptyCurrentPosition(currentPosition: Position): boolean {
    // return true if current position ticks are not the same
    return currentPosition.startTick == currentPosition.endTick
}

// where rebalance width is how far off on either side the trigger should activate
export function triggerFromDistance(currentPosition: Position, rebalanceWidth: i64, currentTick: i64): boolean {
    if (emptyCurrentPosition(currentPosition)) return true
    const centerPosition = (currentPosition.endTick + currentPosition.startTick) / 2
    const upperTrigger = centerPosition + (rebalanceWidth)
    const lowerTrigger = centerPosition - (rebalanceWidth)
    // In bounds? return false to continue (skip exec), returns true to execute
    return !((currentTick <= upperTrigger && currentTick >= lowerTrigger))
}

// tick moves % away from center of position range
export function triggerFromPercentage(currentPosition: Position, rebalancePercentage: f64, currentTick: i64): boolean {
    if (emptyCurrentPosition(currentPosition)) return true
    const side = (currentPosition.endTick - currentPosition.startTick) / 2
    const centerPosition = (currentPosition.endTick + currentPosition.startTick) / 2
    const triggerDiff = i64(Math.round(f64(side) * rebalancePercentage))
    const upperTrigger = centerPosition + triggerDiff
    const lowerTrigger = centerPosition - triggerDiff
    // In bounds? return false to continue (skip exec), returns true to execute
    return !((currentTick <= upperTrigger && currentTick >= lowerTrigger))
}

// when current tick is no longer in the current position range
export function triggerPositionsInactive(currentPosition: Position, currentTick: i64): boolean {
    if (emptyCurrentPosition(currentPosition)) return true
    return !((currentTick <= currentPosition.endTick && currentTick >= currentPosition.startTick))
}

// when tick goes over or under specified tick, trigger rebalance
export function triggerFromSpecifiedPrice(triggerTick: i64, currentTick: i64, triggerOver: boolean): boolean {
    // if trigger over, return true when currentTick > triggerTick
    if (triggerOver) {
        return currentTick > triggerTick
    }
    // trigger under, if current price is less than trigger tick return true
    return triggerTick > currentTick
}

// when tick goes over or under current positions, trigger rebalance, only moves one way
export function triggerPricePastPositions(currentPosition: Position, currentTick: i64, triggerOver: boolean): boolean {
    if (emptyCurrentPosition(currentPosition)) return true
    if (triggerOver) {
        // if the currentTick is over the endTick, rebal
        return currentTick > currentPosition.endTick
    }
    // if current tick is under start tick
    return currentTick < currentPosition.startTick
}
