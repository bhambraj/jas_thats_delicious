const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
	res.render('index');
}

exports.addStore = (req, res) => {
	res.render('editStore', {title: 'Add Store'});
}

exports.createStore = async (req, res) => {
	const store =  await (new Store(req.body)).save();
	req.flash('success', `Successfully creared ${store.name}, Care to leave a review`);
	res.redirect(`/stores/${store.slug}`);
}

exports.getStores = async (req, res) => {
	//	Query database
	const stores = await Store.find();
	res.render('stores', { title: 'Stores', stores})
}

exports.editStore = async (req, res) => {

	// 1. Find Store of the given ID
	const store = await Store.findOne({ _id: req.params.id });

	// 2. Confirm they are owner of the store
	//		TODO
	// 3. Render out the edit form so that user can edit the store
	res.render('editStore', {title: `Edit ${store.name}`, store})


	//res.render('stores', { title: 'Stores', stores})
}

exports.updateStore = async (req, res) => {
	//Set the location data to be a point
	req.body.location.type = 'Point';
	//	Find and update the store
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true, //returns new store instead of the old one
		runValidators: true // Run Validators against the model
	}).exec();
	//Redirect them and tell the user
	req.flash('success', `SuccessFully Updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store -> </a>`);

	res.redirect(`/stores/${store._id}/edit`);
}