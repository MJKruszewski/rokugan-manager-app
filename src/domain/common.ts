import {getStore} from '@/domain/services/store';
import {Ring} from '@/domain/types/ring.type';
import {Skill} from '@/domain/types/skill.type';

export function getWhiteImage(val: number): string {
    switch (val) {
        case 1:
            return 'white.png';
        case 2:
            return 'whitee.png';
        case 3:
            return 'whiteet.png';
        case 4:
            return 'whiteo.png';
        case 5:
            return 'whites.png';
        case 6:
            return 'whiteso.png';
        case 7:
            return 'whitest.png';
        case 8:
            return 'whiteeo.png';
    } 

    return '';
}

export function sendNotifications(): boolean {
    const value = localStorage.getItem('notifications') || 'true';

    return value === 'true';
}

export function getBlackImage(val: number): string {
    switch (val) {
        case 1:
            return 'black.png';
        case 2:
            return 'blacket.png';
        case 3:
            return 'blacko.png';
        case 4:
            return 'blackot.png';
        case 5:
            return 'blacks.png';
        case 6:
            return 'blackst.png';
    }

    return '';
}

export function getClanMon(clan: string): any {
    switch (clan) {
        case 'Crab':
            return require('../assets/img/mon/crab.webp');
        case 'Crane':
            return require('../assets/img/mon/crane.webp');
        case 'Dragon':
            return require('../assets/img/mon/dragon.webp');
        case 'Lion':
            return require('../assets/img/mon/lion.png');
        case 'Phoenix':
            return require('../assets/img/mon/phoenix.webp');
        case 'Scorpion':
            return require('../assets/img/mon/scorpion.webp');
        case 'Unicorn':
            return require('../assets/img/mon/unicorn.webp');
    }

    return require('../assets/img/mon/emperor.webp');
}

export function getClanColor(clan: string): string {
    switch (clan) {
        case 'Lion':
            return '#cb9e2b';
        case 'Crane':
            return '#81b9f8';
        case 'Scorpion':
            return '#a4262b';
        case 'Unicorn':
            return '#754294';
        case 'Dragon':
            return '#28bf25';
        case 'Phoenix':
            return '#ff0000';
        case 'Crab':
            return '#0163b1';
    }

    return '#696969';
}

export function getStanceTooltip(stance: string): string {
    switch (stance) {
        case 'air':
            return '+1 to TN of Attack and Scheme checks targeting you (+2 at rank 4+).';
        case 'fire':
            return 'If you succeed, +1 bonus success per strife-symbol';
        case 'earth':
            return 'Others cannot spend opportunity to inflict critical strikes or conditions on you.';
        case 'water':
            return 'Perform a second action on your turn that does not require a check or share a type with your first action.';
        case 'void':
            return 'You do not receive strife from strife-symbols on checks';
    }

    return '';
}

export function getExplosions(): string[] {
    return ['blacket.png', 'whitee.png', 'whiteet.png', 'whiteeo.png'];
}

export function getHook(): string {
    return getStore().state.server.host;
}

export function getBaseSkills(): Skill[] {
    return [
        {'name': 'Aesthetics', 'value': '0', 'group': 'Artisan skills'},
        {'name': 'Composition', 'value': '0', 'group': 'Artisan skills'},
        {'name': 'Design', 'value': '0', 'group': 'Artisan skills'},
        {'name': 'Smithing', 'value': '0', 'group': 'Artisan skills'},
        {'name': 'Command', 'value': '0', 'group': 'Social skills'},
        {'name': 'Courtesy', 'value': '0', 'group': 'Social skills'},
        {'name': 'Games', 'value': '0', 'group': 'Social skills'},
        {'name': 'Performance', 'value': '0', 'group': 'Social skills'},
        {'name': 'Culture', 'value': '0', 'group': 'Scholar skills'},
        {'name': 'Government', 'value': '0', 'group': 'Scholar skills'},
        {'name': 'Medicine', 'value': '0', 'group': 'Scholar skills'},
        {'name': 'Sentiment', 'value': '0', 'group': 'Scholar skills'},
        {'name': 'Theology', 'value': '0', 'group': 'Scholar skills'},
        {'name': 'Fitness', 'value': '0', 'group': 'Martial skills'},
        {'name': 'Martial Arts [Melee]', 'value': '0', 'group': 'Martial skills'},
        {'name': 'Martial Arts [Ranged]', 'value': '0', 'group': 'Martial skills'},
        {'name': 'Martial Arts [Unarmed]', 'value': '0', 'group': 'Martial skills'},
        {'name': 'Meditation', 'value': '0', 'group': 'Martial skills'},
        {'name': 'Tactics', 'value': '0', 'group': 'Martial skills'},
        {'name': 'Commerce', 'value': '0', 'group': 'Trade skills'},
        {'name': 'Labor', 'value': '0', 'group': 'Trade skills'},
        {'name': 'Seafaring', 'value': '0', 'group': 'Trade skills'},
        {'name': 'Skulduggery', 'value': '0', 'group': 'Trade skills'},
        {'name': 'Survival', 'value': '0', 'group': 'Trade skills'},
    ];
}

export function getRings(): Ring[] {
    return [
        {'name': 'Air', 'value': 1},
        {'name': 'Earth', 'value': 1},
        {'name': 'Fire',  'value': 1},
        {'name': 'Water',  'value': 1},
        {'name': 'Void', 'value': 1},
    ];
}

export function getRingDescription(ring: string): string {
    switch (ring.toLowerCase()) {
        case 'air':
            return 'Grace, eloquence or empathy';
        case 'earth':
            return 'Thoroughness, patience or calm';
        case 'fire':
            return 'Creativity, passion or drive';
        case 'water':
            return 'Adaptability, friendliness or awareness';
        case 'void':
            return 'Self-awareness, insight or mysticism';
    }

    return '';
}