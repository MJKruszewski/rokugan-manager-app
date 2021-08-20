import Vuex from "vuex";
import {AppStore} from "@/domain/types/app-store.type";
import {MainRoll} from "@/domain/types/main-roll.type";

const currentVersion = 'v6'
let store: LocalStore|undefined = undefined;

export class LocalStore extends Vuex.Store<AppStore> {
}


export function getStore(): LocalStore {
    if (store !== undefined && store.state?.player?.currentVersion === currentVersion) {
        return store;
    }
    // const player: Player = JSON.parse(localStorage.getItem('player') || '{}');
    const server: AppStore['server'] = JSON.parse(localStorage.getItem('server') || '{}');
    const appStore: AppStore = {
        colorVariant: true,
        textVariant: 'white',

        player: undefined,
        server: typeof server.host !== "undefined" && server.currentVersion === currentVersion ? server : {
            hostList: [

            ],
            currentVersion: currentVersion,
            host: 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvODY2MjY3NDI2NTMzNDA4NzY4L2Fub1RWTFhpYTctdDN6ZWxNaEcyRjE2Z25ITlI4V2ExMHZHV3Q4a2lIdEFfOGlLdWZfWHhkeHVFbG1NMTZsOFFyeDJf',
        } as AppStore['server'],

        mainRoll: {
            currentVersion: currentVersion,
            isDuringRoll: false,
            //reroll
            selectedAdversity: null,
            selectedAbility: null,
            selectedAnxiety: null,
            selectedDistinction: null,
            currentReroll: null,
            rerollStarted: false,
            selectedToRerollIds: [],
            rerollLock: [],

            //----
            dc: undefined,

            selectedRerollOption: null,
            selectedRerollReasonOption: null,
            selectedRerollOptionList: [],

            isExplosionStarted: false,
            selectedIds: [],
            success: 0,
            strife: 0,
            voidPoints: 0,
            opportunities: 0,
            assistWhite: 0,
            assistBlack: 0,
            totalExplosions: 0,
            selectedSkillValue: 3,
            selectedRingValue: 3,
            selectedSkill: "none",
            selectedRing: "none",
            wDices: [
                {id: '1', img: "white.png"},
                {id: '2', img: "white.png"},
                {id: '3', img: "white.png"},
            ],
            bDices: [
                {id: '4', img: "black.png"},
                {id: '5', img: "black.png"},
                {id: '6', img: "black.png"},
            ],
            wExplodedDices: [],
            bExplodedDices: [],
            explodedHelper: [],
            voidDicesHelper: [],
        } as MainRoll
    };

    store = new LocalStore({state: appStore});

    return store;
}