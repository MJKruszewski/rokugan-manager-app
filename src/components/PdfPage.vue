<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Other:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text>
              <button v-on:click="pdf()">Refresh</button>
              <br/>
              <br/>
              <br/>
<!--              <canvas style="display: none" id="pdfPage1" width="2513" height="3263"></canvas>-->
<!--              <canvas style="display: none" id="pdfPage2" width="2513" height="3263"></canvas>-->
<!--              <canvas style="display: none" id="pdfPage3" width="2513" height="3263"></canvas>-->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import {Armor, Player, Weapon} from '@/domain/types/player.type';
import schools from '../assets/data/json/schools.json';

export default Vue.extend({
  name: 'PdfPage',
  components: {},
  data: () => {
    return {
      uuid: require('uuid'),
      schoolSteps: [],
    };
  },
  methods: {
    pdf: function () {
      this.firstPage();
      this.secondPage();
      this.thirdPage();
    },
    getType: function (type: string) {
      switch (type) {
        case 'skill_group':
          type = 'Skl. Grp.';
          break;
        case 'technique_group':
          type = 'Tech. Grp.';
          break;
      }
      return type;
    },
    thirdPage: function () {
      const canvas: HTMLCanvasElement = document.getElementById('pdfPage3') as HTMLCanvasElement;
      const context = canvas.getContext('2d');

      if (context === null) {
        return;
      }

      const player: Player = this.$store.state.player;
      const imageObj = new Image(2513, 3263);
      imageObj.src = require('../assets/img/print/0003.jpg');

      imageObj.onload = () => {
        context.drawImage(imageObj, 0, 0);

        context.font = '30pt Permanent Marker, Courgette';

        let i = 0;
        player.advances.forEach(advance => {
          context.fillText(advance.name, 1390, 836  + (i * 58));
          context.fillText(advance.cost.toString() + ' xp', 1878, 836  + (i * 58));
          context.fillText(advance.kind, 2024, 836 + (i * 58));
          i++;
        });


        let expSpent = 0;
        player.advances.forEach(adv => expSpent += adv.cost);

        //exp
        context.font = '50pt Permanent Marker';
        context.fillText(player.experience.totalXp.toString(), 628 + 28 + 812, 406 + 85);
        context.fillText(expSpent.toString(), 845 + 28 +900, 406 + 85);
        context.fillText((player.experience.totalXp-expSpent).toString(), 1062 + 28 + 1000, 406 + 85);

        const schoolAdvances: any = this.getSchoolAdvances();
        context.font = '30pt Permanent Marker, Courgette';
        i = 0;

        [
          {list: schoolAdvances.curriculum.filter((i: any) => i.rank === 1), y: 311},
          {list: schoolAdvances.curriculum.filter((i: any) => i.rank === 2), y: 836},
          {list: schoolAdvances.curriculum.filter((i: any) => i.rank === 3), y: 1361},
          {list: schoolAdvances.curriculum.filter((i: any) => i.rank === 4), y: 1886},
          {list: schoolAdvances.curriculum.filter((i: any) => i.rank === 5), y: 2411},
        ].forEach(item => {
          let i = 0;

          item.list.forEach((advance: any) => {
            const type = this.getType(advance.type);

            context.fillText(advance.advance, 362, item.y + (i * 58));
            context.fillText(type.toUpperCase(), 851, item.y + (i * 58), 200);
            i++;
          });
        });

        context.font = '50pt Permanent Marker, Courgette';
        context.fillText(schoolAdvances.mastery_ability, 389, 3067, 880);

      };
    },
    secondPage: function () {
      const canvas: HTMLCanvasElement = document.getElementById('pdfPage2') as HTMLCanvasElement;
      const context = canvas.getContext('2d');

      if (context === null) {
        return;
      }

      const player: Player = this.$store.state.player;
      const imageObj = new Image(2513, 3263);
      imageObj.src = require('../assets/img/print/0002.jpg');
      imageObj.onload = () => {
        context.drawImage(imageObj, 0, 0);


        context.font = '60pt Permanent Marker';
        context.fillText(player.wealth.koku.toString(), 1315, 2064);
        context.fillText(player.wealth.bu.toString(), 1640, 2064);
        context.fillText(player.wealth.zeni.toString(), 1965, 2064);

        context.fillText(
            (((player.rings.find(item => item.name === 'Earth')?.value || 0) + (player.rings.find(item => item.name === 'Fire')?.value || 0)) * 2).toString()
            , 1935, 258);

        context.fillText(
            (((player.rings.find(item => item.name === 'Earth')?.value || 0) + (player.rings.find(item => item.name === 'Water')?.value || 0)) * 2).toString()
            , 1935, 379);

        context.fillText(
            (player.rings.find(item => item.name === 'Void')?.value || 0).toString()
            , 1957, 740);

        context.fillText(player.currentStats.voidPoints.toString(), 2155, 740);
        context.fillText(player.currentStats.vigilance.toString(), 2047, 620);
        context.fillText(player.currentStats.focus.toString(), 2047, 500);

        let i = 0;
        context.font = '18pt Permanent Marker, Courgette';
        let lines = this.getLines(context, player.story.note.replace('\\n', '').split('4. Standing out in school:')[0], 955);

        lines.forEach(line => {
          if (i >= 19) {
            return;
          }

          context.fillText(line, 1301, 2180 + (i * 55), 955);
          i++;
        });


        context.font = '35pt Permanent Marker';
        i = 0;

        player.techniques.forEach(tech => {
          const icon = new Image();
          switch (tech.type) {
            case 'Shūji':
              icon.src = require('../assets/img/print/shuji.png');
              break;
            case 'Invocations':
              icon.src = require('../assets/img/print/invocation.png');
              break;
            case 'Kata':
              icon.src = require('../assets/img/print/kata.png');
              break;
            case 'Kihō':
              icon.src = require('../assets/img/print/kiho.png');
              break;
            case 'Mahō':
              icon.src = require('../assets/img/print/maho.png');
              break;
            case 'Ninjutsu':
              icon.src = require('../assets/img/print/ninjutsu.png');
              break;
            case 'Rituals':
              icon.src = require('../assets/img/print/ritual.png');
              break;
          }

          context.drawImage(icon, 270 ,2346 + (i * 55));
          context.fillText(tech.name + ' ('+ tech.book + ' p.' +tech.page+ ')', 320, 2376 + (i * 55), 955);
          i++;
        });

        i = 0;
        context.font = '30pt Permanent Marker, Courgette';
        player.equipment.filter(p => p.kind === 'armor').forEach(item => {
          const armor = item as Armor;
          context.fillText(armor.name, 1301, 1415 + (i * 65), 277);
          context.fillText('psych: ' + armor.physRes + ' / super: ' + armor.superRes, 1584, 1415 + (i * 65), 320);
          context.fillText(armor.qualities.replace(' ', ', '), 1908, 1415 + (i * 65), 320);

          i++;
        });
        i = 0;
        player.equipment.filter(p => p.kind === 'weapon').forEach(item => {
          if (4 <= i) {
            return;
          }
          const weapon = item as Weapon;

          if (weapon.grip === '2-hand' && weapon.category !== 'Bows') {
            return;
          }

          const twoHanded: Weapon|undefined = player.equipment.find(p => p.kind === 'weapon' && p.name === weapon.name && (p as Weapon).grip === '2-hand') as Weapon|undefined;

          context.fillText(weapon.name, 257, 1906 + (i * 65), 277);
          context.fillText(weapon.damage + '/' + weapon.deadlines + (twoHanded ? '  (' +twoHanded.damage + '/'+twoHanded.deadlines +')' : ''), 558, 1906 + (i * 65), 320);
          context.fillText(weapon.minRange + '-' + weapon.maxRange, 779, 1906 + (i * 65), 320);
          context.fillText(weapon.qualities.replace(' ', ', '), 868, 1906 + (i * 65), 320);

          i++;
        });


        let gear = '';
        i = 0;
        player.equipment.filter(p => p.kind === 'other').forEach(item => {
          gear += item.name + ', ';
        });
        context.font = '30pt Permanent Marker, Courgette';
        this.getLines(context, gear, 970).forEach(text => {
          if (i >= 4) {
            return;
          }
          context.fillText(text, 1302, 1751 + (i * 55), 970);

          i++;
        });
        i = 0;
        player.abilities.forEach(text => {
          if (i >= 4) {
            return;
          }
          context.fillText(text.name + ' (' + text.book + ' p.' + text.page+ ')', 258, 933 + (i * 55), 970);

          i++;
        });


        context.font = '60pt Permanent Marker';
        context.fillText(player.rings.find(item => item.name === 'Earth')?.value?.toString() || '0', 795 + 25, 305 + 75);
        context.fillText(player.rings.find(item => item.name === 'Air')?.value?.toString() || '0', 918 + 25, 305 + 75);

        context.fillText(player.rings.find(item => item.name === 'Water')?.value?.toString() || '0', 759 + 25, 418 + 75);
        context.fillText(player.rings.find(item => item.name === 'Fire')?.value?.toString() || '0', 951 + 25, 418 + 75);

        context.fillText(player.rings.find(item => item.name === 'Void')?.value?.toString() || '0', 855 + 25, 487 + 75);
      };
    },
    firstPage: function () {
      const canvas: HTMLCanvasElement = document.getElementById('pdfPage1') as HTMLCanvasElement;
      const context = canvas.getContext('2d');

      if (context === null) {
        return;
      }

      const player: Player = this.$store.state.player;


      const imageObj = new Image(2513, 3263);
      imageObj.src = require('../assets/img/print/0001.jpg');

      imageObj.onload = () => {
        context.drawImage(imageObj, 0, 0);


        context.font = '60pt Permanent Marker';
        context.fillText(player.familyData.name, 252, 231, 658);

        context.fillText(player.familyData.clan, 252, 509, 300);
        context.fillText(player.familyData.mon, 556, 509, 300);

        context.fillText(player.familyData.school, 252, 607, 607);
        context.fillText('', 664, 607);

        context.fillText(player.rings.find(item => item.name === 'Earth')?.value?.toString() || '0', 1148 + 25, 305 + 75);
        context.fillText(player.rings.find(item => item.name === 'Air')?.value?.toString() || '0', 1267 + 25, 305 + 75);

        context.fillText(player.rings.find(item => item.name === 'Water')?.value?.toString() || '0', 1112 + 25, 418 + 75);
        context.fillText(player.rings.find(item => item.name === 'Fire')?.value?.toString() || '0', 1304 + 25, 418 + 75);

        context.fillText(player.rings.find(item => item.name === 'Void')?.value?.toString() || '0', 1208 + 25, 487 + 75);


        context.font = '40pt Permanent Marker';

        let artisan = 0, martial = 0, schoolar = 0, social = 0, trade = 0;
        const x = 831;

        player.skills.forEach(item => {
          let i = 0;
          let y = 0;
          switch (item.group) {
            case 'Artisan skills':
              y = 953;
              i = artisan;
              artisan++;
              break;
            case 'Social skills':
              y = 2166;
              i = social;
              social++;
              break;
            case 'Scholar skills':
              y = 1762;
              i = schoolar;
              schoolar++;
              break;
            case 'Martial skills':
              y = 1358;
              i = martial;
              martial++;
              break;
            case 'Trade skills':
              y = 2571;
              i = trade;
              trade++;
              break;
          }

          context.fillText(item.value, x, y + (i * 56));
        });

        context.font = '50pt Permanent Marker';
        //honor, status, glory
        context.fillText(player.social.honor.toString(), 1668 + 28, 196 + 85);
        context.fillText(player.social.status.toString(), 1880 + 28, 196 + 85);
        context.fillText(player.social.glory.toString(), 2096 + 28, 196 + 85);

        let expSpent = 0;
        player.advances.forEach(adv => expSpent += adv.cost);

        //exp
        context.fillText(player.experience.totalXp.toString(), 628 + 28, 2966 + 85);
        context.fillText(expSpent.toString(), 845 + 28, 2966 + 85);
        context.fillText((player.experience.totalXp-expSpent).toString(), 1062 + 28, 2966 + 85);


        context.font = '40pt Permanent Marker';

        [
          {list: player.distinctions, y: 1282},
          {list: player.adversities, y: 1560},
          {list: player.passions, y: 1838},
          {list: player.anxieties, y: 2116},
        ].forEach(item => {
          let i = 0;

          item.list.forEach(distinction => {
            if (i >= 3) {
              return;
            }

            context.fillText(distinction.name + ' (' + distinction.book + ' p.' + distinction.page + ')', 1270, item.y + (i * 56));
            i++;
          });
        });

        context.font = '12pt Permanent Marker, Courgette';
        let i = 0;
        let lines = this.getLines(context, player.story.ninjo.replace('\\n', ''), 603);

        if (lines.length > 5) {
          context.font = '12pt Permanent Marker, Courgette';
          lines.forEach(line => {
            if (i >= 10) {
              return;
            }

            context.fillText(line, 1645, 470 + (i * 15), 603);
            i++;
          });
        } else {
          context.font = '22pt Permanent Marker, Courgette';
          lines = this.getLines(context, player.story.ninjo.replace('\\n', ''), 603);
          lines.forEach(line => {
            if (i >= 5) {
              return;
            }

            context.fillText(line, 1645, 476 + (i * 25), 603);
            i++;
          });
        }

        i = 0;
        lines = this.getLines(context, player.story.giri.replace('\\n', ''), 603);

        if (lines.length > 5) {
          context.font = '12pt Permanent Marker, Courgette';
          lines.forEach(line => {
            if (i >= 10) {
              return;
            }

            context.fillText(line, 1645, 680 + (i * 15), 603);
            i++;
          });
        } else {
          context.font = '22pt Permanent Marker, Courgette';
          lines = this.getLines(context, player.story.giri.replace('\\n', ''), 603);
          lines.forEach(line => {
            if (i >= 5) {
              return;
            }

            context.fillText(line, 1645, 686 + (i * 25), 603);
            i++;
          });
        }
      };
    },
    getLines: function (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    },
    getSchoolAdvances() {
      if (this.schoolSteps) {
        // return this.schoolSteps;
      }

      for (let schoolsKey in schools) {
        const school = schools[schoolsKey];

        if (school.name === this.$store.state.player.familyData.school) {
          //@ts-ignore
          this.schoolSteps = school;
          break;
        }
      }

      return this.schoolSteps;
    },
  },
});
</script>

<style>
</style>