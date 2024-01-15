import { JSON } from "json-as";
// import { Position } from "@steerprotocol/strategy-utils/assembly";
import { Position } from "./types";

// NOTE: Trigger functions return true when action should be taken, if false then the strategy can return 'continue' to skip exeuction
// Implementation might look like the following:
  // const trigger = getTriggerStyle(configJson.triggerStyle)
  // const triggerObj = new TriggerConfigHelper(configJson.triggerWhenOver, configJson.tickPriceTrigger, configJson.percentageOfPositionRangeToTrigger, configJson.tickDistanceFromCenter, configJson.elapsedTendTime)
  // if (!shouldTriggerExecution(trigger, triggerObj, _positions, _currentTick, _timeSinceLastExecution)) return 'continue'

// Gets active range from the output of LM.getPositions()
// export function parseActiveRange(_positions: string): Position {
//     // _positions will be '[[#,#,#],[#,#,#],[#,#,#]]' presumably. lower, upper, weight
//     // clean up our list by removing spaces and brackets
//     let positions = _positions.replaceAll(' ','');
//     positions = positions.replaceAll('[','');
//     let rangeArray = positions.split(']',2);
//     let startTick = rangeArray[0].split(',')[0];
//     let endRange = rangeArray[1].split(']',2);
//     const endTicks = endRange[0].split(',');
//     let endTick = endTicks[endTicks.length-1]
//     // if trailing comma
//     if (endTick == '') endTick = endTicks[endTicks.length-2]
//     const strArrays = [startTick, endTick];
//     // check null
//     if (strArrays[0] == '' || strArrays[0] == null || strArrays[1] == '' || strArrays[1] == null) {
//         return new Position(0, 0, 0);
//     }
//     // else return normal
//     const lowerTick = i32(parseInt(strArrays[0]));
//     const upperTick = i32(parseInt(strArrays[1]));
//     // weights shouldn't matter in this context, we just want the total active range
//     return new Position(lowerTick, upperTick, 100);
// }

export function parseActiveRange(_positions: Array<Position>): Position {

    if (_positions.length == 0) return new Position(0, 0, 0);
    // get first pos start tick and last pos end
    let startTick = _positions[0].startTick
    let endTick = _positions[_positions.length - 1].endTick

    // weights shouldn't matter in this context, we just want the total active range
    return new Position(startTick, endTick, 100);
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
  // return JSON.stringify(currentPosition)
    if (emptyCurrentPosition(currentPosition)) return true

    return (!((currentTick <= currentPosition.endTick && currentTick >= currentPosition.startTick)))
}

// when tick goes over or under specified tick, trigger rebalance
// export function triggerFromSpecifiedPrice(triggerTick: i64, currentTick: i64, triggerOver: boolean): boolean {
//     // if trigger over, return true when currentTick > triggerTick
//     if (triggerOver) {
//         return currentTick > triggerTick
//     }
//     // trigger under, if current price is less than trigger tick return true
//     return triggerTick > currentTick
// }

// when tick goes over or under current positions, trigger rebalance, only moves one way
export function triggerPricePastPositions(currentPosition: Position, currentTick: i64, triggerOver: boolean): boolean {
    if (emptyCurrentPosition(currentPosition)) return true
    if (triggerOver) {
        // if the currentTick is over the endTick, rebal
        return currentTick > i64(currentPosition.endTick)
    }
    // if current tick is under start tick
    return currentTick < i64(currentPosition.startTick)
}

export const enum TriggerStyle {
    DistanceFromCenterOfPositions,
    PercentageChangeFromPositionRange,
    PositionsInactive,
    // SpecificPrice,
    PricePastPositions,
    None,
}

// export function TriggerStyleLookup(triggerStyle: TriggerStyle): string {
//     switch (triggerStyle) {
//         case TriggerStyle.DistanceFromCenterOfPositions:
//             return "Distance from center of position(s)";
//         case TriggerStyle.PercentageChangeFromPositionRange:
//             return "Percentage of position(s)";
//         case TriggerStyle.PositionsInactive:
//             return "Positions Inactive";
//         // case TriggerStyle.SpecificPrice:
//         //     return "Specific Price";
//         case TriggerStyle.PricePastPositions:
//             return "Price moved past position(s)";
//         case TriggerStyle.None:
//           return 'None'

