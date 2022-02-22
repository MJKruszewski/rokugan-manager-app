import {Skill} from '@/domain/types/skill.type';
import {Ring} from '@/domain/types/ring.type';

export interface Player {
    currentVersion: string;

    familyData: FamilyData;
    story: Story;
    portraitImage: string;

    social: Social;
    wealth: Wealth;
    experience: Experience;

    abilities: Ability[];
    bonds: Bond[];
    techniques: Technique[];

    anxieties: PersonalTrait[];
    adversities: PersonalTrait[];
    distinctions: PersonalTrait[];
    passions: PersonalTrait[];

    advances: Advance[];
    titles: string[];
    currentTitle: string | null;

    stats: Statistics;
    currentStats: CurrentStatistics;

    skills: Skill[];
    rings: Ring[];
    equipment: (Equipment | Armor | Weapon)[];

    isLoaded: boolean;

}

export interface Npc {
    id: string;
    name: string;
    demeanor: Demeanor;
    description: string;
    portraitImage: string;
    skills: {
        artisan: number;
        martial: number;
        scholar: number;
        social: number;
        trade: number;
    };
    rings: {
        air: number;
        fire: number;
        earth: number;
        water: number;
        void: number;
    };
    wealth: Wealth;
    social: Social;
    statistics: Statistics;
    advantages: Advantage[];
    disadvantages: Advantage[];
    abilities: NpcAbility[];
    weapons: NpcWeapon[];
    armors: NpcArmor[];
}

export type NpcWeapon = {
    name: string;
    range: {
        min: number;
        max: number;
    };
    damage: string;
    deadliness: string;
    reference: {
        book?: Book;
        page?: string;
    };
}

export type NpcArmor = {
    name: string;
    superRes: number;
    physRes: number;
    rarity: number;
    reference: {
        book?: Book;
        page?: string;
    };
}

export type Advantage = {
    name: string,
    skill: string,
    ring: string,
    types: string[]
}

export type Demeanor = {
    id: string;
    name: string;
    rings: {
        air: number;
        fire: number;
        earth: number;
        water: number;
        void: number;
    };
}

export type Advance = {
    type: string;
    name: string;
    kind: 'curriculum' | 'title' | 'none'
    cost: number
};

export type FamilyData = {
    name: string;
    mon: string;
    clan: string;
    school: string;
    heritage: string;
}

export type Story = {
    ninjo: string;
    giri: string;
    note: string;
}

export type Statistics = {
    endurance: number;
    composure: number;
    focus: number;
    vigilance: number;
}

export interface CurrentStatistics extends Statistics {
    voidPoints: number;
}

export type Experience = {
    totalXp: number;
    curriculumXp: number;
    titleXp: number;
}

export type Social = {
    glory: number;
    status: number;
    honor: number;
}
export type Wealth = {
    koku: number;
    bu: number;
    zeni: number;
}

export type Ability = {
    name: string;
    description: string;
    source: string;
    book: Book;
    page: string;
}

export type NpcAbility = {
    name: string;
    type: string;
    subtype: string;
    rank: number;
    reference: {
        book?: Book;
        page?: string;
    };
}

export type Bond = {
    name: string;
    ability: string;
    book: Book;
    page: string;
    rank: number;
    customValue?: string;
}

export type Technique = {
    name: string;
    desc: string;
    shortDesc: string;
    restriction: string;
    type: 'Kata' | 'Kih\u014d' | 'Invocations' | 'Rituals' | 'Sh\u016bji' | 'Mah\u014d' | 'Ninjutsu' | 'Signature Scrolls' | 'Astradhari Techniques' | 'Inversions' | 'Item Patterns';
    subtype: string;
    book: Book;
    page: string;
    rank: number;
}

export type PersonalTrait = {
    name: string;
    type: 'Distinctions' | 'Anxieties' | 'Passions' | 'Adversities';
    types: string;
    desc: string;
    shortDesc: string;
    ring: string;
    book: Book;
    page: string;
    customValue?: string;
}

export type Equipment = {
    name: string;
    kind: 'armor' | 'weapon' | 'other'
    type: string;
    rarity: number;
    desc: string;
    shortDesc: string;
    qualities: string;
    price: number;
    unit: 'koku' | 'bu' | 'zeni';
    book: Book;
    page: string;
}

export interface Armor extends Equipment {
    superRes: number;
    physRes: number;
}

export interface Weapon extends Equipment {
    grip: string;
    deadlines: number;
    skill: string;
    minRange: number;
    maxRange: number;
    category: string;
    damage: number;
}

export type Book = 'CR' | 'CoS' | 'Core' | 'DT' | 'EE' | 'FoV' | 'GMK' | 'Mantis' | 'PoW' | 'SL'