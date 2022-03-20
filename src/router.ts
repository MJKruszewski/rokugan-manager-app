import VueRouter from 'vue-router';
import RollPage from '@/components/RollPage.vue';
import AdvancementPage from '@/components/AdvancementPage.vue';
import EquipmentPage from '@/components/EquipmentPage.vue';
import TechniquesPage from '@/components/TechniquesPage.vue';
import PersonalTraitsPage from '@/components/PersonalTraitsPage.vue';
import BackgroundPage from '@/components/BackgroundPage.vue';
import SettingsPage from '@/components/SettingsPage.vue';
import GmPanel from '@/components/GmPanel.vue';
import ShopPage from '@/components/ShopPage.vue';
import PlayerDetailsPage from '@/components/gm-panel/PlayerDetailsPage.vue';
import NpcDetailsPage from '@/components/gm-panel/NpcDetailsPage.vue';
import PdfPage from '@/components/PdfPage.vue';

export function getRouter(): VueRouter {
    return new VueRouter({
        routes: [
            {path: '/', component: RollPage},
            {path: '/main', alias: 'main', component: RollPage},
            {path: '/background', alias: 'background', component: BackgroundPage},
            {path: '/personal-traits', alias: 'personal-traits', component: PersonalTraitsPage},
            {path: '/techniques', alias: 'techniques', component: TechniquesPage},
            {path: '/equipment', alias: 'equipment', component: EquipmentPage},
            {path: '/shop', alias: 'shop', component: ShopPage},
            {path: '/advancement', alias: 'advancement', component: AdvancementPage},
            {path: '/settings', alias: 'settings', component: SettingsPage},
            {path: '/pdf', alias: 'pdf', component: PdfPage},
            {path: '/gmpanel', alias: 'gmpanel', component: GmPanel},
            {path: '/gmpanel-player/:id', alias: 'gmpanelplayer', component: PlayerDetailsPage, props: true},
            {path: '/gmpanel-npc/:id', alias: 'gmpanelplayer', component: NpcDetailsPage, props: true},
        ],
    });
} 