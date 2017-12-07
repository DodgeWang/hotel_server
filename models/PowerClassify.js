const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//权限分类表
module.exports=sequelize.define('power_classify',{
	powerClassifyId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'power_classify_id',
		comment: '权限分类id'
	},
	powerClassifyName: {
		type: Sequelize.STRING(50),
		field: 'power_classify_name',
		comment: '权限分类名称'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
