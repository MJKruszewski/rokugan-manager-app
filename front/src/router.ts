import VueRouter from 'vue-router';
import RollPage from '@/components/RollPage.vue';
import AdvancementPage from '@/components/AdvancementPage.vue';
import EquipmentPage from '@/components/EquipmentPage.vue';
import TechniquesPage from '@/components/TechniquesPage.vue';
import BondsPage from '@/components/BondsPage.vue';
import PersonalTraitsPage from '@/components/PersonalTraitsPage.vue';
import BackgroundPage from '@/components/BackgroundPage.vue';
import SettingsPage from '@/components/SettingsPage.vue';

export function getRouter(): VueRouter {
    return new VueRouter({
        routes: [
            { path: '/', component: RollPage },
            { path: '/main', alias: 'main', component: RollPage },
            { path: '/background', alias: 'background', component: BackgroundPage },
            { path: '/personal-traits', alias: 'personal-traits', component: PersonalTraitsPage },
            { path: '/bonds', alias: 'bonds', component: BondsPage },
            { path: '/techniques', alias: 'techniques', component: TechniquesPage },
            { path: '/equipment', alias: 'equipment', component: EquipmentPage },
            { path: '/advancement', alias: 'advancement', component: AdvancementPage },
            { path: '/settings', alias: 'settings', component: SettingsPage },
        ],
    });
} 