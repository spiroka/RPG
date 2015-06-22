var DataStore = require('nedb');

var player   = new DataStore({ filename: __dirname + '/player.db', autoload: true });
var creature = new DataStore({ filename: __dirname + '/creature.db', autoload: true });
var item     = new DataStore({ filename: __dirname + '/item.db', autoload: true });
var admin    = new DataStore({ filename: __dirname + '/admin.db', autoload: true });

player.ensureIndex({ fieldName: 'name', unique: true });
admin.ensureIndex({ fieldName: 'name', unique: true });

module.exports = {
	player:   player,
	creature: creature,
	item:     item,
	admin:    admin
};