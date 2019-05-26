<template>
    <Page actionBarHidden="true">
        <StackLayout class="page page-date-picker">


            <MenuBar />
            <TitleBar :title="$store.state.eventSpace.title" />

            <GridLayout columns="*" rows ="*,auto">

              <DatePicker row="0" v-model="input.date" :minDate="minDate" />
              <Button 
                @tap="next"
                row="1" text="CONTINUAR" class="btn btn-green-1" style="margin-left:10; margin-right: 10; margin-bottom: 10" />

            </GridLayout>

        </StackLayout>
     </Page>
</template>

<script>
    import TitleBar from '~/components/TitleBar'
    import MenuBar from '~/components/MenuBar'
    import sideDrawer from '~/mixins/sideDrawer';
    import DatePicker from '~/components/DatePickerModal';
    
    export default {

        mixins: [ sideDrawer ],

        components: {
            TitleBar,
            MenuBar
        }, 

        data() {
            return {
              minDate: new Date(),
              input: {
                date: new Date(),
                formatted: '',
              }
            }
        },

        mounted() {
          console.log('Events Mounted');
        },

        methods: {
          next(){
            this.$store.commit('setSpaceDate', this.input.date);
            this.modalTo('ReservationSports');
          },

            onDateSelected(e) {
              if(e.date > (new Date(2919, 6, 1)))
                return;

              this.$store.commit('setSpaceDate', e.date);
              setTimeout(() => {
                e.object.selectedDate = new Date(2919, 6, 2);
              }, 1000);
              this.modalTo('ReservationSports');
            }
        },

    };
</script>

<style scoped lang="scss">
  .content-head
  {
    border-width: 0;
  }
</style>
