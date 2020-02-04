<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">

    <MenuBar :showButton="true"/>

    <TitleBar title="RESERVAS" :showBack="false" @tab="garbage" />

    <ScrollView>
      <StackLayout>

        <FlexboxLayout class="icon-grid">
          <StackLayout class="even" @tap="navTo('ReservationEvents')">
            <Image class="ico" src="res://eventos" stretch="none"></Image>
            <Label>SALONES & EVENTOS</Label>
          </StackLayout>
          <StackLayout class="odd" @tap="openReservationsPage()">
            <Image class="ico" src="res://hotel" stretch="none"></Image>
            <Label>HOTEL</Label>
          </StackLayout>
          <StackLayout class="even" @tap="navTo('Sports')">
            <Image class="ico" src="res://deportes" stretch="none"></Image>
            <Label>DEPORTES</Label>
          </StackLayout>
          <StackLayout class="odd" @tap="callToPolice">
            <Image class="ico" src="res://llamar" stretch="none"></Image>
            <Label>LLAMAR</Label>
          </StackLayout>
        </FlexboxLayout>

        <GridLayout rows="*" columns="*, 25" class="list-item" v-for="(section, index) in sections" :key="index" @tap="navTo(section.page)">
          <Label :text="section.title" col="0" class="text" textWrap="true" />
          <Label :text="'\uf105'" col="1" class="fa color-green-1 arrow" />
        </GridLayout>

      </StackLayout>
    </ScrollView>

    </StackLayout>
  </Page>
</template>

<script>
  import sideDrawer from '~/mixins/sideDrawer'
  import TitleBar from '~/components/TitleBar'
  import MenuBar from '~/components/MenuBar'
  import {dial} from 'nativescript-phone'
  import {openUrl} from "utils/utils";

  import {GC} from "tns-core-modules/utils/utils";

  export default {
    mixins: [ sideDrawer ],

    components: {
        TitleBar,
        MenuBar
    }, 

    methods: {
      callToPolice(){
        dial('+5717445124');
      },
      
      garbage(){
        console.log('Garbage ******');
        GC();
      },

      openReservationsPage(){
        openUrl('http://190.85.14.22:8088/ZeusOnline/public/searchresult_lst.aspx?id_hotel=0&am_adult=1&am_child=0&am_additional=0&dt_from=2019/10/28&dt_to=2019/10/31&am_room=1&ds_starFilter=&ds_childrenage=&cd_plan=&ds_adultsage=&id_money=&ds_additionalage=');
      }
    },

    data() {
      return {

        sections: [
          {
            title: 'ACTUALIDAD',
            page: 'News',
          },
          {
            title: 'NUESTRAS INSTALACIONES',
            page: 'Spaces',
          },
          {
            title: 'DIRECTORIO',
            page: 'Directory',
          },
          {
            title: 'PETICIONES, QUEJAS, RECLAMOS Y SOLICITUDES',
            page: 'Pqrs'
          },
        ],
      }
    },
  };
</script>

<style scoped lang="scss">

  .info {
    font-size: 20;
  }

</style>
