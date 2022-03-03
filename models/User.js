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
	});
};