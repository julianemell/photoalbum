/**
 * Profile model
 */


module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'Users',
		photos() {
			return this.hasMany('Photos');
		},
		albums() {
			return this.hasMany('Album');
		}
	}, { 
		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		}
	});
}