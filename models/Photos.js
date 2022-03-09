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
		albums() {
			return this.belongsToMany('Album');
		},
		user() {
			return this.belongsTo('User');
		}
	}, { async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		}
	});
};
