<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">
    <MenuBar/>

    <TitleBar :title="title" />

    <ScrollView>
      <StackLayout class="image-list">

        <ActivityIndicator :busy="processing" v-show="processing"  class="m-t-20"></ActivityIndicator>

        <FlexboxLayout flexWrap="wrap" alignItems="center">
          <template class="item" v-for="(space, index) in items">
            <Image @tap="selfTo(space)" :key="'i'+index" width="45%" class="ico" :src="space.image" stretch="aspectFit"></Image>
            <Label @tap="selfTo(space)" :key="'t'+index" verticalAlignment="middle" width="49.5%" class="title" paddingLeft="10" :text="space.title"></Label>
            <Label @tap="selfTo(space)" :key="'a'+index" verticalAlignment="middle" width="5%" class="fa color-green-1 arrow" :text="'\uf105'" fontSize="20" />
            <Label @tap="selfTo(space)" :key="'l'+index" width="100%" height="1" borderBottomWidth="1" borderColor="#ffffff" />
          </template>
        </FlexboxLayout>

      </StackLayout>
    </ScrollView>

    </StackLayout>
  </Page>
</template>

<script>
  import sideDrawer from '~/mixins/sideDrawer';
  import SpacesGallery from "./SpacesGallery";

  import TitleBar from '~/components/TitleBar';
  import MenuBar from '~/components/MenuBar';

  import Session from "~/system/session";

  export default {
    mixins: [ sideDrawer ],

    components: {
      TitleBar,
      MenuBar
    }, 

    // props: ['tid', 'title'],
    props: {
      tid: {
        default: 0,
      },
      title: {
        default: 'NUESTRAS INSTALACIONES'
      }
    },

    data() {
      return {

        processing: false,

        // page_title: 'NUESTRAS INSTALACIONES',

        items: [],

        __spaces: {"terms":{"0":[{"tid":"19","title":"Alimentos y bebidas","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu_6.jpeg?itok=1ykojxqd"},{"tid":"16","title":"Hotel","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu-3_5.jpeg?itok=EmM71obs"},{"tid":"17","title":"Salones y eventos","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu-2_5.jpeg?itok=qKDMmzyB"},{"tid":"18","title":"Zonas deportivas","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/deportivos.jpg?itok=XH_wsu9-"}],"18":[{"tid":"20","title":"F\u00fatbol","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/deportivos_0.jpg?itok=ZZLFsDGS"},{"tid":"21","title":"Tenis","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/tenis.jpg?itok=zXIUErZZ"}],"21":[{"tid":"22","title":"Bolos","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/bolos.jpg?itok=CYPUKqYe"}]},"nodes":{"22":{"title":"Tenis","items":[{"body":"Tenis 1\r\n","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu-1_6.jpeg?itok=W8SE1JI5"},{"body":"Tenis 2\r\n","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu-2_7.jpeg?itok=gQeIeASz"},{"body":"Tenis 3\r\n","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu-3_7.jpeg?itok=TZQVFkj4"}]},"20":{"title":"F\u00fatbol","items":[{"body":"Lorem 1\r\n","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu_7.jpeg?itok=GN8vFQcY"},{"body":"Lorem 2\r\n","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu-3_6.jpeg?itok=EYP459mi"},{"body":"Lorem 3\r\n","image":"https:\/\/jupiter.binit.co\/cesap\/sites\/default\/files\/styles\/sc_6\/public\/iu-2_6.jpeg?itok=RCtYR6El"}]}}},

        spaces: {
          'terms': [],
          'nodes': [],
        },

        _spaces: [
          {
            title: 'HOTEL',
            img: '~/assets/img/spaces/hotel.jpg',
            type: 'list',
            page: 'sports',
          },
          {
            title: 'SALONES & EVENTOS',
            img: '~/assets/img/spaces/salones.jpg',
            type: 'list',
            page: 'sports',
          },
          {
            title: 'ZONAS DEPORTIVAS',
            img: '~/assets/img/spaces/deportivos.jpg',
            type: 'list',
            page: 'sports',
          },
          {
            title: 'ALIMENTOS Y BEBIDAS',
            img: '~/assets/img/spaces/bolos.jpg',
            type: 'gallery',
            page: 'sports',
          },
        ],

        sports: [
          {
            title: 'FÚTBOL',
            img: '~/assets/img/spaces/deportivos.jpg',
            type: 'gallery',
            page: 'News',
          },
          {
            title: 'TENIS',
            img: '~/assets/img/spaces/tenis.jpg',
            type: 'gallery',
            page: 'News',
          },
          {
            title: 'BOLOS',
            img: '~/assets/img/spaces/bolos.jpg',
            type: 'gallery',
            page: 'News',
          },
        ],
      }
    },
    methods: {
      selfTo(space){
        // if(space.type == 'list'){
        if(this.spaces['terms'][space.tid]){
          this.navTo('Spaces', {props: {tid: space.tid, title: space.title}});
        } else {
          if(this.spaces['nodes'][space.tid]){
            this.$navigateTo(SpacesGallery, {props: {
                title: this.spaces['nodes'][space.tid].title.toUpperCase(),
                itemss: JSON.stringify(this.spaces['nodes'][space.tid].items),
              }});
          } else {
            alert({
              title: "CESAP",
              okButtonText: "OK",
              message: 'Oooooops. No tenemos contenido para esta sección. :('
            });
          }
        }
      }
    },
    mounted(){

      if(this.tid == 0){
        this.processing = true;
        this.$api.get('content/installations')
          .then(d => {
            this.spaces = d;

            this.items = this.spaces['terms'][this.tid].map(a => {
              a.title = a.title.toUpperCase();
              return a;
            });

            Session.setJSON('installations', d);

          })
          .catch(e => {
            console.log('******** YUCA *******');
          })
          .finally(() => {
            this.processing = false;
          });
      } else {

        this.spaces = Session.getJSON('installations');

        this.items = this.spaces['terms'][this.tid].map(a => {
          a.title = a.title.toUpperCase();
          return a;
        });
      }

    }
  };
</script>

<style scoped lang="scss">
  .label
  {
    align-items: center;
  }
</style>