//     default:
//         throw new Error(`Unknown trigger style: ${triggerStyle}`);
//     }
// }

// export class DistanceFromCenterOfPositionsOptions {
//     tickDistanceFromCenter: i64 = 0;
//     requiredDataTypes: string[] = ['Liquidity Manager Positions', 'V3 Pool Current Tick'];
// }

// export class PercentageChangeFromPositionRangeOptions {
//     percentageOfPositionRangeToTrigger: f64 = 0.0;
//     requiredDataTypes: string[] = ['Liquidity Manager Positions', 'V3 Pool Current Tick'];
// }

// export class PositionsInactiveOptions {
//     requiredDataTypes: string[] = ['Liquidity Manager Positions', 'V3 Pool Current Tick'];
// }

// export class SpecificPriceOptions {
//     tickPriceTrigger: i64 = 0;
//     triggerWhenOver: boolean = false;
//     requiredDataTypes: string[] = ['V3 Pool Current Tick'];
// }

// export class PricePastPositionsOptions {
//     triggerWhenOver: boolean = false;
//     requiredDataTypes: string[] = ['Liquidity Manager Positions', 'V3 Pool Current Tick'];
// }

// @ts-ignore
@json
export class TriggerConfigHelper {
    // triggerType: string = "Price leaves active range";
    triggerWhenOver: boolean = false;
    tickPriceTrigger: i64 = 0;
    percentageOfPositionRangeToTrigger: f64 = 0.0;
    tickDistanceFromCenter: i64 = 0;
    elapsedTendTime: i64 = 0;
    constructor( t: boolean, tpt: i64, poptrr:f64, tdfc: i64, ett: i64) {
      if(t) this.triggerWhenOver = t
      if(tpt) this.tickPriceTrigger = tpt
      if(poptrr) this.percentageOfPositionRangeToTrigger = poptrr
      if(tdfc) this.tickDistanceFromCenter = tdfc
      if(ett) this.elapsedTendTime = ett
    }
}

export function getTriggerExpectedDataTypes(triggerStyle: string): string[] {
  // get tirggerStyle
  const style = getTriggerStyle(triggerStyle)
  // currently we use only this list
  const typicalTypes = ["Liquidity Manager Positions", "V3 Pool Current Tick", "Time Since Last Execution"]
    switch (style) {
        case TriggerStyle.DistanceFromCenterOfPositions:
            return typicalTypes;
        case TriggerStyle.PercentageChangeFromPositionRange:
          return typicalTypes;
        case TriggerStyle.PositionsInactive:
          return typicalTypes;
        // case TriggerStyle.SpecificPrice:
        //     return "Specific Price";
        case TriggerStyle.PricePastPositions:
          return typicalTypes;
        case TriggerStyle.None:
          // return no data connectors for none
          return [];

    default:
        throw new Error(`Unknown trigger style: ${triggerStyle}`);
    }
}

