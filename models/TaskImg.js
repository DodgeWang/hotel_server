const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//任务图片表
module.exports=sequelize.define('task_img',{
	imgId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'img_id',
		comment: '任务图片id'
	},
	imgUrl: {
		type: Sequelize.STRING(100),
		field: 'img_url',
		comment: '图片路径'
	},
	taskId: {
		type: Sequelize.INTEGER,
		field: 'task_id',
		comment: '任务id'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
