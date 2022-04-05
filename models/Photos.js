//PHOTOS MODEL

module.exports = (bookshelf) => {
	return bookshelf.model('Photos', {
		tableName: 'photos',
		albums() {
			return this.belongsToMany('Album');
		},
		tableName: 'photos',
		user() {
			return this.belongsTo('User');
		}
	});
};