// currently implemented as :: ulm positions [0], current tick [1], time since last execution [2]
// as more types are added this logic path with be redone
export function shouldTriggerExecution(
  _triggerStyle: string, 
  triggerOptions: TriggerConfigHelper, 
  dataConnector1: Array<Position>, 
  dataConnector2: i64, 
  dataConnector3: i64) : boolean {

    // possible dc inputs
    let currentPositionRange: Position;
    let currentTick: i64;
    const triggerStyle = getTriggerStyle(_triggerStyle)



    let timeSinceLastExecution: i64;

    switch (triggerStyle) {
        case TriggerStyle.DistanceFromCenterOfPositions:
            // parse ulm positions [0], current tick [1]
                  // @ts-ignore
            timeSinceLastExecution = i64((dataConnector3))
            if (timeSinceLastExecution >= i64(triggerOptions.elapsedTendTime)) return true
            currentPositionRange = parseActiveRange(dataConnector1)
            currentTick = i64((dataConnector2))
            return triggerFromDistance(currentPositionRange, triggerOptions.tickDistanceFromCenter, currentTick)

        case TriggerStyle.PercentageChangeFromPositionRange:
            // parse ulm positions [0], current tick [1]
            timeSinceLastExecution = i64((dataConnector3))
            if (timeSinceLastExecution >= i64(triggerOptions.elapsedTendTime)) return true
            currentPositionRange= parseActiveRange(dataConnector1)
            currentTick = i64((dataConnector2))
            return triggerFromPercentage(currentPositionRange, triggerOptions.percentageOfPositionRangeToTrigger, currentTick)

        case TriggerStyle.PositionsInactive:
            // parse ulm positions [0], current tick [1]
            timeSinceLastExecution = i64((dataConnector3))
            if (timeSinceLastExecution >= i64(triggerOptions.elapsedTendTime)) return true
            currentPositionRange = parseActiveRange(dataConnector1)
            currentTick = i64((dataConnector2))
            return triggerPositionsInactive(currentPositionRange, currentTick)

        case TriggerStyle.PricePastPositions:
            // parse ulm positions [0], current tick [1]
            timeSinceLastExecution = i64((dataConnector3))
            if (timeSinceLastExecution >= i64(triggerOptions.elapsedTendTime)) return true
            currentPositionRange = parseActiveRange(dataConnector1)
            currentTick = i64((dataConnector2))
            return triggerPricePastPositions(currentPositionRange, currentTick,  triggerOptions.triggerWhenOver)
        default:
            return true
    }
}

export function getTriggerStyle(trigger: string): TriggerStyle {
  if (trigger === 'Price Gap Trigger') {
      return TriggerStyle.DistanceFromCenterOfPositions;
  } else if (trigger === 'Range Inactive Trigger') {
      return TriggerStyle.PositionsInactive;
  } else if (trigger === 'Price Percentage Drift Trigger') {
      return TriggerStyle.PercentageChangeFromPositionRange;
  } else if (trigger === 'One-Way Range Exit Trigger') {
      return TriggerStyle.PricePastPositions;
  } else {
      return TriggerStyle.None;
  }
}

function getTriggerName(trigger: TriggerStyle): string {
  if (trigger === TriggerStyle.DistanceFromCenterOfPositions) {
      return 'Price Gap Trigger';
  } else if (trigger === TriggerStyle.PositionsInactive) {
      return 'Range Inactive Trigger';
  } else if (trigger === TriggerStyle.PercentageChangeFromPositionRange) {
      return 'Price Percentage Drift Trigger';
  } else if (trigger === TriggerStyle.PricePastPositions) {
      return 'One-Way Range Exit Trigger';
  } else {
      return 'None';
  }
}

  function expectedDataTypesHelper(strategyDataConnectors: string[], triggerStyle: string): string[] {
    // const style = getTriggerStyle(triggerStyle)
    return strategyDataConnectors.concat(getTriggerExpectedDataTypes(triggerStyle))
    // return `"expectedDataTypes": {
    //   "hidden": true,
    //   "type": "string",
    //   "default": "${(fullDataTypes).toString()}",
    //   "const": "${(fullDataTypes).toString()}"
    // }`
  }

  // @serializable
  // export class TriggerInfo {
  //   name: string = '';
  //   expectedDataTypes: string[] = [];
  //   constructor (_name: string, _expectedDataTypes: string[]) {
  //     this.name = _name
  //     this.expectedDataTypes = _expectedDataTypes
  //   }
  // }

