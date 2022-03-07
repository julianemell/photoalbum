/**
 * Photos model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photos', {
		tableName: 'Photos',
		initialize() {
			this.on('destroying', (model) => {
			  // This is fired before a model is destroyed
			  // detach photo from albums
			   model.albums().detach();
			})
		},
		user() {
			return this.belongsTo('User');
		},
		albums() {
			return this.belongsToMany('Album');
		}
	}, { fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		}
	});
};
