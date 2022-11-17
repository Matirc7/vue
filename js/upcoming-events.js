const  {createApp}  = Vue       //Creamos la app 

createApp ( {
    data(){
        return{
            url: "https://amazing-events.herokuapp.com/api/events",
            cards : [],
            category: [],
            categoriasSelected: [],
            buckupsCards: [],
            upcomingEvents: [], 
            input: ""
        }
    },
    created(){                  //Aca llamo a lo que voy a crear, ej: fetch
        this.loadCards()
    },
    mounted(){                  //Ya esta creado y montado, renderizado... check, search, etc.
    },
    methods: {                  //funciones que voy a declarar por necesidad de llamarla, filtrar, etc
        loadCards() {
            fetch(this.url).then(response => response.json())
            .then(datos => {
                this.cards = datos.events
                this.upcomingEvents = this.cards.filter(event => event.date >= datos.currentDate)
                console.log(this.upcomingEvents)                
                this.buckupsCards = this.upcomingEvents
                this.cards.forEach(carta => {
                    if (!this.category.includes(carta.category)) {
                        this.category.push(carta.category)
                    }
                })
            })
            }
    },
    computed: {    
        filtrar()  {
            let primerFiltro = this.buckupsCards.filter(cards => cards.name.toLowerCase().includes(this.input.toLowerCase()))
            let segundoFiltro = primerFiltro.filter(cardFiltro => this.categoriasSelected.includes(cardFiltro.category) || this.categoriasSelected.length === 0)
            this.upcomingEvents = segundoFiltro
        }             //son funciones que se activan cuando hay un  cambio en las variables, por eso son reactivas, por ej, cuando seleccionamos un check, es un cambio reactivo.
    }
}).mount("#app")