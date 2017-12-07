const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//权限表
module.exports = sequelize.define('power', {
	powerId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'power_id',
		comment: '权限id'
	},
	powerName: {
		type: Sequelize.STRING(50),
		field: 'power_name',
		comment: '权限名称'
	},
	powerIdentifier: {
		type: Sequelize.STRING(50),
		field: 'power_identifier',
		comment: '权限标识符'
	},
	powerDes: {
		type: Sequelize.STRING(255),
		field: 'power_des',
		comment: '权限描述'
	},
	powerClassifyId: {
		type: Sequelize.INTEGER,
		field: 'power_classify_id',
		comment: '权限分类id'
	}
}, {
	freezeTableName: true,
	timestamps: true
})