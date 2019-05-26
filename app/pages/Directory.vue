<template>
  <Page actionBarHidden="true" xmlns:svg="nativescript-svg">
    <StackLayout class="page">

      <MenuBar/>

      <TitleBar title="DIRECTORIO" />

      <StackLayout class="pbx">
        <Image src="~/assets/img/pbx.jpg" stretch="aspectFit" @tap="callToPolice" />
      </StackLayout>

      <StackLayout class="titles" orientation="horizontal">
        <Label text="DEPENDENCIA" class="color-green-1" width="50%" />
        <Label text="EXTENSIÓN" class="color-green-1 text-right" width="50%" />
      </StackLayout>

      <GridLayout columns="*" rows="*">
        <ListView for="item in directory" class="list-view">
        <v-template>
          <StackLayout orientation="horizontal">
            <Label :text="item.name" width="65%" />
            <Label :text="item.ext" class="text-right" width="35%" horizontalAlignment="right" />
          </StackLayout>
        </v-template>
        </ListView>
      </GridLayout>

    </StackLayout>
  </Page>
</template>

<script>
  import sideDrawer from '~/mixins/sideDrawer'

  import TitleBar from '~/components/TitleBar';
  import MenuBar from '~/components/MenuBar';

  import {dial} from 'nativescript-phone'

  export default {
    mixins: [ sideDrawer ],

    components: {
    TitleBar,
    MenuBar
    }, 

    data() {
      return{
      directory: [
        {
          name: 'Admin hotel',
          ext: '416',
        },
        {
          name: 'Administración',
          ext: '401',
        },
        {
          name: 'Afiliaciones',
          ext: '430',
        },
        {
          name: 'Alimentos y bebidas',
          ext: '142',
        },
        {
          name: 'Almacén',
          ext: '413',
        },
        {
          name: 'Archivo central',
          ext: '418',
        },
        {
          name: 'Asesoría jurídica',
          ext: '448',
        },
        {
          name: 'Atención al cliente',
          ext: '407 - 417',
        },
        {
          name: 'Bolera',
          ext: '436',
        },
        {
          name: 'Café gourmet',
          ext: '432',
        },
        {
          name: 'Cafetería piscina',
          ext: '135',
        },
        {
          name: 'Cámaras',
          ext: '440',
        },
        {
          name: 'Deportes',
          ext: '422 - 514',
        },
        {
          name: 'Economato',
          ext: '451 - 426',
        },
        {
          name: 'Eventos',
          ext: '145 - 511',
        },
        {
          name: 'Guardia',
          ext: '428',
        },
        {
          name: 'Lavandería',
          ext: '452',
        },
        {
          name: 'Oficina contratos',
          ext: '405 - 419 - 412',
        },
        {
          name: 'Planeación',
          ext: '458',
        },
        {
          name: 'Presupuesto-contabilidad',
          ext: '144',
        },
        {
          name: 'Recepción hotel',
          ext: '151',
        },
        {
          name: 'Recepción piscina',
          ext: '442',
        },
        {
          name: 'Sauna',
          ext: '106',
        },
        {
          name: 'Sub almacén',
          ext: '137',
        },
        {
          name: 'Talento humano',
          ext: '425',
        },
        {
          name: 'Tejo y billares',
          ext: '453',
        },
        {
          name: 'Telemática',
          ext: '429',
        },
        {
          name: 'Tesorería',
          ext: '421',
        }
      ]
    }
    },

    methods: {
      callToPolice(){
        dial('+5717445124');
      },
    }

  };
</script>

<style scoped lang="scss">
  .pbx
  {
    padding-left: 10;
    padding-right: 10;
    margin-top: 10;
    margin-bottom: 10;
  }

  .list-view
  {

    Label
    {
      padding: 10 10 10 10;
    }
  }

  .titles
  {
    padding-left: 10;
    padding-right: 10;
    margin-top: 10;
    margin-bottom: 10;
  }
</style>
