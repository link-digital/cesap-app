<template>
    <Page actionBarHidden="true" xmlns:svg="nativescript-svg">
        <StackLayout class="page">
            <MenuBar/>

            <TitleBar title="RESERVAS" />

            <ScrollView>

                <FlexboxLayout class="icon-grid">
                    <StackLayout 
                        @tap="selectSport(item)"
                        :class="i%2?'odd':'even'" 
                        v-for="(item, i) in sections" 
                        :key="i">
                        <Image class="ico" :src="item.image" stretch="none"></Image>
                        <Label :text="item.title"></Label>
                    </StackLayout>
                </FlexboxLayout>

            </ScrollView>

        </StackLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer'
    import TitleBar from '~/components/TitleBar'
    import MenuBar from '~/components/MenuBar'

    export default {
        mixins: [ sideDrawer ],
        components: {
            TitleBar,
            MenuBar
        }, 
        data() {
            return {

                sections: [
                    {
                        image: 'res://futbol',
                        title: 'FÚTBOL',
                        sid: 1,
                    },
                    {
                        image: 'res://bolos',
                        title: 'BOLOS',
                        sid: 1,
                    },
                    {
                        image: 'res://piscinas',
                        title: 'PISCINAS',
                        sid: 3,
                    },
                    {
                        image: 'res://tenis',
                        title: 'TENIS',
                        sid: 2,
                    },
                    {
                        image: 'res://zonas_azules',
                        title: 'ZONAS AZULES',
                        sid: 1,
                    },
                    {
                        image: 'res://gimnasio',
                        title: 'GIMNASIO',
                        sid: 1,
                    },
                    {
                        image: 'res://tejo',
                        title: 'TEJO',
                        sid: 1,
                    },
                    {
                        image: '',
                        title: '',
                        sid: '',
                    },
                ],
            }
        },
        methods: {
            selectSport(item) {
                // this.$store.state.eventSpace.title = item.title;
                this.$store.commit('setSpaceTitle', item.title);
                this.$store.commit('setSpace', {cid: item.sid});
                this.navTo('CalendarSports');
            }
        }
    };
</script>
