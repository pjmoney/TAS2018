import countriesJson from '../assets/countries.json'

const DataStore = {

    data: {
        countries: [],
        categories: [
            "Biuro i firma",
            "Biżuteria i zegarki",
            "Budowa i remont",
            "Delikatesy",
            "Dla dziecka",
            "Dom i wnętrze",
            "Fotografia",
            "Gry",
            "Hobby i zwierzęta",
            "Elektronika",
            "Księgarnia",
            "Moda",
            "Motoryzacja",
            "Ogród",
            "Sport i rekreacja",
            "Sprzęt AGD",
            "Sprzęt RTV",
            "Telefony i akcesoria",
            "Uroda",
            "Zdrowie",
            "Wycieczki zagraniczne",
            "Kredyty gotówkowe",
            "Usługi"
          ]
    },

    methods: {
        /**
         * Get countries from JSON File
         */
        getCountries: function () {
            let c = []
            
            countriesJson.forEach(x => {
                c.push(x.name)
            });

            this.countries = c

            return this.countries
        }
    }
}

export default DataStore
