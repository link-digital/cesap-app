<template>
  <GridLayout rows="auto" columns="auto,*" class="header" orientation="horizontal">
      <Button v-show="showButton" col="0" class="fa btn-menu" :text="'\uf0c9'" horizontalAlignment="left" fontSize="20" @tap="openDrawer()"></Button>
      <Image col="1" class="ico" src="~/assets/img/app-header.png" height="35" horizontalAlignment="center" />
  </GridLayout>
</template>

<script>

  import sideDrawer from '~/mixins/sideDrawer'

  export default {
    mixins: [ sideDrawer ],
    name: 'MenuBar',
    props: {
      showButton: {
        default: false
      }
    },
    mounted(){
      this.drawerEnabled = this.showButton;
      // this.gesturesEnabled = this.showButton;
      if(!this.showButton){
        this.disableDrawer();
      }
    }
  };

</script>
