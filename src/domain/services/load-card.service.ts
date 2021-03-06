//Import card from paper blossoms XML
import {getClanColor, getClanKami, getHook, getKami, HEXToVBColor, sendNotifications} from '@/domain/common';
import {Advance, Armor, Bond, Book, Equipment, Player, Technique, Weapon} from '@/domain/types/player.type';
import parsedBonds from '../../assets/data/json/bonds.json';
import {Ring} from '@/domain/types/ring.type';
import axios from 'axios';

export class LoadCardService {
    private static preparePersonalTraits(xml: Document, placeholder: Player) {
        for (const child of xml.getElementsByTagName('Techniques')[0].children) {
            if (child.getAttribute('type') === 'Anxieties') {
                placeholder.anxieties.push({
                    book: (child.getAttribute('book') || 'Core') as Book,
                    desc: child.getAttribute('desc') || '',
                    name: child.getAttribute('name') || '',
                    page: child.getAttribute('page') || '',
                    ring: child.getAttribute('ring') || '',
                    shortDesc: child.getAttribute('short_desc') || '',
                    type: 'Anxieties',
                    types: child.getAttribute('types') || '',
                });

                continue;
            }

            if (child.getAttribute('type') === 'Adversities') {
                placeholder.adversities.push({
                    book: (child.getAttribute('book') || 'Core') as Book,
                    desc: child.getAttribute('desc') || '',
                    name: child.getAttribute('name') || '',
                    page: child.getAttribute('page') || '',
                    ring: child.getAttribute('ring') || '',
                    shortDesc: child.getAttribute('short_desc') || '',
                    type: 'Adversities',
                    types: child.getAttribute('types') || '',
                });

                continue;
            }

            if (child.getAttribute('type') === 'Distinctions') {
                placeholder.distinctions.push({
                    book: (child.getAttribute('book') || 'Core') as Book,
                    desc: child.getAttribute('desc') || '',
                    name: child.getAttribute('name') || '',
                    page: child.getAttribute('page') || '',
                    ring: child.getAttribute('ring') || '',
                    shortDesc: child.getAttribute('short_desc') || '',
                    type: 'Distinctions',
                    types: child.getAttribute('types') || '',
                });

                continue;
            }

            if (child.getAttribute('type') === 'Passions') {
                placeholder.passions.push({
                    book: (child.getAttribute('book') || 'Core') as Book,
                    desc: child.getAttribute('desc') || '',
                    name: child.getAttribute('name') || '',
                    page: child.getAttribute('page') || '',
                    ring: child.getAttribute('ring') || '',
                    shortDesc: child.getAttribute('short_desc') || '',
                    type: 'Passions',
                    types: child.getAttribute('types') || '',
                });

                continue;
            }

            placeholder.techniques.push({
                book: (child.getAttribute('book') || 'Core') as Book,
                desc: child.getAttribute('desc') || '',
                name: child.getAttribute('name') || '',
                page: child.getAttribute('page') || '',
                shortDesc: child.getAttribute('short_desc') || '',
                type: (child.getAttribute('type') || 'Kata') as Technique['type'],
                rank: parseInt(child.getAttribute('rank') || '0'),
                restriction: child.getAttribute('restriction') || '',
                subtype: child.getAttribute('subtype') || '',
            });
        }
    }

    private static prepareAbilities(xml: Document, placeholder: Player) {
        for (const child of xml.getElementsByTagName('Abilities')[0].children) {
            placeholder.abilities.push({
                name: child.getAttribute('name') || '',
                book: (child.getAttribute('ref_book') || 'Core') as Book,
                description: child.getAttribute('description') || '',
                page: child.getAttribute('ref_page') || '',
                source: child.getAttribute('source') || '',
            });
        }
    }

    private static prepareTitles(xml: Document, placeholder: Player) {
        for (const child of xml.getElementsByTagName('Titles')[0].children) {
            const title = child.getAttribute('value') || '';

            if (title.length <= 0) {
                continue;
            }

            placeholder.titles.push(title);
            placeholder.currentTitle = title;
        }
    }

    private static prepareAdvances(xml: Document, placeholder: Player) {
        for (const child of xml.getElementsByTagName('Advances')[0].children) {
            const advance = (child.getAttribute('value') || '').split('|');

            placeholder.advances.push({
                cost: parseInt(advance[3]),
                kind: advance[2].toLowerCase() as Advance['kind'],
                name: advance[1],
                type: advance[0],
            });
        }
    }

