<template>
  <Page actionBarHidden="true" ref="myPage">
    <StackLayout  v-if="showPage" class="page" ref="pageContainer">

      <MenuBar/>

      <TitleBar title="HOTEL" />

      <ScrollView>

      <StackLayout>

        <GridLayout class="list-picker" rows="40" columns="*, 20" @tap="openPicker(guests, 'guest')" >
          <Label class="label" row="0" col="0" :text="guestText"></Label>
          <Label :text="'\uf0d7'" row="0" col="1" class="fa color-green-1 arrow" />
        </GridLayout>

        <GridLayout class="list-picker" rows="40" columns="*, 20" @tap="openPicker(rooms, 'room')" >
          <Label class="label" row="0" col="0" :text="roomText"></Label>
          <Label :text="'\uf0d7'" row="0" col="1" class="fa color-green-1 arrow" />
        </GridLayout>

        <GridLayout rows="auto" columns="*, *">
          <StackLayout class="date-picker" row="0" col="0" @tap="openDatePicker('checkIn')">
            <Label class="minilabel" text="Check in"></Label>
            <Label class="label" :text="input.checkIn"></Label>
          </StackLayout>
          <StackLayout class="date-picker" row="0" col="1" @tap="openDatePicker('checkOut')">
            <Label class="minilabel" text="Check out"></Label>
            <Label class="label" :text="input.checkOut"></Label>
          </StackLayout>
        </GridLayout>

        <Label class="page-padding font-size-xl color-green-1 m-tb-20" text="ACOMPAÑANTES" row="0" col="0"></Label>

        <GridLayout rows="auto" columns="*, *" class="guests">

          <GridLayout rows="auto,auto" columns="*, *, *" row="0" col="0">
          <Label text="Adultos" colSpan="3" class="m-b-5" row="0" col="0"></Label>
          <Label @tap="increment('adults', -1)" class="increment fa" :text="'\uf068'" row="1" col="0"></Label>
          <Label class="counter text-center" :text="input.adults" row="1" col="1" ></Label>
          <Label @tap="increment('adults', 1)" class="increment fa" :text="'\uf067'" row="1" col="2" ></Label>
          </GridLayout>

          <GridLayout rows="auto,auto" columns="*, *, *" row="0" col="1">
          <Label colSpan="3" text="Niños" class="m-b-5" row="0" col="0"></Label>
          <Label @tap="increment('children', -1)" class="increment fa" :text="'\uf068'" row="1" col="0"></Label>
          <Label class="counter text-center" :text="input.children" row="1" col="1" ></Label>
          <Label @tap="increment('children', 1)" class="increment fa" :text="'\uf067'" row="1" col="2" ></Label>
          </GridLayout>

        </GridLayout>

        <StackLayout class="images">
          <ActivityIndicator v-show="processing" :busy="processing"></ActivityIndicator>

          <GridLayout class="camera-grid" rows="auto" columns="*,60" v-for="(item, i) in images" :key="i">
            <Image row="0" col="0" :src="item" stretch="none" class="preview" />
            <Label row="0" col="1" :text="'\uf00d'" class="fa font-size-l2" verticalAlignment="center" horizontalAlignment="center" @tap="removeImage(i)" />
          </GridLayout>
        
          <GridLayout class="camera-grid" rows="auto" columns="*,60" v-for="i in (input.children - images.length)" :key="i">
            <Label class="label" row="0" col="0" text="Adjunte documento de identidad" verticalAlignment="center" />
            <Label row="0" col="1" :text="'\uf030'" class="fa font-size-l2" @tap="selectImageDialog" horizontalAlignment="center" />
          </GridLayout>
        </StackLayout>

        <Label class="page-padding font-size-l color-green-1 m-tb-20" text="IMPORTANTE:"></Label>
        <Label class="page-padding m-b-10 font-roboto-cnd-reg" textWrap="true" text="Los afiliados solo pueden hacer uso de la habitación doble con su cónyuge o compañero permanente registrado en el sistema DITAH."></Label>
        <Label class="page-padding m-b-10 font-roboto-cnd-reg" textWrap="true" text="Al momento de ingresar al hotel se deben presentar los documentos de identidad de todas las personas que se van a hospedar, en especial los niños. Para el caso de invitados además de sus documentos de identificación tambien deben presentar el documento del afiliado."></Label>

        <Button class="page-padding btn btn-green-1 m-tb-20" @tap="send" :isEnabled="!sending" :text="sending ? '...' : 'SOLICITAR RESERVA'" />

      </StackLayout>

      </ScrollView>

    </StackLayout>
   </Page>
