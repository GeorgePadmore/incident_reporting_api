const { Pool } = require('pg');

const pool = new Pool({
    "port": process.env.PGPORT,
    "host": process.env.PGHOST,
    "user": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "max": 30,
    "connectionTimeoutMillis": 20000, //20000 milliseconds (20 seconds) before a timeout occurs during the inital connection to the DB server
    "idleTimeoutMillis": 0
})

module.exports = {
    async query(text, params) {
        // invocation timestamp for the query method
        const start = Date.now();
        try {
            const res = await pool.query(text, params);
            // time elapsed since invocation to execution
            const duration = Date.now() - start;
            console.log(
              'executed query', 
              {text, duration}
            );
            return res;
        } catch (error) {
            console.log('error in query', {text});
            throw error;
        }
    }
};
