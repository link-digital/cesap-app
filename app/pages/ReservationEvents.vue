<template>
  <Page actionBarHidden="true" xmlns:svg="nativescript-svg">
    <StackLayout class="page">

      <MenuBar />

      <TitleBar title="SALONES & EVENTOS" />

      <ScrollView>

      <StackLayout>

        <GridLayout class="list-picker" rows="40" columns="*, 20" @tap="openPicker(users, 'user')" >
          <Label class="label" row="0" col="0" :text="userText"></Label>
          <Label :text="'\uf0d7'" row="0" col="1" class="fa color-green-1 arrow" />
        </GridLayout>

        <GridLayout class="list-picker" rows="40" columns="*, 20" @tap="openPicker(spaces, 'space')" >
          <Label class="label" row="0" col="0" :text="spaceText"></Label>
          <Label :text="'\uf0d7'" row="0" col="1" class="fa color-green-1 arrow" />
        </GridLayout>

        <StackLayout class="date-picker" @tap="openDatePicker('date')">
          <Label class="minilabel" text="Fecha del evento"></Label>
          <Label class="label" :text="input.date"></Label>
        </StackLayout>

        <Label class="page-padding font-size-xl color-green-1 m-tb-10" text="ASISTENTES" row="0" col="0"></Label>
        <TextField hint="Cantidad de asistentes" class="page-padding input-field" v-model="input.attendants" keyboardType="number"></TextField>

        <Label class="page-padding font-size-xl color-green-1 m-tb-10" text="DESCRIPCIÓN DEL EVENTO" row="0" col="0"></Label>
        <TextView hint="Describa el evento" class="page-padding input-field" height="140" v-model="input.description"></TextView>

        <FlexboxLayout flexWrap="wrap">

          <StackLayout width="49%" @tap="checkBox('foods')">
            <Label class="m-tb-10 text-center" text="Requiere alimentos" />
            <Image :src="foodsImage" class="text-center" stretch="none" />
          </StackLayout>
          
          <StackLayout width="49%" @tap="checkBox('drinks')">
            <Label class="m-tb-10 text-center" text="Requiere bebidas" />
            <Image :src="drinksImage" class="text-center" stretch="none" />
          </StackLayout>
          
        </FlexboxLayout>

        <Button class="page-padding btn btn-green-1 m-tb-20" @tap="send" :isEnabled="!sending" :text="sending ? '...' : 'SOLICITAR RESERVA'" />

      </StackLayout>

      </ScrollView>

    </StackLayout>
   </Page>
</template>

<script>
  import Vue from 'nativescript-vue'
  import sideDrawer from '~/mixins/sideDrawer'
  import RadCalendarPlugin from 'nativescript-ui-calendar/vue';
  import ListPickerModal from '../components/ListPickerModal';

  import TitleBar from '~/components/TitleBar';
  import MenuBar from '~/components/MenuBar';
  // import Calendar from '~/components/CalendarModal';
  import DatePicker from '~/components/DatePickerModal';

  import EventsApi from "~/system/other_reservation";

  export default {
    mixins: [ sideDrawer ],

    components: {
      TitleBar,
      MenuBar
    }, 

    data() {
      return {
        events: [],
        sending: false,
        users:['Invitado', 'Afiliado'],
        spaces:['Salón Principal', 'Salón Rojo', 'Salón Verde'],
        dateInActive: false,
        dateOutActive: false,
        checks: {
          foods: false,
          drinks: false
        },
        input: {
          user: '',
          space: '',
          date: '',
          attendants: '',
          description: '',
          foods: 'No',
          drinks: 'No'
        }
      }
    },

    methods: {
      send(){

        if(
          this.input.user == '' ||
          this.input.space == '' ||
          this.input.date == '' ||
          this.input.attendants == '' ||
          this.input.description == ''
        )
        {

          alert({
            title: 'Alerta',
            message: 'Debe completar todos los campos.',
            okButtonText: 'Aceptar'
          });

          return;
        }

        if(
          this.input.attendants.match(/[^\d]/)
          // this.input.attendants <= 0
        )
        {

          alert({
            title: 'Alerta',
            // message: 'Solo se aceptan valores positivos en Asistentes.',
            message: 'Solo se aceptan números en el campo Asistentes.',
            okButtonText: 'Aceptar'
          });

          return;
        }

        this.sending = true;
        EventsApi.post('salones_eventos', this.input)
          .then(d => {
            if(d&&d.status == 'success'){

              this.input = {
                user: '',
                space: '',
                date: '',
                attendants: '',
                description: '',
                foods: 'No',
                drinks: 'No'
              };

              this.checks = {
                foods: false,
                drinks: false
              };

              alert({
                title: 'Muy bien',
                message: 'La solicitud fue recibida. Pronto nos pondremos en contacto.',
                okButtonText: 'Aceptar'
              });

            } else {
              this.sendError();
            }
          })
          .catch((e) => {
            this.sendError();
          })
          .finally(() => {
            this.sending = false;
          })
          ;
      },

      sendError(){
          alert({
            title: 'Alerta',
            message: 'La solicitud no pudo ser enviada. Intente de nuevo más tarde.',
            okButtonText: 'Aceptar'
          });
      },

      checkBox(type) {
        this.checks[type] = !this.checks[type];
        if(this.checks[type]){
          this.input[type] = 'Sí';
        } else {
          this.input[type] = 'No';
        }
      },

      openPicker(items, item) {
        this.$showModal(ListPickerModal, {
          fullscreen: true,
          props: {
            items: items,
          }
        })
        .then(d => {
          this.input[item] = d;
        })
      },

      openDatePicker(type) {
        this.$showModal(DatePicker, {
          props: {
            minDate: new Date(),
          },
          fullscreen: true
        })
        .then(d => {
          if(d){
            this.input[type] = d.formatted;
          }
        })
        ;
      },

      increment(field, val){
        this.input[field] += val;
        if(this.input[field] < 0) this.input[field] = 0;
      },

      // onDateSelected(type){
      //   this.date = 'type';
      //   this
      //     .modalTo(Calendar)
      //     .then(v => {
      //       this.input[type] = v;
      //     });
      // },

      modal() {
        this.modalTo('ReservationSports');
      }
    },


  computed: {
    userText(){
      return this.input.user || 'Tipo de usuario';
    },

    spaceText(){
      return this.input.space || 'Salón o Zona';
    },

    drinksImage() {
      return this.checks.drinks ? 'res://input_check_on' : 'res://input_check_off';
    },

    foodsImage() {
      return this.checks.foods ? 'res://input_check_on' : 'res://input_check_off';
    },

  },

};
</script>

<style scoped lang="scss">
  @import '../scss/app-variables';

  .page-padding
  {
    margin-left: 10;
    margin-right: 10;
  }

  .list-picker
  {
    background: #94a1a7;
    padding: 0 4;
    margin: 5 10;
    vertical-align: center;

    .label
    {
      padding-left: 6px;
      vertical-align: center;
    }

    .arrow
    {
      vertical-align: center;
    }
  }

  .input-field
  {
    placeholder-color: #99FFFFFF;
  }

  .date-picker
  {
    background: #94a1a7;
    padding: 0;
    // padding: 4 4;
    margin: 5 10;
    min-height: 40;

    &.active
    {
      background: $blue-2;
      
      .minilabel
      {
        color: $white;
      }
    }

    .label
    {
      padding: 0 10;
    }

    .minilabel
    {
      padding: 4 0 0 10;
      font-size: $font-size-s1;
      color: $blue-1;
    }
  }
</style>
