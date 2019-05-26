<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">

      <MenuBar/>

      <TitleBar :title="title" />

      <AbsoluteLayout>
        <Pager height="100%" width="100%" for="item in items" left="0" ref="pager">
          <v-template>
            <GridLayout rows="auto, *">
              <Image row="0" width="100%" class="ico" :src="item.image" stretch="aspectFill"></Image>
              <Label row="1" class="desc" textWrap="true" verticalAlignment="top" :text="item.body" />
            </GridLayout>
          </v-template>
        </Pager>

        <DockLayout isPassThroughParentEnabled="true" top="110" stretchLastChild="false" width="100%" class="carousel-controls">
          <Label @tap="prevPage" dock="left"  class="fa color-green-1 arrow" :text="'\uf104'" />
          <Label @tap="nextPage" dock="right" class="fa color-green-1 arrow" :text="'\uf105'" />
        </DockLayout>

      </AbsoluteLayout>


    </StackLayout>
  </Page>
</template>

<script>
  import Vue from 'nativescript-vue';
  import sideDrawer from '~/mixins/sideDrawer'
  import Pager from 'nativescript-pager/vue';

  import {Cache} from 'tns-core-modules/ui/image-cache';
  import {fromFile, fromNativeSource} from 'tns-core-modules/image-source';

  import TitleBar from '~/components/TitleBar';
  import MenuBar from '~/components/MenuBar';

  Vue.use(Pager);
  // import Deportes from "./Deportes";



  export default {
    mixins: [ sideDrawer ],

    components: {
      TitleBar,
      MenuBar
    }, 

    props: ['title', 'itemss'],
    data() {
      return {
        items: [
            {
                "body": "Lorem 1\r\n",
                "image": "https://jupiter.binit.co/cesap/sites/default/files/styles/sc_6/public/iu_7.jpeg?itok=GN8vFQcY"
            },
            {
                "body": "Lorem 2\r\n",
                "image": "https://jupiter.binit.co/cesap/sites/default/files/styles/sc_6/public/iu-3_6.jpeg?itok=EYP459mi"
            },
            {
                "body": "Lorem 3\r\n",
                "image": "https://jupiter.binit.co/cesap/sites/default/files/styles/sc_6/public/iu-2_6.jpeg?itok=RCtYR6El"
            }
        ],

        pager: null,
      }
    },
    methods: {
      prevPage(){
        --this.$refs.pager.nativeView.selectedIndex;
      },

      nextPage(){
        ++this.$refs.pager.nativeView.selectedIndex;
      }
    },

    created(){
      this.items = JSON.parse(this.itemss);
    },

    _created(){
      const cache = new Cache();
      cache.placeholder = fromFile("~/assets/img/login-logo.png");
      // this.page_title = this.title;
      this.pager = this.$refs.pager;
      this.items = JSON.parse(this.itemss).map(v => {
        const url = v.image;
        v.image = cache.placeholder;
        const image = cache.get(url);
        if(image){
          v.image = fromNativeSource(image);
        } else {
          cache.push({
            key: url,
            url: url,
            completed: (image, key) => {
              if(url === key){
                v.image = fromNativeSource(image);
              }
            }
          });
        }
        return v;
      });
      // this.items =
      // console.log(this.itemes);
    }
  };
</script>

<style scoped lang="scss">
  .desc
  {
    padding: 10;
  }

  .carousel-controls
  {
    Label
    {
      padding-top: 15;
      text-align: center;
      font-size: 25;
      margin: 0 10;
      width: 30;
      height: 60;
    }
  }
</style>