</template>

<script>
  import * as imagepicker from "nativescript-imagepicker";
  import * as camera from "nativescript-camera";
  import { screen } from "tns-core-modules/platform";
  import { action } from "tns-core-modules/ui/dialogs";
  import { fromAsset } from "tns-core-modules/image-source"

  import sideDrawer from '~/mixins/sideDrawer'
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
      MenuBar,
    },

    data() {
      return {
        processing: false,
        sending: false,
        events: [],
        guests:['Afiliado', 'Empresarial', 'Invitado', 'Corporativo', 'Extranjero'],
        rooms:['Sencilla', 'Familiar', 'Doble', 'Junior'],
        dateInActive: false,
        dateOutActive: false,
        images: [],
        showPage: true,
        input: {
          guest: '',
          room: '',
          checkIn: '',
          checkOut: '',
          adults: 0,
          children: 0,
          images: []
        }
      }
    },

    methods: {

      send() {

        if(
          this.input.guest == '' ||
          this.input.room == '' ||
          this.input.checkIn == '' ||
          this.input.checkOut == ''
        )
        {

          alert({
            title: 'Alerta',
            message: 'Debe completar todos los campos.',
            okButtonText: 'Aceptar'
          });

          return;
        }

        if(this.input.checkIn >= this.input.checkOut){
          alert({
            title: 'Alerta',
            message: 'La fecha de salida debe ser posterior a la de llegada.',
            okButtonText: 'Aceptar'
          });

          return;
        }

        if(this.input.adults == 0){
          alert({
            title: 'Alerta',
            message: 'Debe asistir por lo menos un adulto.',
            okButtonText: 'Aceptar'
          });

          return;

        }

        if(this.images.length < this.input.children){
          alert({
            title: 'Alerta',
            message: 'Debe adjuntar una imagen por cada niño.',
            okButtonText: 'Aceptar'
          });

          return;
        }

        this.sending = true;
        EventsApi.post('hotel', this.input)
          .then(d => {
            if(d&&d.status == 'success'){

              this.images = [];
              this.input = {
                guest: '',
                room: '',
                checkIn: '',
                checkOut: '',
                adults: 0,
                children: 0,
                images: []
              };

              alert({
                title: 'Muy bien',
                message: 'La solicitud fue recibida. Pronto nos pondremos en contacto.',
                okButtonText: 'Aceptar'
              }).then(() => {
                console.log('GotoHome ************');
                this.goTo('Home');
              });

            } else {
              this.sendError(e);
            }
          })
          .catch((e) => {
            this.sendError(e);
          })
          .finally(() => {
            this.sending = false;
          })
          ;


      },

      sendError(e){
        alert({
          title: 'Alerta',
          message: 'La solicitud no pudo ser enviada. Intente de nuevo más tarde.',
          okButtonText: 'Aceptar'
        });
      },

      removeImage(index){
        this.images.splice(index, 1);
      },

      selectImageDialog(){
        action({
          message: 'Seleccione el origen',
          cancelButtonText: 'Cancelar',
          actions: ['Cámara', 'Galería']
        }).then( r => {
          if(r == 'Cámara'){
            this.showCamera();
          } else if(r == 'Galería'){
            this.showGallery();
          }
        });
      },

      showCamera(){
        camera
          // .requestCameraPermissions()
          // .requestPhotosPermissions()
          .requestPermissions()
          .then(
            () => {
              camera.takePicture({ width: 800, height: 800, keepAspectRatio: true, saveToGallery: false })
              .then( element => {
                  this.appendImageAsset(element);
              })
              .catch(e => {
                console.log(e);
              });

            },
            (e) => {
              console.log(e);
            }
          );
      },

      showGallery(){

        let context = imagepicker.create({ mode: "single" });
        
        context.authorize()
          .then(() => {
              return context.present();
          })
          .then((selection) => {
              
              selection.forEach(element => {
                this.appendImageAsset(element);
              });

          }).catch(function (e) {
              console.log('RH 319', e);
          });

      },

      appendImageAsset(element){
        this.processing = true;
        // let screenScale = screen.mainScreen.scale;

        // element.options.width = 800 / screenScale;
        // element.options.height = 800 / screenScale;
        let imgAspect = 1;
        if(element.ios){
          imgAspect = element.ios.pixelWidth/element.ios.pixelHeight;
        } else if(element.android) {
          imgAspect = element.android.pixelWidth/element.android.pixelHeight;
        } else if(element.nativeImage.size.width) {
          imgAspect = element.nativeImage.size.width/element.nativeImage.size.height;
        }

        if(imgAspect < 1){
          element.options.width = 800 * imgAspect;
          element.options.height = 800;
        } else {
          element.options.width = 800;
          element.options.height = 800 / imgAspect;
        }

        element.options.autoScaleFactor = false;

        fromAsset(element).then( s => {
          let b64 = s.toBase64String('jpg', 50);
          this.input.images.push("data:image/jpg;base64," + b64);

          if(imgAspect < 1){
            element.options.width = 100 * imgAspect;
            element.options.height = 100;
          } else {
            element.options.width = 100;
            element.options.height = 100 / imgAspect;
          }

          element.options.autoScaleFactor = true;
          this.images.push(element);

        }).finally(() => {
            this.processing = false;
        });
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

      openPicker(items, item) {
        this.$showModal(ListPickerModal, {
        props: {
          items: items,
        },
          fullscreen: true
        })
        .then(d => {
          this.input[item] = d;
        })
      },

      increment(field, val){
        this.input[field] += val;
        if(this.input[field] < 0) this.input[field] = 0;

        if(field == 'children'){
          if(this.input.images.length > this.input.children){
            this.input.images = this.input.images.slice(0, this.input.children);
            this.images = this.images.slice(0, this.input.children);
          }
        }
      },

      selectGuest(v){
        this.guest = v;
      },

      // onDateSelected(type){
      //   this
      //     .modalTo(Calendar)
      //     .then(v => {
      //       this.input[type] = v;
      //     });
      // }

    },


  computed: {
    guestText(){
      return this.input.guest || 'Tipo de huésped';
    },

    roomText(){
      return this.input.room || 'Tipo de habitación';
    },
  },

  };
</script>

<style scoped lang="scss">
  @import '../scss/app-variables';

  .images
  {
    margin-top: 30;
  }

  .camera-grid
  {
    border-bottom-width: 1;
    border-color: #fff;
    margin-bottom: 10;
    padding-bottom: 10;

    .preview
    {
      margin-left: 10;
    }

    .label
    {
      margin-left: 10;
    }

    .fa
    {
      padding: 10;
    }
  }

  .page-padding
  {
    margin-left: 10;
    margin-right: 10;
  }

  .guests
  {
    .increment
    {
      border-width: 1;
      border-color: #5d92a6;
      text-align: center;
      padding-top: 13;
      padding-bottom: 10;
      // height: 40;
      vertical-align: center;
      vertical-align: middle;
    }

    .counter
    {
      padding-top: 8;
      padding-bottom: 10;
    }

    GridLayout
    {
      padding-right: 15;
      padding-left: 15;
    }
  }

  .list-picker
  {
  background: #94a1a7;
  padding: 0 4;
  margin: 5 10;

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