export function triggerPropertyHelper(): string {
// export function triggerPropertyHelper(strategyDataTypes: string[], omit: TriggerStyle[] = []): string {
    // const triggerList = [
    //     TriggerStyle.DistanceFromCenterOfPositions,
    //     TriggerStyle.None,
    //     TriggerStyle.PercentageChangeFromPositionRange,
    //     TriggerStyle.PositionsInactive,
    //     TriggerStyle.PricePastPositions,
    // ];

    const triggersObjects: string[] = [
      'Current Price set distance from center of positions',
      'Price leaves active range', 
      'Price moves percentage of active range away', 
      'Price moves one way past positions', 
      'None',
    ];

    const triggerStrings = [
      'Current Price set distance from center of positions',
      'Price leaves active range',
      'Price moves percentage of active range away',
      'Price moves one way past positions',
      'None'
    ]

    // return `"triggerStyle": {
    //   "enumNames": ${JSON.stringify(triggerStrings)},
    //   "enum": ${JSON.stringify(triggersObjects)},
    //   "type": "string",
    //   "title": "Logic to trigger new positions",
    //   "default": "None"
    // }`;

    return `"triggerStyle": {
      "enumNames": [
          "Trigger when price moves set distance away from center of liquidity range",
          "Trigger when price leaves active liquidity range",
          "Trigger when price moves a proportion of active liquidity range away",
          "Trigger when price moves out of active range only in one direction",
          "None"
      ],
      "enum": [
        "Current Price set distance from center of positions",
        "Price leaves active range", 
        "Price moves percentage of active range away", 
        "Price moves one way past positions", 
        "None"
      ],
      "type": "string",
      "title": "Logic to trigger new positions",
      "default": "None"
  }`
  }

  export function configDefinitions(): string {
    return `
    "elapsedTendTime": {
        "type": "number",
        "title": "Max time between tends",
        "description": "If trigger conditions have not been met for this period of time, the strategy will execute regardless of trigger logic to update vault accounting.",
        "default": 1209600
    },
    "bins": {
        "type": "number",
        "title": "Positions",
        "description": "The max number of positions the strategy will make to achieve the desired curve.",
        "detailedDescription": "The strategy will attempt to make this number of positions, but can be limited by available range and pool spacing"
    },
    "reflect": {
        "title": "Reflect Curve Over Y-Axis",
        "type": "boolean",
        "default": false
    },
    "invert": {
        "title": "Invert Curve Over X-Axis",
        "type": "boolean",
        "default": false
    }`
  }

  export function triggerDependency(): string {
    return `"triggerStyle": {
      "oneOf": [
          {
              "properties": {
                  "triggerStyle": {
                      "const": "None"
                  }
              },
              "required": []
          },
          {
              "properties": {
                  "triggerStyle": {
                      "const": "Current Price set distance from center of positions"
                  },
                  "tickDistanceFromCenter": {
                      "type": "integer",
                      "title": "Tick Distance",
                      "description": "The number of basis points (ticks) away from the central price of existing positions",
                      "detailedDescription": "The trigger mechanism for new positions is based on a fixed number of ticks from the midpoint of the active range. For instance, with a position range of 0-100 and a tick distance set at 75, the trigger points are calculated 75 ticks on either side of the central tick of our positions, which is 50. This establishes a trigger range extending from -25 to 125. Any current tick falling within this range will not prompt execution. The center of this trigger range is dynamically adjusted based on the locations of future positions."
                  },
                  "elapsedTendTime": {
                       "$ref": "#/definitions/elapsedTendTime"
                  }
              },
              "required": [
                  "tickDistanceFromCenter",
                  "elapsedTendTime"
              ]
          },
          {
              "properties": {
                  "triggerStyle": {
                      "const": "Price leaves active range"
                  },
                  "elapsedTendTime": {
                       "$ref": "#/definitions/elapsedTendTime"
                  }
              },
              "required": [
                  "elapsedTendTime"
              ]
          },
          {
              "properties": {
                  "triggerStyle": {
                      "const": "Price moves percentage of active range away"
                  },
                  "percentageOfPositionRangeToTrigger": {
                      "type": "number",
                      "title": "Percentage of Range",
                      "description": "Specify the percentage of the total range at which to initiate new positions, where 100% or a value of 1 corresponds to the edge of the range.",
                      "detailedDescription": "For a position with a range spanning from 0 to 100 ticks, setting this value to 1 will activate the trigger at the outermost bounds of the range. If the value is set to 0.5, the trigger range narrows to between 25 and 75 ticks. Conversely, setting the value to 2 expands the trigger range, extending it from -50 to 150 ticks."
                  },
                  "elapsedTendTime": {
                       "$ref": "#/definitions/elapsedTendTime"
                  }
              },
              "required": [
                  "percentageOfPositionRangeToTrigger",
                  "elapsedTendTime"
              ]
          },
          {
              "properties": {
                  "triggerStyle": {
                      "const": "Price moves one way past positions"
                  },
                  "triggerWhenOver": {
                      "type": "boolean",
                      "title": "Price Moves Higher",
                      "description": "Set 'True' to initiate new positions when the current price (tick) exceeds the level of existing positions. Conversely, mark it as 'False' if new positions should be established when the price is lower than the current positions.",
                      "detailedDescription": "When the existing position spans from 0 to 100 ticks, setting the parameter to 'True' will prompt the strategy to execute only if the current tick exceeds 100. In any scenario where the current tick is less than or equal to 100, the strategy will recommend to continue without executing new execution."
                  },
                  "elapsedTendTime": {
                       "$ref": "#/definitions/elapsedTendTime"
                  }
              },
              "required": [
                  "triggerWhenOver",
                  "elapsedTendTime"
              ]
          }
      ]
  }`
  }

  export function allOfTrigger(): string {
    return `{
    "if": {
      "properties": {
        "triggerStyle": {
          "const": "None"
        }
      }
    },
    "then": {
      "required": []
    }
  },
  {
    "if": {
      "properties": {
        "triggerStyle": {
          "const": "Current Price set distance from center of positions"
        }
      }
    },
    "then": {
      "properties": {
        "tickDistanceFromCenter": {
            "type": "integer",
            "title": "Tick Distance",
            "description": "The number of ticks (basis points) from center price of positions to trigger setting new positions",
            "detailedDescription": "The static number of ticks from the center of the active range to trigger: if our position goes from 0-100, and we have a tick distance of 75, we will go out 75 ticks both ways from the center of our positions (50). This means we will skip execution only if the current tick is between -25 and 125. Future positions will determine where the center of the trigger range is located."
        },
        "elapsedTendTime": {
          "type": "number",
          "title": "Max time between tends",
          "description": "If trigger conditions have not been met for this period of time, the strategy will execute regardless of trigger logic to update vault accounting.",
          "default": 1209600
        }
      },
      "required": ["tickDistanceFromCenter", "elapsedTendTime"]
    }
  },
  {
    "if": {
      "properties": {
        "triggerStyle": {
          "const": "Price leaves active range"
        }
      }
    },
    "then": {
      "properties": {
        "elapsedTendTime": {
          "type": "number",
          "title": "Max time between tends",
          "description": "If trigger conditions have not been met for this period of time, the strategy will execute regardless of trigger logic to update vault accounting.",
          "default": 1209600
        }
      },
      "required": ["elapsedTendTime"]
    }
  },
  {
    "if": {
      "properties": {
        "triggerStyle": {
          "const": "Price moves percentage of active range away"
        }
      }
    },
    "then": {
      "properties": {
        "percentageOfPositionRangeToTrigger": {
            "type": "number",
            "title": "Percentage of Range",
            "description": "The percentage of the range away to trigger new positions, 100% or 1 would be at the bounds of the range",
            "detailedDescription": "If you have a simple position ranging from ticks 0 - 100, and you set this value to 1, the trigger range will be the outer bounds. Using 0.5 would make the trigger range 25-75, 2 would make the range -50 - 150."
        },
        "elapsedTendTime": {
          "type": "number",
          "title": "Max time between tends",
          "description": "If trigger conditions have not been met for this period of time, the strategy will execute regardless of trigger logic to update vault accounting.",
          "default": 1209600
        }
      },
      "required": ["percentageOfPositionRangeToTrigger", "elapsedTendTime"]
    }
  },
  {
    "if": {
      "properties": {
        "triggerStyle": {
          "const": "Price moves one way past positions"
        }
      }
    },
    "then": {
      "properties": {
        "triggerWhenOver": {
            "type": "boolean",
            "title": "Price Moves Higher",
            "description": "True for if the strategy should set new positions when the price (tick) is higher than the current positions, false for lower",
            "detailedDescription": "If our current position ranges from ticks 0 - 100, true will make our bundle execute only when the current tick is higher. Any other case (current tick less than 100) will result in a continue recommendation."
        },
        "elapsedTendTime": {
          "type": "number",
          "title": "Max time between tends",
          "description": "If trigger conditions have not been met for this period of time, the strategy will execute regardless of trigger logic to update vault accounting.",
          "default": 1209600
        }
      },
      "required": ["triggerWhenOver", "elapsedTendTime"]
    }
  }`;
}
