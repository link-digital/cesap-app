<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">

      <MenuBar/>

      <TitleBar title="ACTUALIDAD" />

      <ScrollView @scroll="onScroll" ref="newsContainer">

        <StackLayout>
        
          <StackLayout v-for="(piece, index) in events" :key="index" class="news-container">
            <Image @tap="openItem(piece.nid)" class="logo m-b-15" :src="piece.image.src"></Image>
            <Label @tap="openItem(piece.nid)" :text="piece.type" class="m-b-5 font-size-s1 color-green-1"></Label>
            <Label @tap="openItem(piece.nid)" :text="piece.date" class="m-b-5 font-size-s1"></Label>
            <Label @tap="openItem(piece.nid)" :text="piece.title" textWrap="true"></Label>
          </StackLayout>

          <Label text="Fin de la lista" horizontalAlignment="center" v-show="page > 4" class="m-tb-20" />

          <ActivityIndicator v-show="processing" :busy="processing" class="m-t-20"></ActivityIndicator>

        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
import NewsItem from './NewsItem';
import TitleBar from '~/components/TitleBar';
import MenuBar from '~/components/MenuBar';
import Session from "~/system/session";
import * as application from "tns-core-modules/application";

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].nid === a[j].nid)
                a.splice(j--, 1);
        }
    }

    return a;
}

export default {
  mixins: [ sideDrawer ],

  components: {
    TitleBar,
    MenuBar
  }, 


  data () {
    return {
      events: [],
      processing: false,
      page: 0,
    }
  },

  methods: {
    openItem(nid){
      this.$navigateTo(NewsItem, {props: {nid: nid}});
    },

    onScroll(data){
      let bounceSize = 0;
      if(application.ios){
        bounceSize = 100;
      }
      
      if(data.scrollY - bounceSize >= data.object.scrollableHeight && !this.processing){
        this.loadPage(1);
      }
    },

    loadPage(){
      if(this.page > 4) return;

      let cache = Session.getJSON('news');
      if(cache&&cache.events){
        this.events = cache.events;
      } 

      this.processing = true;
      this.$api.get('views/news?page=' + this.page)
        .then(d => {
          this.page++;

          if(this.page <= 1){
            Session.setJSON('news', {
              page: this.page,
              events: d.nodes,
            });
            this.events = arrayUnique(d.nodes.concat(this.events));
          } else {
            this.events = arrayUnique(this.events.concat(d.nodes));
          }
          this.processing = false;
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.processing = false;
        });
    }
  },

  created(){
    // Session.setJSON('news', []);
    this.loadPage();
  },

}
</script>

<style lang="scss" scope>
  .news-container
  {
    padding: 25 15;
    border-bottom-width: 1;
    border-bottom-color: white;
  }
</style>
