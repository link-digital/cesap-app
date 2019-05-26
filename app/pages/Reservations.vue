<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">

      <MenuBar title="RESERVAS" />

      <TitleBar title="RESERVAS" />

      <ScrollView>

        <StackLayout>
          <ActivityIndicator v-show="processing" :busy="processing"></ActivityIndicator>

          <StackLayout v-for="(app, index) in appointments" :key="index" class="appointment">
            <Label class="color-white">Reserva:</Label>
            <Label class="color-green-1 font-size-m1 m-b-20" :text="app.id"></Label>
            <GridLayout columns="auto,*" class="">
              <Label row="0" col="0" class="label" text="Deporte:"></Label>
              <Label row="0" col="1" class="value color-green-1" :text="services[app.serviceId].category"></Label>
            </GridLayout>
            <GridLayout columns="auto,*" class="">
              <Label row="0" col="0" class="label" text="Espacio:"></Label>
              <Label row="0" col="1" class="value color-green-1" :text="services[app.serviceId].name"></Label>
            </GridLayout>
            <GridLayout columns="auto,*" class="">
              <Label row="0" col="0" class="label" text="Fecha:"></Label>
              <Label row="0" col="1" class="value color-green-1" :text="app.date_start"></Label>
            </GridLayout>
            <GridLayout columns="auto,*" class="">
              <Label row="0" col="0" class="label" text="Hora de inicio:"></Label>
              <Label row="0" col="1" class="value color-green-1" :text="app.time_start"></Label>
            </GridLayout>
            <GridLayout columns="auto,*" class="">
              <Label row="0" col="0" class="label" text="Hora de fin:"></Label>
              <Label row="0" col="1" class="value color-green-1" :text="app.time_end"></Label>
            </GridLayout>
            <GridLayout columns="auto,*" class="">
              <Label row="0" col="0" class="label" text="Costo:"></Label>
              <Label row="0" col="1" class="value color-green-1" :text="services[app.serviceId].price_formatted"></Label>
            </GridLayout>
          </StackLayout>
        </StackLayout>

      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer';
import TitleBar from '~/components/TitleBar';
import MenuBar from '~/components/MenuBar';

export default {
  mixins: [ sideDrawer ],

  components: {
      TitleBar,
      MenuBar,
  }, 

  data () {
    return {
      appointments: [],
      services: {},
      processing: true,
    }
  },

  created(){
    this.processing = true;

    this.$api.get('appointments')
    .then(d => {
      this.appointments = d.appointments;
      this.services = d.services;
      this.processing = false;
    })
    .catch(e => {
      console.log(e);
    });
  }
}
</script>

<style lang="scss" scope>

.content-head
{
  border-width: 0;
}

.appointment
{
  padding-left: 40;
  padding-right: 40;
  padding-top: 20;
  padding-bottom: 20;
  // margin-bottom: 20;
  border-bottom-width: 1;
  border-bottom-color: #141f24;

  .label
  {
    margin-right: 6;
  }

  GridLayout
  {
    border-color: #566770;
    border-bottom-width: 1;
    padding-bottom: 3;
    padding-top: 3;
  }
}

Label
{
  font-weight: bold;
}
</style>
