//för att starta upp bookshelf(knex)

require('dotenv').config();

// Setting up the database connection
const knex = require('knex')({
	debug: true,
	client: 'mysql',
	connection: process.env.CLEARDB_DATABASE_URL || {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		charset: process.env.DB_CHARSET || 'utf8mb4',
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	}
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.Photos = require('./Photos')(bookshelf);
models.Album = require('./Album')(bookshelf);
models.User = require('./User')(bookshelf);



module.exports = {
	bookshelf,
	...models,
};
