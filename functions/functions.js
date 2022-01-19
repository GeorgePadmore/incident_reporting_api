const axios = require('axios');

module.exports = {

    FetchWeather: (city) =>  {

        try {
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0e58b78bf9192dab9c590e20089aa88`)
        } catch (error) {
            // console.error(error);
            throw error;
        }
    },
}