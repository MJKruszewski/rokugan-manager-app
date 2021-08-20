import {RingEnum} from "@/domain/types/ring.type";

export type Opportunities = {
    [key in 'martial' | 'initiative' | 'downtime' | 'general']: Opportunity;
};
export type OpportunityParams = {
    price: number;
    extended: boolean;
    description: string;
};
export type Opportunity = {
    [key in 'common' | RingEnum] : OpportunityParams[] | never[]
}

export default {
    initiative: {
        common: [],
        air: [
            {
                price: 1,
                extended: false,
                description: 'On an Initiative check, assess one foe’s weakness. Learn one of their disadvantages of that foe’s choice.'
            },
        ],
        earth: [
            {
                price: 1,
                extended: false,
                description: 'On an Initiative check, choose another character’s disadvantage you know. They do not apply that disadvantage' +
                    'to their checks this scene.'
            },
        ],
        fire: [
            {
                price: 1,
                extended: false,
                description: 'On an Initiative check, use your focus instead of your vigilance for your initiative when surprised.'
            },
        ],
        water: [
            {
                price: 1,
                extended: false,
                description: 'On an Initiative check, assess the qualities of all terrain in the scene (see page 267).'
            },
        ],
        void: [
            {
                price: 1,
                extended: false,
                description: 'On an Initiative check, sense if there is an Otherworldly being in the scene.'
            },
        ],
    },
    martial: {
        common: [],
        air: [
            {
                price: 1,
                extended: false,
                description: 'Add a kept <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/black.png')+ '"/> set to an <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> result to your next Martial skill check.'
            },
            {
                price: 1,
                extended: true,
                description: 'During a Movement action check, up to 1 range band of any distance you move per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent this way may be ' +
                    'along a vertical surface'
            },
            {
                price: 2,
                extended: false,
                description: 'Increase the TN of the next Martial Arts [Ranged] check targeting you before the start of your next turn by 2.'
            },
        ],
        earth: [
            {
                price: 1,
                extended: false,
                description: 'During a Movement action, ignore one terrain quality (see page 267) of your choice'
            },
            {
                price: 1,
                extended: true,
                description: 'Reduce the severity of the next critical strike you suffer before the start of your next turn by 1 per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent ' +
                    'this way.'
            },
            {
                price: 2,
                extended: false,
                description: 'Do not apply one of your disadvantages to checks until the end of your next turn.'
            },
        ],
        fire: [
            {
                price: 1,
                extended: false,
                description: 'Choose another character in the scene; increase the TN of the next check they make before the end of their next ' +
                    'turn by 1 if it does not include you as a target.'
            },
            {
                price: 1,
                extended: true,
                description: 'During an Attack action check, increase the TN of the next check the target makes to resist a critical strike they ' +
                    'suffer before the start of your next turn by 1 per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent this way.'
            },
            {
                price: 2,
                extended: false,
                description: 'Other characters must receive 2 strife to choose you as the target of their Attack and Scheme actions until the ' +
                    'start of your next turn'
            },
        ],
        water: [
            {
                price: 1,
                extended: false,
                description: 'Remove 1 fatigue.'
            },
            {
                price: 1,
                extended: true,
                description: 'During an Attack action check, ignore 1 point of target’s physical resistance per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent this way.'
            },
            {
                price: 2,
                extended: false,
                description: 'Move 1 range band.'
            },
        ],
        void: [
            {
                price: 1,
                extended: false,
                description: 'During the next Attack action check you make before the end of your next turn, ignore one terrain quality (see ' +
                    'page 267) of your choice'
            },
            {
                price: 1,
                extended: true,
                description: 'During a Support action check, increase your Initiative value by 1 per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent this way.'
            },
            {
                price: 2,
                extended: false,
                description: 'Ignore the effects of one condition you are suffering until the end of your next turn.'
            },
        ],
    },
    downtime: {
        air: [
            {
                price: 1,
                extended: true,
                description: 'Learn a detail about one person in your company (such as an advantage or disadvantage of their choice) per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> ' +
                    'spent this way. You can learn only one detail about each person this way in a single downtime scene.'
            },
            {
                price: 2,
                extended: false,
                description: 'Perform your downtime activity without letting one or more others of your choice know that you did.'
            },
        ],
        earth: [
            {
                price: 1,
                extended: true,
                description: 'Another character in your company may remove 1 strife or fatigue per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent this way'
            },
            {
                price: 2,
                extended: false,
                description: 'Memorize a small but vital detail from to your activity; you can recall it later without a check'
            },
        ],
        fire: [
            {
                price: 1,
                extended: true,
                description: 'Assist one other character per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent this way with their next downtime activity check this session'
            },
            {
                price: 2,
                extended: false,
                description: 'Energize another character in your company with your efforts; they may perform 1 additional downtime action ' +
                    'this downtime (to a maximum of 2)'
            },
        ],
        water: [
            {
                price: 1,
                extended: true,
                description: 'Remove 1 strife or fatigue per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent this way'
            },
            {
                price: 2,
                extended: false,
                description: 'Make a new friend while undertaking your downtime activity'
            },
        ],
        void: [
            {
                price: 1,
                extended: true,
                description: 'Reserve 1 dropped die from your check, to a maximum of your ranks in the skill you used. Add that die to your ' +
                    'next check with the same skill as a kept die instead of rolling it'
            },
            {
                price: 2,
                extended: false,
                description: 'Have a brief premonition of a possible future event while undertaking your downtime activity.'
            },
        ],
    },
    general: {
        common: [
            {
                price: 1,
                extended: false,
                description: 'If you failed, determine the easiest way to accomplish the task you were attempting (skill and approach).'
            },
            {
                price: 1,
                extended: true,
                description: 'Remove 1 strife you gained from this check per <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> spent this way.'
            },
            {
                price: 2,
                extended: false,
                description: 'Provide assistance (see page 26) to the next character to attempt a check to accomplish something similar.'
            },
        ],
        air: [
            {
                price: 1,
                extended: false,
                description: 'Learn another character in the scene\'s demeanora (if an NPC) and current strife'
            },
            {
                price: 1,
                extended: true,
                description: 'Act subtly to attract minimal attention in your efforts. Extra <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> makes the attempt even subtler.'
            },
            {
                price: 2,
                extended: false,
                description: 'Notice an interesting detail about a character in the scene, such as an advantage or disadvantage. At the GM\'s discretion, you may establish a new detail for an NPC.'
            },
        ],
        earth: [
            {
                price: 1,
                extended: false,
                description: 'Reassure another character in the scene with your presence, allowing them to remove 2 strife.'
            },
            {
                price: 1,
                extended: true,
                description: 'Act carefully to minimize consequences of failure or other dangers that could arise from task. Extra <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> makes the attempt even safer.'
            },
            {
                price: 2,
                extended: false,
                description: 'Suddenly recall an important piece of information not directly related to task. At the GM\'s discretion, you may establish a small preparatory action you took earlier, such as bringing along a common useful item.'
            },
        ],
        fire: [
            {
                price: 1,
                extended: false,
                description: 'Inflame another character in the scene with your presence, causing them to receive 2 strife.'
            },
            {
                price: 1,
                extended: true,
                description: 'Perform the task in a flashy way, drawing attention to yourself. Extra <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> attracts even more notice.'
            },
            {
                price: 2,
                extended: false,
                description: 'Notice something missing or out of place in the victinity that is not directly related to the task. At the GM\'s discretion, you may establish an absence, such as a lack of shoes outside indicating the occupant\'s absence.'
            },
        ],
        water: [
            {
                price: 1,
                extended: false,
                description: 'Remove 2 strife from yourself'
            },
            {
                price: 1,
                extended: true,
                description: 'Perform the task efficiently, completing it more quickly or saving supplies. Extra <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> further reduces the time or materials expended'
            },
            {
                price: 2,
                extended: false,
                description: 'Spot an interesting physical detail present in your environment not directly related to your check. At the GM\'s discretion, you may establish a piece of terrain (see page 267) or a mundane object nearby.'
            },
        ],
        void: [
            {
                price: 1,
                extended: false,
                description: 'Chose a ring other than Void. Reduce TN of your next check by 1 if it uses that ring.'
            },
            {
                price: 1,
                extended: true,
                description: 'Feel a chill down your spine, notice a sudden silence, or detect another sign of the supernatural if there is a spiritual disturbance in the scene. Extra <img width="20px" v-bind:key="k + uuid.v4()" src="' + require('../../assets/img/dice/opportunity_red.png')+ '"/> gives an increasingly precise location for the supernatural occurrence'
            },
            {
                price: 2,
                extended: false,
                description: 'Gain spiritual insight into the nature of the universe or your own heart. At the GM’s discretion, you may establish a fact about your character that has not been previously revealed but relates to the situation.'
            },
        ]
    }
} as Opportunities;