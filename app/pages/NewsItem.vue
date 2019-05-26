<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">
      <MenuBar/>

      <TitleBar title="ACTUALIDAD" />

      <ScrollView>

        <StackLayout>
        
        <ActivityIndicator :busy="processing" v-show="processing"  class="m-t-20"></ActivityIndicator>

        <StackLayout class="m-t-20 node-container" v-if="node">
          <Label :text="node.type" class="m-b-5 font-size-s1 color-green-1"></Label>
          <Label :text="node.date" class="m-b-5 font-size-s1"></Label>
          <Label :text="node.title" class="font-size-l1"></Label>
          <Image class="logo m-tb-15" :src="node.image.src"></Image>
          <Label class="body" :text="node.body" textWrap="true"></Label>
        </StackLayout>

        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer';
import TitleBar from '~/components/TitleBar'
import MenuBar from '~/components/MenuBar'

export default {
  mixins: [ sideDrawer ],
  components: {
      TitleBar,
      MenuBar
  }, 
  props: ['nid'],
  data () {
    return {
      title: '',
      // nodes: [],
      node: null,
      processing: true,
    }
  },

  created(){
    this.$api.get('views/news/' + this.nid)
    .then(d => {
      // this.nodes = d.nodes;
      this.node = d.nodes[0];
      this.node.body = this.node.body.replace(/\n/g, "\n\n");
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() =>  {
      this.processing = false;
    });
  }
}
</script>

<style lang="scss" scope>

  .node-container
  {
    padding: 0 15;
  }

  .body
  {
    font-weight: 400;
    line-height: 4;
  }

</style>
