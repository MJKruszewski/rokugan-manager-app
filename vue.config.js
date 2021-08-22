module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'Rokugan Magistrate',
        publish: ['github'],
        win: {
          target: [
            'nsis',
          ],
          icon: 'public/whitee.ico',
        },
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ], 
};
