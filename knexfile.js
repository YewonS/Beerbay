const credentials = require('./config/rdsCredentials.js');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host : credentials.host,
            database: credentials.database,
            user: credentials.user,
            password: credentials.password,
            port: 3306
        },
        ...knexSnakeCaseMappers()
    }

}