    private static prepareBonds(xml: Document, placeholder: Player) {
        let advancesForRank = Array.from(xml.getElementsByTagName('Advances')[0].children);

        for (const child of xml.getElementsByTagName('Advances')[0].children) {
            const advance: string = child.getAttribute('value') || '';

            if (!advance.startsWith('Bond|')) {
                continue;
            }

            const parts = advance.split('|');

            if (undefined === parts[1]) {
                continue;
            }


            const template = parsedBonds.find(item => item.name === parts[1]);
            const bond: Bond = {
                name: parts[1],
                //@ts-ignore
                book: template.reference.book as Book,
                //@ts-ignore
                page: template.reference.page,
                rank: 1,
                //@ts-ignore
                ability: template.ability,
            };

            const result = LoadCardService.calculateBondRank(advancesForRank, xml, bond);
            advancesForRank = result.advancesForRank;
            bond.rank = result.rank;

            placeholder.bonds.push(bond);
        }

        console.log('placeholder.abilities', placeholder.abilities);
    }

    private static calculateBondRank(advancesForRank: Array<any>, xml: Document, ability: Bond): { rank:number, advancesForRank: Array<any> } {
        const cleanup: string[] = [];
        let rank = 1;

        for (const child of advancesForRank) {
            const attribute: string = child.getAttribute('value') || '';

            if (!attribute.includes('Bond Upgrade|' + ability.name + '|')) {
                continue;
            }

            cleanup.push(attribute);
            rank++;

            if (rank === 5) {
                break;
            }
        }

        for (let i = 0; i < cleanup.length; i++) {
            for (let j = 0; j < advancesForRank.length; j++) {
                const attribute: string = advancesForRank[j].getAttribute('value') || '';

                if (attribute !== cleanup[i]) {
                    continue;
                }

                advancesForRank.splice(j, 1);
                break;
            }
        }

        return {
            rank,
            advancesForRank,
        };
    }

    private static prepareInventory(xml: Document, placeholder: Player) {
        for (const child of xml.getElementsByTagName('Equipment')[0].children) {
            if (child.getAttribute('type') === 'Armor') {
                placeholder.equipment.push({
                    name: child.getAttribute('name') || '',
                    book: child.getAttribute('book') as Book,
                    desc: child.getAttribute('desc') || '',
                    page: child.getAttribute('page') || '',
                    price: parseInt(child.getAttribute('price') || '0'),
                    qualities: child.getAttribute('qualities') || '',
                    rarity: parseInt(child.getAttribute('rarity') || '0'),
                    shortDesc: child.getAttribute('short_desc') || '',
                    type: child.getAttribute('type') || '',
                    unit: child.getAttribute('unit') || '',
                    kind: 'armor',

                    physRes: parseInt(child.getAttribute('a_physres') || '0'),
                    superRes: parseInt(child.getAttribute('a_superres') || '0'),
                } as Armor);

                continue;
            }

            if (child.getAttribute('type') === 'Weapon') {
                placeholder.equipment.push({
                    name: child.getAttribute('name') || '',
                    book: child.getAttribute('book') as Book,
                    desc: child.getAttribute('desc') || '',
                    page: child.getAttribute('page') || '',
                    price: parseInt(child.getAttribute('price') || '0'),
                    qualities: child.getAttribute('qualities') || '',
                    rarity: parseInt(child.getAttribute('rarity') || '0'),
                    shortDesc: child.getAttribute('short_desc') || '',
                    type: child.getAttribute('type') || '',
                    unit: child.getAttribute('unit') || '',
                    kind: 'weapon',

                    skill: child.getAttribute('w_skill') || '',
                    grip: child.getAttribute('w_grip') || '',
                    deadlines: parseInt(child.getAttribute('w_dls') || '0'),
                    category: child.getAttribute('w_category') || '',
                    damage: parseInt(child.getAttribute('w_dam') || '0'),
                    minRange: parseInt(child.getAttribute('w_minrange') || '0'),
                    maxRange: parseInt(child.getAttribute('w_maxrange') || '0'),
                } as Weapon);

                continue;
            }

            if (child.getAttribute('type') === 'Other') {
                placeholder.equipment.push({
                    name: child.getAttribute('name') || '',
                    book: child.getAttribute('book') as Book,
                    desc: child.getAttribute('desc') || '',
                    page: child.getAttribute('page') || '',
                    price: parseInt(child.getAttribute('price') || '0'),
                    qualities: child.getAttribute('qualities') || '',
                    rarity: parseInt(child.getAttribute('rarity') || '0'),
                    shortDesc: child.getAttribute('short_desc') || '',
                    type: child.getAttribute('type') || '',
                    unit: child.getAttribute('unit') || '',
                    kind: 'other',
                } as Equipment);

                continue;
            }
        }
    }

