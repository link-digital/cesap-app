<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">

      <MenuBar/>

      <TitleBar title="DIRECTORIO" />

      <ScrollView>

        <StackLayout>

          <GridLayout class="list-picker" rows="40" columns="*, 20" >
            <Label class="label" row="0" col="0" text="guestText"></Label>
            <Label :text="'\uf0d7'" row="0" col="1" class="fa color-green-1 arrow" />
          </GridLayout>

          <GridLayout class="list-picker" rows="40" columns="*, 20" >
            <Label class="label" row="0" col="0" text="guestText"></Label>
            <Label :text="'\uf0d7'" row="0" col="1" class="fa color-green-1 arrow" />
          </GridLayout>

          <GridLayout rows="50" columns="*, *">
            <StackLayout class="date-picker" :class="{active: dateInActive}" row="0" col="0">
              <Label class="minilabel" text="Check in"></Label>
              <Label class="label" text="input.checkIn"></Label>
            </StackLayout>
            <StackLayout class="date-picker" :class="{active: dateOutActive}" row="0" col="1" >
              <Label class="minilabel" text="Check out"></Label>
              <Label class="label" text="input.checkOut"></Label>
            </StackLayout>
          </GridLayout>

          <Button @tap="garbage" backgroundColor="red">GC</Button>

          <Image class="ico" src="~/assets/img/directory.png" stretch="aspectFill" />

        </StackLayout>

      </ScrollView>

    </StackLayout>
   </Page>
</template>

<script>

    import TitleBar from '~/components/TitleBar';
    import MenuBar from '~/components/MenuBar';
    import {GC} from "tns-core-modules/utils/utils";


    export default {

        components: {
        TitleBar,
        MenuBar
        }, 

        methods: {
          garbage(){
            GC();
            console.log('Grabage **************');
          }
        },

    };
</script>

<style scoped lang="scss">

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
  padding: 3 4;
  margin: 5 10;

  &.active
  {
    background: blue;
    
    .minilabel
    {
    color: white;
    }
  }

  .label
  {
    padding-left: 6;
    padding-right: 6;
  }

  .minilabel
  {
    padding-left: 6;
    height: 15;
    font-size: 11;
    color: blue;
  }
  }
</style>
