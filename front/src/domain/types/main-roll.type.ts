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
    selectedToRerollIds: any[];
    rerollLock: any[];

    dc: number | undefined;
    selectedRerollOption: string | null,
    selectedRerollReasonOption: string | null,
    selectedRerollOptionList: any[],
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
    wDices: {
        id: string;
        img: string;
    }[];
    bDices: {
        id: string;
        img: string;
    }[];
    wExplodedDices: any[];
    bExplodedDices: any[];
    explodedHelper: any[];
    voidDicesHelper: any[];
};
