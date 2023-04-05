var mongoose = require('mongoose');
var Schema = mongoose.Schema;

cartschema = new Schema( {
	item: String,
	price: String,
    count:String,
	email: String,
}),

Cart = mongoose.model('Cart', cartschema);

module.exports = Cart;