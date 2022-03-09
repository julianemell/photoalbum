/**
 * Photos model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photos', {
		tableName: 'Photos',
		initialize() {
			this.on('destroying', (model) => {
			   model.albums().detach();
			})
		},
		user() {
			return this.belongsTo('User');
		},
		albums() {
			return this.belongsToMany('Album');
		}
	}, { async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		}
	});
};
