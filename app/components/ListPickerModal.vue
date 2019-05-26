<template>
    <Page actionBarHidden="true" xmlns:svg="nativescript-svg">
        <StackLayout class="page">
          <StackLayout rows="auto" columns="auto, *" class="header" orientation="horizontal">
              <Button @tap="$modal.close(value)" class="close-modal">CERRAR</Button>
              <Label left="0" row="0" col="0" @tap="$navigateBack" class="fa nav-back" :text="'\uf104'"></Label>
          </StackLayout>

          <GridLayout columns="*" rows="*">
            <ListView for="item in items" class="list-view" @itemTap="onItemTap">
              <v-template>
                <Label :text="item" />
              </v-template>
            </ListView>
          </GridLayout>

        </StackLayout>
    </Page>
</template>

<script>

  export default {
    name: 'ListPickerModal',

    props: [
      'items'
    ],
    
    data() {
      return {
        value: null
      };
    },

    methods: {
      indexChange(d) {
        this.value = this.items[d.value];
      },

      onItemTap(e) {
        this.value = e.item;
        this.$modal.close(this.value);
      },
    }
  };
</script>

<style scoped type="scss">
@import "~/scss/app-variables";
</style>