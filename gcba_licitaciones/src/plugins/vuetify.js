import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import es from 'vuetify/lib/locale/es'

Vue.component('DatePicker', {
    methods: {
      changeLocale () {
        this.$vuetify.lang.current = 'es'
      },
    },
  })

export default new Vuetify({
    lang: {
        locales: { es },
        current: 'es',
      },
});
