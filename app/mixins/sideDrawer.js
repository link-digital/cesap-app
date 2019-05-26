import * as application from "tns-core-modules/application";

export default {
  data () {
    return {
      // we'll use this to enable gestures on our sideDrawer.
      gesturesEnabled: false,
      drawerEnabled: true,
    }
  },
  computed: {
    // drawerElement points to the drawer node using vue $refs
    drawerElement () { return (this.$refs && this.$refs.drawer) || null },
    // drawer is responsible for getting and setting the sideDrawer property in vuex state.
    drawer: {
      get () { return this.$store.getters.sideDrawer },
      set (v) { return this.$store.commit('setSideDrawer', v) }
    }
  },
  watch: {
    // we watch the drawer prop for changes and open/close the sideDrawer accordingly
    drawer (v) {
      console.log('*************Drawer enabled', this.drawerEnabled);
      if (this.drawerElement) {
        return v ?
          this.drawerElement.nativeView.showDrawer() :
          this.drawerElement.nativeView.closeDrawer()
      }
    }
  },
  methods: {
    navTo (page, opts) {
      opts = opts || {};
      this.$store.dispatch('clearHistory', {state: false});
      return this.$navigateTo(this.$routes[page], opts);
    },
    goTo (page, opts) {

      if(typeof page === "string"){
        page = this.$routes[page];
      }

      opts = opts || {};
      opts.clearHistory = true;
      this.$store.dispatch('clearHistory', {state: true});
      return this.$navigateTo(page, opts);
    },
    modalTo (page, opts) {
      opts = opts || {};
      opts.fullscreen = true;

      if(typeof page === "string"){
        page = this.$routes[page];
      }

      return this.$showModal(page, opts);
    },
    openDrawer () {
      this.drawer = true
    },

    closeDrawer () {
      this.drawer = false
    },
    
    disableGestures(){
      this.gesturesEnabled = false;
    },

    disableDrawer(){
      console.log('*************Drawer disabled', this.drawerEnabled);
      this.drawerEnabled = false;
    },

    captureBack(args){
      if(this.drawer){
        this.closeDrawer();
        args.cancel = true;
      }
    },

    onDrawerOpening(){
      console.log('*************Drawer enabled', this.drawerEnabled);
      if(!this.drawerEnabled){
        this.closeDrawer();
        return false;
      }
    },
  },

  mounted(){
    if(application.android){
      application.android.on(application.AndroidApplication.activityBackPressedEvent, this.captureBack);
    }
  }
}
