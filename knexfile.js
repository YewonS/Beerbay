const credentials = require('./config/dbCredentials.js');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: credentials.host,
            database: credentials.database,
            user: credentials.user,
            password: credentials.password,
            port: 3306
        },
        ...knexSnakeCaseMappers()
    }

}