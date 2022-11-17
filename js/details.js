const  {createApp}  = Vue       //Creamos la app 

createApp ( {
    data(){
        return{
            id: new URLSearchParams (location.search).get("id"),
            url: "https://amazing-events.herokuapp.com/api/events",
            cards : [],
            cardsFinal: "", 
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
                this.cardsFinal = this.cards.find(event => (event._id.toString()) === this.id)
                console.log(this.cardsFinal);
            })
            .catch(error => console.log(error))
            }
    },
    computed: {    

    }
}).mount("#app")