const  {createApp}  = Vue       //Creamos la app 

createApp ( {
    data(){    //
        return{
            url: "https://amazing-events.herokuapp.com/api/events",
            cards : [],
            categories: [],
            categoriasSelected: [],
            buckupsCards: [],
            input: ""

        }
    },
    created(){                  //Aca llamo a lo que voy a crear, ej: fetch
        this.loadCards()
    },
    mounted(){                  //Ya esta creado y montado, renderizado... check, search, etc.

    },
    methods: {                   //funciones que voy a declarar por necesidad de llamarla, filtrar, etc
        loadCards() {
            fetch(this.url).then(response => response.json())
            .then(datos => {
                this.cards = datos.events.filter(cartas => cartas.category)
                this.buckupsCards = this.cards
                this.cards.forEach(carta => {
                    if (!this.categories.includes(carta.category)) {
                        this.categories.push(carta.category)
                    }
                })
            })
            },
        filtrar(){
            this.cards = this.buckupsCards.filter(cards => cards.category.toLowerCase().includes(this.input.toLowerCase()))
        },
        
    },
    computed: {    
        filtrar()  {
            let primerFiltro = this.buckupsCards.filter(cards => cards.name.toLowerCase().includes(this.input.toLowerCase()))
            let segundoFiltro = primerFiltro.filter(cardFiltro => this.categoriasSelected.includes(cardFiltro.category))
            if(segundoFiltro.length > 0){
                this.cards = segundoFiltro
            }else{
                this.cards = primerFiltro
            }
        }             //son metodos que se activan cuando hay un  cambio en la pagina, por el v-model
    }
}).mount("#app")