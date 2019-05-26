<template>
    <StackLayout class="bg-blue-1">
      <AbsoluteLayout class="content-head">
          <Label left="0" top="0" class="nav-title text-center" :text="title" />
          <Label left="0" top="0" v-if="displayBack" @tap="$navigateBack" class="fa nav-back" :text="'\uf104'" />
      </AbsoluteLayout>
      <StackLayout class="line" />
    </StackLayout>
</template>

<script>

  export default {
    name: 'TitleBar',

    props: {
      title: {
        default: 'CESAP'
      },
      
      showLine: {
        default: true,
      },
      
      showBack: {
        default: true,
      },
    },

    data() {
      return {
        pageTitle: 'Empty'
      }
    },

    computed: {
      displayBack(){
        // return !this.$store.getters.isHistoryClean && this.showBack;
        return this.showBack;
      }
    },

    createdNone(){
      this.title = this.title||'CESAP';
      this.showLine = this.showLine == undefined ? true : this.showLine;
      // console.log(this.title);
      // console.log(this.showLine);
      // this.pageTitle = this.title;
    }
  };

</script>

<style lang="scss" scoped>
  .bg-blue-1
  {
    background: #28424e;
  }
</style>
