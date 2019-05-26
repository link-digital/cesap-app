<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">

      <MenuBar/>

      <TitleBar title="PQRS" />

      <GridLayout padding="20" columns="*" rows="auto,auto,auto">
        <Label  col="0" row="0" class=" font-size-l1" text="Peticiones, quejas, reclamos y sugerencias" textWrap="true" />
        <Label  col="0" row="1" class="" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec quam sit amet orci rutrum egestas. Quisque ac tortor id lacus aliquet efficitur quis sed arcu." textWrap="true" />
        <Button col="0" row="2" class="m-t-20 btn btn-green-1" @tap="send" text="IR A PQRS" />
      </GridLayout>

    </StackLayout>
  </Page>
</template>

<script>
  import TitleBar from '~/components/TitleBar';
  import MenuBar from '~/components/MenuBar';
  import {openUrl} from "utils/utils";

  export default {

    components: {
    TitleBar,
    MenuBar
    },

    methods: {
      send(){
        openUrl('https://www.policia.gov.co/pqrs');
      }
    }

  };
</script>

<style lang="scss" scoped>
  .page-padding
  {
    padding-left: 10;
    padding-right: 10;
  }
</style>
