const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true }},
	data: { type: Date, default: Date.now() }
});

const userModel = mongoose.model('user',userSchema);

const save = (data)=>{
	var user = new userModel(data);
	return user.save()
		.then(()=>true)
		.catch(()=>false)
};

module.exports = {
	save
};
