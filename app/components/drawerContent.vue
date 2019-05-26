<template lang="html">
  <ScrollView>
    <StackLayout width="100%" class="drawer-container">

      <GridLayout class="drawer-close-button" rows="auto" columns="*,auto" style="text-align: right" @tap="closeDrawer()">
        <Image src="res://close_menu" col="1" row="0" stretch="aspectFill" width="16"></Image>
      </GridLayout>

      <Label
        v-for="(page, i) in pagesMain"
        @tap="goToPage(page.component)"
        class="drawer-item font-roboto-cnd"
        :text="page.name"
        :key="'a'+i"
      />

      <Label class="drawer-title font-roboto-cnd" text="RESERVAS"/>

      <Label
        v-for="(page, i) in pagesReservation"
        @tap="goToPage(page.component)"
        class="drawer-item font-roboto-cnd"
        :text="page.name"
        :key="'b'+i"
      />

      <Label class="drawer-title font-roboto-cnd" text="INFORMACIÓN"/>

      <Label
        v-for="(page, i) in pagesInformation"
        @tap="goToPage(page.component)"
        class="drawer-item font-roboto-cnd"
        :text="page.name"
        :key="'c'+i"
      />

      <GridLayout rows="auto" columns="40,*" class="logout-container">
        <Label col="0" class="drawer-logout-icon fa" @tap="logout()" :text="'\uf011'"></Label>
        <Label col="1" class="drawer-logout-text font-roboto-cnd" @tap="logout()" text="CERRAR SESIÓN"></Label>
      </GridLayout>
      
    </StackLayout>
  </ScrollView>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'

export default {
  mixins: [sideDrawer],
  data () {
    return {
      // define our pages, making sure the component matches that defined in /app/router/index.js
      pagesMain: [
        // { name: 'INICIO', component: this.$routes.Home },
        { name: 'MIS RESERVAS ACTIVAS', component: this.$routes.Reservations },
      ],
      pagesReservation: [
        { name: 'SALONES & EVENTOS', component: this.$routes.ReservationEvents },
        { name: 'DEPORTES', component: this.$routes.Sports },
        { name: 'HOTEL', component: this.$routes.ReservationHotel },
      ],
      pagesInformation: [
        { name: 'ACTUALIDAD', component: this.$routes.News },
        { name: 'NUESTRAS INSTALACIONES', component: this.$routes.Spaces },
        { name: 'DIRECTORIO', component: this.$routes.Directory },
        { name: 'ATENCIÓN AL USUARIO', component: this.$routes.Pqrs }
      ]
    }
  },
  methods: {
    logout() {

      this.closeDrawer();
      this.$api.logout();
    },

    goToPage (pageComponent) {
      // this.$store.commit('clearHistory', true);
      // this.$store.dispatch('clearHistory', {state: true});
      // this.$navigateTo(pageComponent, {clearHistory: true});
      this.$navigateTo(pageComponent);
      this.closeDrawer()
    }
  }
}
</script>

<style lang="scss" scope>
  @import '../scss/app-variables';

  .drawer-container
  {
    padding: 15;
  }

  .drawer-close-button
  {
    color: white;
    text-align: right;
    font-size: 25;
    margin-bottom: 20;
    padding: 10;
  }

  .drawer-item
  {
    color: $blue-1;
    font-size: $font-size-m1;
    margin-top: 8;
    margin-left: 6;
    padding-bottom: 8;
    font-weight: bold;
  }

  .drawer-title
  {
    color: white;
    font-size: $font-size-m1;
    margin-top: 10;
    border-bottom-width: 1;
    border-color: white;
    margin-left: 6;
    margin-bottom: 8;
    font-weight: bold;
  }

  .logout-container
  {
    margin-top: 20;
    padding-left: 10;
  }

  .drawer-logout-icon
  {
    color: $white;
    font-size: 25;
    margin-left: 0;
    margin-right: 6;
  }

  .drawer-logout-text
  {
    color: $blue-1;
    horizontal-align: left;
    font-size: $font-size-m1;
    font-weight: bold;
  }
</style>
