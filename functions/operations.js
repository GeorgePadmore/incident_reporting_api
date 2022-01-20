const db = require("../configs/database");


module.exports = {

    getAllIncidents: () => new Promise((resolve, reject) => {

        try {
            db.query('SELECT client_id, incident_desc, city, country, weather_report FROM incidents ORDER BY id desc', (err, results) => {
                if (err) console.error(err);
                console.log('incident Query Results: ', results.rowCount);
                resolve(results.rows);
            });
        } catch (error) {
            throw error;
        }

    }),
  

    SaveIncident: (data, callback) =>  {

        try {
            const { rows } = db.query(`insert into incidents (client_id, incident_desc, city, country, weather_report) VALUES ($1, $2, $3, $4, $5)`,
                [data.client_id, data.incident_desc, data.city, data.country, data.weather_report]
            );
            return callback(null, rows); //return rows affected by executing this query
        } catch (error) {
            throw error;
        }

    },
    
}