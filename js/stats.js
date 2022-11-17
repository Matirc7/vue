const  {createApp}  = Vue       //Creamos la app 

createApp ( {
    data(){    //
        return{
            url: "https://amazing-events.herokuapp.com/api/events",
            cards : [],
            pastEvents : [],
            upcomingEvents : [],
            pastEventsCategory: [],
            upcomingEventsCategory: [],
            pastCategoryArray: [],
            upcomingCategoryArray: [],
            highAssistance: [],
            lowAssistance: [],
            highCapacity: []
        }
    },
    created(){                 
        this.loadCards()
    },
    mounted(){                  

    },
    methods: {                   
        loadCards() {
            fetch(this.url).then(response => response.json())
            .then(datos => {
                this.cards = datos.events
                this.pastEvents = this.cards.filter(event => (event.date < datos.currentDate) )
                this.upcomingEvents = this.cards.filter(event => (event.date >= datos.currentDate) )

                const fnCategory = events => events.category
                this.upcomingEventsCategory = Array.from(new Set (this.upcomingEvents.map(fnCategory)))

                this.pastEventsCategory = Array.from(new Set (this.pastEvents.map(fnCategory)))

                const attendanceEvents = this.percentajeDescendent(this.pastEvents);
                const capacityEvents = this.capacityDescendent(this.pastEvents);
                this.highAssistance = attendanceEvents[0];
                this.lowAssistance = attendanceEvents[attendanceEvents.length - 1];
                this.highCapacity = capacityEvents[0];

                this.pastCategoryArray = this.statsPast(this.pastEventsCategory, this.pastEvents)

                this.upcomingCategoryArray = this.statsUp(this.upcomingEventsCategory, this.upcomingEvents)

                console.log(this.pastCategoryArray);
                console.log(this.upcomingCategoryArray);

            })
            },

            statsPast( categoria, evento ){
                let array = []
                categoria.forEach(element => {

                    const eventosIguales = evento.filter( evento => evento.category === element)
                    
                    const ganancias = eventosIguales.map(evento => (evento.assistance * evento.price)).reduce((acumulador, value)=> acumulador + value)
            
            
            
                    const asistencia = eventosIguales.map(evento => (evento.assistance * 100 ) / evento.capacity)
                    const sumaAsistencia = asistencia.reduce((acumulador, value) => acumulador + value) / asistencia.length 
            
                    const datos = {
                        nombre: element,
                        ganancia: ganancias,
                        porcentaje: sumaAsistencia.toFixed(2)

                    }
                    array.push(datos)
                });
                return array
            },
            statsUp( categoria, evento ){
                let array = []
                categoria.forEach(element => {

                    const eventosIguales = evento.filter( evento => evento.category === element)
                    
                    const ganancias = eventosIguales.map(evento => (evento.estimate * evento.price)).reduce((acumulador, value)=> acumulador + value)
            
            
            
                    const asistencia = eventosIguales.map(evento => (evento.estimate * 100 ) / evento.capacity)
                    const sumaAsistencia = asistencia.reduce((acumulador, value) => acumulador + value) / asistencia.length 
            
                    const datos = {
                        nombre: element,
                        ganancia: ganancias,
                        porcentaje: sumaAsistencia.toFixed(2)

                    }
                    array.push(datos)
                });
                return array
            },
            percentajeDescendent(array) {
                return array.map(events => events).sort((b, a) => (((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity)))
            },
            capacityDescendent(array) {
                return array.map(events => events).sort((b, a) => (a.capacity - b.capacity));
            }
    },

    computed: {    
    }
}).mount("#app")
