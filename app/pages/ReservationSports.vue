<template>
    <Page actionBarHidden="true" xmlns:svg="nativescript-svg">
        <StackLayout class="page">
            <StackLayout rows="auto" columns="auto, *" class="header" orientation="horizontal">
                <Button @tap="$modal.close" class="close-modal">CERRAR</Button>
                <Label left="0" row="0" col="0" @tap="$navigateBack" class="fa nav-back" :text="'\uf104'"></Label>
            </StackLayout>

            <GridLayout columns="*" class="modal-title">
                <Label :text="dateTitle" class="font-size-m1 label"></Label>
            </GridLayout>

            <Label v-show="dayFull" horizontalAlignment="center" class="m-tb-20">No hay disponibilidad para la fecha</Label>
            <ActivityIndicator v-show="processing" :busy="processing"></ActivityIndicator>

            <StackLayout v-if="confirmed" class="reserve-confirmation" >
                <Label text="RESERVA EXITOSA" class="font-size-m1 title-1 text-center color-green-1"></Label>
                <Label text="CÓDIGO DE LA RESERVA" class="font-size-m1 m-t-20 text-center"></Label>
                <Label :text="createdId" class="font-size-l2 text-center color-green-1 stretch"></Label>
                <Label text="Puede consultar sus reservas en la sección" class="m-t-20 font-size-m1 text-center"></Label>
                <Label text="MIS RESERVAS" class="font-size-m1 text-center color-green-1 stretch"></Label>
            </StackLayout>

            <ScrollView v-if="!confirmed&&!processing">
                <StackLayout ref="main">

                    <GridLayout rows="*" columns="100,*" v-for="(item, i) in availabilities.availabilities" :key="i" class="date-grid">
                        <Label :text="item.time" row="0" col="0" verticalAlignment="top" class="color-green-1 font-light time"></Label>
                        <StackLayout row="0" col="1">
                            <GridLayout rows="auto,auto" columns="*,100" v-for="(service, sid) in availabilities.services" :key="sid" :class="'service'">
                                <StackLayout row="0" col="0">
                                    <Label class="font-size-m1 space" :text="service.name" row="0" col="0" verticalAlignment="top" ></Label>
                                    <Label class="font-light price" :text="service.price_formatted" row="1" col="0" verticalAlignment="top" ></Label>
                                </StackLayout>
                                <Button 
                                    v-if="serviceAvailable(item.services, sid)"
                                    @tap="reserve(sid,item.time)"
                                    :isEnabled="!processing"
                                    class="btn btn-green-1" text="Reservar" row="0" col="1" />
                                <Button 
                                    v-else
                                    class="btn btn-blue-2" text="Reservado" row="0" col="1" />
                            </GridLayout>
                        </StackLayout>
                    </GridLayout>

                </StackLayout>
            </ScrollView>

        </StackLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer'
    // import Deportes from "./Deportes";

    export default {
        mixins: [ sideDrawer ],
        computed: {
            dayFull() {
                console.log(this.availabilities.availabilities.length);
                return !this.availabilities.availabilities.length && !this.processing;
            }
        },
        data() {
            return {
                processing: true,
                confirmed: false,
                createdId: 'XXX',

                availabilities: {
                    'services': [],
                    'availabilities': [],
                },

                date: null,
                dateFormatted: null,
                dateTitle: ''
            }
        },
        methods: {
            reserve(sid, time){
                // {"serviceId":"2","_date":"2019-03-15","_time":"17:00","start":"2019-03-15 17:00:00"}
                let appointment = {
                    serviceId: sid,
                    _date: this.dateFormatted,
                    _time: time,
                    start: this.dateFormatted + ' ' + time + ':00',
                };

                let message = 'Si confirmas la reserva de este espacio deportivo, estás aceptando los términos y condiciones del reglamento de este deporte.';
                message += "\nDetalle de la reserva:";
                message += "\nFecha: " + this.dateFormatted;
                message += "\nHora: " + time;

                confirm({
                    title: "Confirmación",
                    message: message,
                    okButtonText: "Confirmar",
                    cancelButtonText: "Cancelar"
                }).then(result => {
                    if(result){


                    this.$api
                        .post('appointments/', appointment)
                        .then((data) => {
                            this.processing = false;
                            this.confirmed = true;
                            this.createdId = data.id;
                        })
                        .catch((e) => {
                            this.processing = false;
                            console.log(e);
                        });

                    }
                });

            },

            serviceAvailable(services, sid){
                // return true;
                return services.some(a_sid => {
                    return a_sid == sid;
                });
            }
        },
        mounted() {
            const months = [
                'ENERO',
                'FEBRERO',
                'MARZO',
                'ABRIL',
                'MAYO',
                'JUNIO',
                'JULIO',
                'AGOSTO',
                'SEPTIEMBRE',
                'OCTUBRE',
                'NOVIEMBRE',
                'DICIEMBRE',
            ];

            this.date = this.$store.state.eventSpace.date;
            this.dateTitle = months[this.date.getMonth()] + ' ' + this.date.getDate();
            let y = this.date.getFullYear();
            let m = this.date.getMonth() + 1;
            if(m < 10) m = '0'+m;

            let d = this.date.getDate();
            if(d < 10) d = '0'+d;

            this.dateFormatted = y + '-' + m + '-' + d;

            const cid = this.$store.state.eventSpace.space.cid;

            this.$api
                // .get('availabilities/?serviceId=2&date=' + this.dateFormatted + '&categoryId=' + cid + '&serviceId=2')
                .get('availabilities/?&date=' + this.dateFormatted + '&categoryId=' + cid)
                .then((r) => {
                    this.availabilities = r;
                    if(!this.availabilities.availabilities){
                        this.availabilities.availabilities = [];
                    }
                    this.processing = false;
                })
                .catch((e) => {
                    console.log(e);
                });

        }
    };
</script>

<style scoped lang="scss">
    @import '../scss/app-variables';

    .title-1
    {
        margin-top: 50;
    }

    .date-grid
    {
        border-top-width: 1;
        border-color: $white;
        padding-top: 5;
        padding-bottom: 5;

        .service
        {
            padding-top: 5;
            padding-bottom: 5;

            &.border
            {
                border-bottom-width: 1;
                border-color: $white;
            }
        }

        .time
        {
            padding-left: 5;
        }
    }

    Button:disabled
    {
        opacity: 0.5;
    }


</style>
