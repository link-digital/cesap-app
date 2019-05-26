<template>
    <Page actionBarHidden="true">
      <StackLayout>
        <GridLayout class="page page-date-picker" columns="*" rows="auto, *, auto">
          <StackLayout row="0" class="header" orientation="horizontal">
              <Button @tap="$modal.close()" class="close-modal">CANCELAR</Button>
          </StackLayout>

          <DatePicker row=1 height="100%" v-model="input.date" :minDate="minDate" @dateChange="onDateChange" />


          <Button 
            @tap="$modal.close(input)"
            row="2" text="CONTINUAR" class="btn btn-green-1" style="margin-left:10; margin-right: 10; margin-bottom: 10" />
        </GridLayout>
      </StackLayout>
    </Page>
</template>

<script>
  import DatePicker from "tns-core-modules/ui/date-picker"

  export default {
    name: 'DatePickerModal',

    props: [
      'minDate'
    ],

    data(){
      return{
        input: {
          date: new Date(),
          formatted: ''
        }
      }
    },

    methods: {
      onDateChange(date){
        this.input.formatted = this.formatDate(date.object.date);
      },

      formatDate(date){
        let y = date.getFullYear();
        let m = (date.getMonth() + 1);
        if(m < 9) m = '0' + m;
        let d = date.getDate();
        if(d < 9) d = '0' + d;

        return y + '-' + m + '-' + d;
      }
    },

    mounted(){
      this.input.formatted = this.formatDate(this.input.date);
    }

  };
</script>
