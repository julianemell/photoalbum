//ALBUM MODEL

module.exports = (bookshelf) => {
	return bookshelf.model('Albums', {
		tableName: 'Album',
		initialize() {
			this.on('destroying', (model) => {
			   model.photos().detach();
			})
		},
		user() {
			return this.belongsTo('User'); 
		},
		photos() {
			return this.belongsToMany('Photos');
		}
	}, { async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		}
	});
}
