import {MainRoll} from '@/domain/types/main-roll.type';
import {Player} from '@/domain/types/player.type';

export interface AppStore {
    colorVariant: boolean;
    textVariant: string;

    server: {
        hostList: {
           text: string;
           value: string;
        }[];
        currentVersion: string;
        host: string;
    };

    mainRoll: MainRoll;
    player?: Player;
}