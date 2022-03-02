/**
 * Album model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'Album',
		user() {
			return this.belongsTo('User'); 
		},
		album_photos() {
			return this.belongsToMany('Photos');
		}
	});
};
