/**
 * Album model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Albums', {
		tableName: 'Album',
		user() {
			return this.belongsTo('User'); 
		},
		photos() {
			return this.belongsToMany('Photos');
		}
	})
};
