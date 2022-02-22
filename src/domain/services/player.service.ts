import {Player} from '@/domain/types/player.type';
import schools from '../../assets/data/json/schools.json';
import techniques from '../../assets/data/json/techniques.json';
import skills from '../../assets/data/json/skill_groups.json';

type SchoolTemplate = {
    name: string;
    reference: {
        book: string;
        page: number;
    },
    role: string[];
    clan?: string;
    ring_increase: string[];
    starting_skills: {
        size: number,
        set: string[];
    }[],
    honor: number;
    techniques_available: string[];
    starting_techniques: {
        size: number;
        set: string[]
    }[];
    school_ability: string,
    starting_outfit: {
        size: number;
        set: string[]
    }[];
    curriculum: {
        rank: number;
        advance: string;
        type: string;
        special_access: boolean;
    }[];
    mastery_ability: string;
}

export class PlayerService {

    public static calculateRank(store: Player): { rank: number, totalExp: number } {
        let rank = 1;
        let totalExp = 0;

        const schoolAdvances = PlayerService.getPlayerSchool(store)?.curriculum;

        if (schoolAdvances === undefined) {
            return { rank, totalExp };
        }

        let currentAdvances = schoolAdvances.filter(schoolAdvance => {
            return schoolAdvance.rank === rank;
        });

        let oldRank = rank;

        store.advances.filter(advance => {
            return advance.kind === 'curriculum';
        }).forEach(advance => {
            oldRank = rank;

            if (advance.type === 'Ring') {
                totalExp += Math.ceil(advance.cost / 2);
                rank = PlayerService.getRankFromExp(totalExp);

                if (oldRank !== rank) {
                    currentAdvances = schoolAdvances.filter(schoolAdvance => {
                        return schoolAdvance.rank === rank;
                    });
                }

                return;
            }

            for (const currentAdvance of currentAdvances) {
                if (advance.name === currentAdvance.advance) {
                    totalExp += advance.cost;
                    rank = PlayerService.getRankFromExp(totalExp);

                    if (oldRank !== rank) {
                        currentAdvances = schoolAdvances.filter(schoolAdvance => {
                            return schoolAdvance.rank === rank;
                        });
                    }

                    return;
                }

                if (currentAdvance.type === 'technique_group' && advance.type === 'Technique') {
                    for (const technique of techniques) {
                        for (const subcategory of technique.subcategories) {
                            if (subcategory.name === currentAdvance.advance) {
                                if (subcategory.techniques.map(i => i.name).includes(advance.name)) {
                                    totalExp += advance.cost;
                                    rank = PlayerService.getRankFromExp(totalExp);

                                    if (oldRank !== rank) {
                                        currentAdvances = schoolAdvances.filter(schoolAdvance => {
                                            return schoolAdvance.rank === rank;
                                        });
                                    }

                                    return;
                                }
                            }
                        }
                    }
                }

                if (currentAdvance.type === 'skill_group' && advance.type === 'Skill') {
                    for (const skill of skills) {
                        if (skill.name === currentAdvance.advance) {
                            if (skill.skills.includes(advance.name)) {
                                totalExp += advance.cost;
                                rank = PlayerService.getRankFromExp(totalExp);

                                if (oldRank !== rank) {
                                    currentAdvances = schoolAdvances.filter(schoolAdvance => {
                                        return schoolAdvance.rank === rank;
                                    });
                                }

                                return;
                            }
                        }
                    }
                }
            }

            totalExp += Math.ceil(advance.cost / 2);
            rank = PlayerService.getRankFromExp(totalExp);

            if (oldRank !== rank) {
                currentAdvances = schoolAdvances.filter(schoolAdvance => {
                    return schoolAdvance.rank === rank;
                });
            }
        });

        return { rank, totalExp };
    }

    private static getRankFromExp(exp: number): number {
        if (exp < 20) {
            return 1;
        } else if (exp < 44) {
            return 2;
        } else if (exp < 76) {
            return 3;
        } else if (exp < 120) {
            return 4;
        } else if (exp < 180) {
            return 5;
        } else {
            return 6;
        }
    }

    public static getPlayerSchool(store: Player): SchoolTemplate | undefined {
        // @ts-ignore
        return schools.find(item => {
            return item.name === store.familyData.school;
        }) as SchoolTemplate | undefined;
    }

} 