var { Email }=require('../untils/config');
var userModel = require('../models/users');

var login = async (req, res, next) => {

};

var register = async (req, res, next) => {
	var { username, password, email, verify } = req.body;
	if(email !== req.session.email || verify !== req.session.verify){
		res.send({
			msg: '验证码或账号错误',
			status: -1
		});
		console.log(req.session);
		console.log(req.session.id);
		return
	}
	const result = await userModel.save({
		username,
		password,
		email
	});
	if(result){
		res.send({
			msg: '注册成功',
			status: 0
		})
	}else{
		// console.log(req.session);
		res.send({
			msg: '注册失败',
			status: -2
		})
	}
};

var verify = async (req, res, next) => {
	var email = req.query.email;
	var verify = Email.verify;
	req.session.verify = verify;
	req.session.email = email;
	req.session.save();
	var mailOptions = {
		from: '轻旅验证码 1169264363@qq.com',
		to: email,
		subject: '轻旅验证码',
		text: '验证码:'+ verify
	};
	Email.transporter.sendMail(mailOptions,(err)=>{
		if(err){
			res.send({
				msg: '验证码发送失败',
				status: -1
			})
		}else{
			res.send({
				msg: '验证码发送成功',
				status: 0
			});
			console.log(req.session);
			console.log(req.session.id);
		}
	});

};

var logout = async (req, res, next) => {

};

var getUsers = async (req, res, next) => {

};

var findPassword = async (req, res, next) => {

};

module.exports = {
	login,
	register,
	verify,
	logout,
	getUsers,
	findPassword
};
