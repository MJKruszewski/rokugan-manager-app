import skills from '../../assets/data/json/skill_groups.json';
import techniques from '../../assets/data/json/techniques.json';
import item_patterns from '../../assets/data/json/item_patterns.json';
import rings from '../../assets/data/json/rings.json';
import {Book, Player, Technique} from '@/domain/types/player.type';
import {PlayerService} from '@/domain/services/player.service';

export type AdvanceTechnique  = {
    name: string;
    restriction: string;
    type: 'Kata' | 'Kih\u014d' | 'Invocations' | 'Rituals' | 'Sh\u016bji' | 'Mah\u014d' | 'Ninjutsu' | 'Signature Scrolls' | 'Astradhari Techniques' | 'Inversions' | 'Item Patterns';
    subtype: string;
    book: Book;
    page: string;
    rank: number;
    xp: number;
};

export class AdvanceService {

    public static getPossibleAdvances(type: string, store: Player): string[] {
        const school = PlayerService.getPlayerSchool(store);

        switch (type) {
            case 'Skill':
                return AdvanceService.getPossibleSkills(store);
            case 'Technique':
                // eslint-disable-next-line no-case-declarations
                const result = [
                    'Item Patterns',
                    'Mah\u014d',
                    'Signature Scrolls',
                ];

                if (school === undefined) {
                    return result;
                }

                result.push(...school.techniques_available);

                return result;
            case 'Ring':
                return AdvanceService.getPossibleRings(store);
        }

        return [];
    }

    public static getPossibleTechniques(type: string, allowAll: boolean, store: Player): AdvanceTechnique[] {
        let result: AdvanceTechnique[] = [];
        const currentRank = PlayerService.calculateRank(store).rank;

        console.log('currentRank', currentRank);

        switch (type) {
            case 'Kata':
            case 'Rituals':
            case 'Sh\u016bji':
            case 'Kih\u014d':
            case 'Invocations':
            case 'Ninjutsu':
            case 'Inversions':
            case 'Astradhari Techniques':
                return [];
            case 'Item Patterns':
                result = item_patterns.map((pattern): AdvanceTechnique => {
                    return {
                        name: pattern.name,
                        type: 'Item Patterns',
                        book: pattern.reference.book as Book,
                        page: pattern.reference.page.toString(),
                        subtype: '',
                        rank: 1,
                        xp: pattern.xp_cost,
                        restriction: '',
                    };
                });
                break;
            case 'Mah\u014d':
                result = techniques.find(item => {
                    return item.name === 'Mah\u014d';
                })?.subcategories[0]?.techniques?.map((technique): AdvanceTechnique => {
                    return {
                        name: technique.name,
                        type: 'Item Patterns',
                        book: technique.reference.book as Book,
                        page: technique.reference.page.toString(),
                        subtype: '',
                        rank: technique.rank,
                        xp: technique.xp,
                        restriction: technique?.restriction || '',
                    };
                }) || [];
                break;
            case 'Signature Scrolls':
                result = techniques.find(item => {
                    return item.name === 'Signature Scrolls';
                })?.subcategories[0]?.techniques?.map((technique): AdvanceTechnique => {
                    return {
                        name: technique.name,
                        type: 'Item Patterns',
                        book: technique.reference.book as Book,
                        page: technique.reference.page.toString(),
                        subtype: '',
                        rank: technique.rank,
                        xp: technique.xp,
                        restriction: technique?.restriction || '',
                    };
                }) || [];
                break;
        }

        return result.filter((pattern: AdvanceTechnique) => {
            let isPresent = true;

            for (const technique of store.techniques) {
                if (technique.name === pattern.name) {
                    console.log('technique.name === pattern.name');
                    isPresent = false;
                    break;
                }
            }

            if (!allowAll && pattern.rank > currentRank) {
                isPresent = false;
            }

            return isPresent;
        });
    }

    private static getPossibleRings(store: Player): string[] {
        const tmpList: string[] = rings.map((item: { name: string }): string => {
            return item.name;
        });

        let maxRing = Math.min(...store.rings.map((item) => item.value));

        for (const playerRing of store.rings) {
            if (playerRing.name === 'Void') {
                maxRing += playerRing.value;
                break;
            }
        }

        return tmpList.filter((item) => {
            let isAdvance = true;

            for (const playerRing of store.rings) {
                if (playerRing.name === item) {

                    if (playerRing.value >= 5) {
                        isAdvance = false;
                    }

                    if (playerRing.value >= maxRing) {
                        isAdvance = false;
                    }

                    break;
                }
            }

            return isAdvance;
        });
    }

    private static getPossibleSkills(store: Player): string[] {
        return skills
            .map((item: { skills: string[] }) => {
                return item.skills;
            })
            .flat()
            .filter((item) => {
                let isAdvance = true;

                for (const playerSkill of store.skills) {
                    if (playerSkill.name === item && parseInt(playerSkill.value) >= 5) {
                        isAdvance = false;
                        break;
                    }
                }

                return isAdvance;
            });
    }

}