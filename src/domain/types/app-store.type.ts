import {MainRoll} from '@/domain/types/main-roll.type';
import {Player} from '@/domain/types/player.type';

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

export interface AppStore {
    colorVariant: boolean;
    textVariant: string;

    server: Server;

    mainRoll: MainRoll;
    player?: Player;
}