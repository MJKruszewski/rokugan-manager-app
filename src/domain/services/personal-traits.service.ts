import traits from '../../assets/data/json/advantages_disadvantages.json';

export type Trait = {
    name: string,
    reference: {
        book: string
        page: number
    },
    ring: string
    types: string[],
    effects: string
}

export class PersonalTraitsService {

    private static getTraitList(name: string): Trait[] {
        let distinctions: Trait[] = [];
        traits.forEach((item) => {
            if (item.name === name) {
                distinctions = item.entries;
            }
        });

        return distinctions;
    }

    public static getDistinctions(): Trait[] {
        return PersonalTraitsService.getTraitList('Distinctions');
    }

    public static getPassions(): Trait[] {
        return PersonalTraitsService.getTraitList('Passions');
    }

    public static getAdversities(): Trait[] {
        return PersonalTraitsService.getTraitList('Adversities');
    }

    public static getAnxieties(): Trait[] {
        return PersonalTraitsService.getTraitList('Anxieties');
    }

    public static getDistinction(name: string): Trait | undefined {
        return PersonalTraitsService.getDistinctions().find((item) => {
            if (item.name === name) {
                return item;
            }
        });
    }

    public static getPassion(name: string): Trait | undefined {
        return PersonalTraitsService.getPassions().find((item) => {
            if (item.name === name) {
                return item;
            }
        });
    }

    public static getAdversity(name: string): Trait | undefined {
        return PersonalTraitsService.getAdversities().find((item) => {
            if (item.name === name) {
                return item;
            }
        });
    }

    public static getAnxiety(name: string): Trait | undefined {
        return PersonalTraitsService.getAnxieties().find((item) => {
            if (item.name === name) {
                return item;
            }
        });
    }
}