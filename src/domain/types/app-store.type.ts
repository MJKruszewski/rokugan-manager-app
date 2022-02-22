import {MainRoll} from '@/domain/types/main-roll.type';
import {Npc, Player} from '@/domain/types/player.type';

export type Server = {
    hostList: {
        text: string;
        value: string;
    }[];
    currentVersion: string;
    host: string;
    bookFiles: {
        CR: string | null;
        CoS: string | null;
        Core: string | null;
        DT: string | null;
        EE: string | null;
        FoV: string | null;
        GMK: string | null;
        Mantis: string | null;
        PoW: string | null;
        SL: string | null;
    };
};

export type GmData = {
    players?: Player[];
    npcs?: Npc[];
}

export interface AppStore {
    colorVariant: boolean;
    textVariant: string;

    server: Server;

    gmData: GmData;

    mainRoll: MainRoll;
    player?: Player;
}