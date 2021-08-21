import {Ability, Player} from '@/domain/types/player.type';

export class PlayerService {
    public static getBonds(player: Player): Ability[] {
        return player.abilities.filter((ability) => ability.isBond);
    }
} 