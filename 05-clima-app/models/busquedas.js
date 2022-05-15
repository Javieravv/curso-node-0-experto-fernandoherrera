/**Clase para las búsquedas */
const fs = require('fs');
const axios = require('axios')
require('dotenv').config()



class Busquedas {
    historial = []
    dbPath = './db/database.json'

    constructor () {
        // todo: leer db si existe
        this.leerDb()
    }

    get paramsMapbox () {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather () {
        return {
            'appid': process.env.WEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    get historialCapitalizado () {
        // pasar a mayúscula inicial cada parte del historial
        return this.historial.map ( lugar => {
                return lugar.split(' ')
                        .map ( item => item[0].toUpperCase() + item.slice(1) )
                        .join (' ')
       })
    }


    // es asíncrono porque se va a hacer una petición http
    async buscarLugar ( lugar = '' ) {
        // petición http
        try {
            // petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get ()
            return resp.data.features.map ( lugar => ({ // regresamos objeto de forma implícita
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))
        } catch (error) {
            console.log ('ERROR...')
            return []
        }
    }

    async buscarClimaLugar ( lat, lon ) {
        /*
        crear instancia axios
        con la resp extraer la información que está en la data
        retorna objeto con: descripción del clima, temperaturas mínima y máxima
        temperatura normal.
        */
       // petición http
       
       try {
            // petición http
            const instanceClima = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon }
            })
            // peticion http
            const resp = await instanceClima.get ()
            const {weather, main: mainTemperatura } = resp.data
            // const weather = resp.data.weather
            // const mainTemperatura = resp.data.main

            return {
                descripcion : weather[0].description,
                temperatura : mainTemperatura.temp,
                tempMaxima  : mainTemperatura.temp_max,
                tempMinima  : mainTemperatura.temp_min
            }
        } catch (error) {
            console.log ('ERROR...', error)
            return []
        }
    }

    agregarHistorial ( lugar = '') {
        // prevenir duplicados
        if ( this.historial.includes ( lugar.toLocaleLowerCase())) {
            return 
        }
        // solo mantenemos cinco
        this.historial = this.historial.splice ( 0, 5 )
        this.historial.unshift( lugar.toLocaleLowerCase() )
        // grabar en db
        this.grabarBd()
    }

    // Grabamos las búsquedas
    grabarBd () {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync ( this.dbPath, JSON.stringify( payload) )
    }

    // Leemos las búsquedas guardadas.
    leerDb () {
        // verificar que existe el json guardado
        // Si existe: cargar la info a historial
        if ( !fs.existsSync ( this.dbPath ) ) {
            return null
        }
        const infoHistorial = fs.readFileSync ( this.dbPath, { encoding: 'utf-8' } )
        const data = JSON.parse( infoHistorial )
        this.historial = data.historial
    }
}

module.exports = Busquedas;
