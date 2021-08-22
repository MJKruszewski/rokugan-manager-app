import {Dice} from '@/domain/types/dice.type';

export type MainRoll = {
    currentVersion: string;
    isDuringRoll: boolean,
    //reroll
    selectedAdversity: string | null;
    selectedAbility: string | null;
    selectedAnxiety: string | null;
    selectedDistinction: string | null;
    currentReroll: string | null;
    rerollStarted: boolean;
    selectedToRerollIds: string[];
    rerollLock: any[];

    dc: number | undefined;
    selectedRerollOption: string | null,
    selectedRerollReasonOption: string | null,
    selectedRerollOptionList: string[],
    isExplosionStarted: boolean;
    selectedIds: [];
    success: number;
    strife: number;
    voidPoints: number;
    opportunities: number;
    assistWhite: number;
    assistBlack: number;
    totalExplosions: number;
    selectedSkillValue: number;
    selectedRingValue: number;
    selectedSkill: string;
    selectedRing: string;
    wDices: Dice[];
    bDices: Dice[];
    wExplodedDices: Dice[];
    bExplodedDices: Dice[];
    explodedHelper: string[];
    voidDicesHelper: string[];
};
