/**
 * Example model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'Users',
		user() {
			return this.belongsTo('User');   // books.author_id = 3   ->   authors.id = 3 (single author)
		},
	});
};
