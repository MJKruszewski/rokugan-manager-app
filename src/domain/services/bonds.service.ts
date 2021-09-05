import bonds from '../../assets/data/json/bonds.json';
import {Trait} from '@/domain/services/personal-traits.service';

export type JsonBond = {
    name: string;
    ability: string;
    reference: {
        book: string;
        page: number;
    }
}

export class BondsService {
    public static getBonds(): JsonBond[] {
        return bonds;
    }

    public static getBond(name: string): JsonBond | undefined {
        return BondsService.getBonds().find((item) => {
            if (item.name === name) {
                return item;
            }
        });
    }

}