    static async importCard(xml: Document, sendNotification: boolean): Promise<Player> {
        const wealth = xml.getElementsByTagName('Wealth')[0];
        const stats = {
            endurance: Number.parseInt(xml.getElementsByTagName('Derived')[0].getAttribute('endurance') || '0'),
            composure: Number.parseInt(xml.getElementsByTagName('Derived')[0].getAttribute('composure') || '0'),
            focus: Number.parseInt(xml.getElementsByTagName('Derived')[0].getAttribute('focus') || '0'),
            vigilance: Number.parseInt(xml.getElementsByTagName('Derived')[0].getAttribute('vigilance') || '0'),
        };

        const placeholder: Player = {
            abilities: [],
            currentVersion: '',
            currentStats: {...stats, voidPoints: 0},
            equipment: [],
            experience: {
                curriculumXp: 0,
                titleXp: 0,
                totalXp: parseInt(xml.getElementsByTagName('TotalXP')[0].getAttribute('value') || '0'),
            },
            familyData: {
                name: xml.getElementsByTagName('Name')[0].getAttribute('value') || '',
                clan: xml.getElementsByTagName('Clan')[0].getAttribute('value') || '',
                heritage: xml.getElementsByTagName('Heritage')[0].getAttribute('value') || '',
                mon: xml.getElementsByTagName('Family')[0].getAttribute('value') || '',
                school: xml.getElementsByTagName('School')[0].getAttribute('value') || '',
            },
            currentTitle: null,
            isLoaded: false,
            portraitImage: xml.getElementsByTagName('Portrait')[0].getAttribute('base64image') || '',
            rings: [],
            skills: [],
            advances: [],
            titles: [],
            anxieties: [],
            adversities: [],
            distinctions: [],
            passions: [],
            bonds: [],
            social: {
                glory: Number.parseInt(xml.getElementsByTagName('Social')[0].getAttribute('glory') || '0'),
                honor: Number.parseInt(xml.getElementsByTagName('Social')[0].getAttribute('honor') || '0'),
                status: Number.parseInt(xml.getElementsByTagName('Social')[0].getAttribute('status') || '0'),
            },
            stats: stats,
            story: {
                giri: xml.getElementsByTagName('Giri')[0].getAttribute('value') || '',
                ninjo: xml.getElementsByTagName('Ninjo')[0].getAttribute('value') || '',
                note: xml.getElementsByTagName('Notes')[0].getAttribute('value') || '',
            },
            techniques: [],
            wealth: {
                bu: parseInt(wealth.getAttribute('bu') || '0'),
                koku: parseInt(wealth.getAttribute('koku') || '0'),
                zeni: parseInt(wealth.getAttribute('zeni') || '0'),
            },

        };

        for (const child of xml.getElementsByTagName('Skills')[0].children) {
            placeholder.skills.push({
                name: child.getAttribute('name') || '',
                value: child.getAttribute('value') || '',
                group: child.getAttribute('group') || '',
            });
        }

        for (const child of xml.getElementsByTagName('Rings')[0].children) {
            placeholder.rings.push({
                name: child.tagName,
                value: parseInt(child.getAttribute('value') || '0'),
            });
        }

        LoadCardService.prepareInventory(xml, placeholder);
        LoadCardService.prepareAbilities(xml, placeholder);
        LoadCardService.preparePersonalTraits(xml, placeholder);
        LoadCardService.prepareBonds(xml, placeholder);
        LoadCardService.prepareAdvances(xml, placeholder);
        LoadCardService.prepareTitles(xml, placeholder);

        placeholder.currentStats.voidPoints = placeholder?.rings?.filter(val => val.name === 'Void').shift()?.value || 0;
        placeholder.isLoaded = true;

        if (sendNotification) {
            const social = xml.getElementsByTagName('Social')[0];
            const formData = new FormData();
            let image = {};

            if (placeholder.portraitImage !== undefined && placeholder.portraitImage.length > 0) {
                const imageBlob = await (await fetch('data:image/png;charset=utf-8;base64,' + placeholder.portraitImage)).blob();
                image = {
                    image: {
                        url: 'attachment://player.png',
                    },
                };
                formData.append('files[0]', imageBlob, 'player.png');
            }

            formData.append('payload_json', JSON.stringify({
                ...getKami(getClanKami(xml.getElementsByTagName('Clan')[0].getAttribute('value') || '')),
                embeds: [
                    {
                        content: 'perkele',
                        title: placeholder.familyData.clan + ' ' + placeholder.familyData.name + ' from ' + placeholder.familyData.mon,
                        color: HEXToVBColor(getClanColor(placeholder.familyData.clan)),
                        description: 'Enters a dojo in glory!\n\n'
                            + 'Glory: ' + social.getAttribute('glory') + '\n'
                            + 'Honor: ' + social.getAttribute('honor') + '\n'
                            + 'Status: ' + social.getAttribute('status') + '\n',
                        ...image,
                    },
                ],
            }));

            await axios.post(atob(getHook()), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        console.log('player', placeholder);

        return placeholder;
    }
}
