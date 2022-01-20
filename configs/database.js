const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: connectionString,
    // ssl: {
    //     rejectUnauthorized: false
    // }
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
