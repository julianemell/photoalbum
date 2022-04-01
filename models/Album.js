//ALBUM MODEL

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		user() {
			return this.belongsTo('User'); 
		},
		tableName: 'albums',
		photos() {
			return this.belongsToMany('Photos');
		}
	}, { async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		}
	});
}
