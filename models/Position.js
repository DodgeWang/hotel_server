const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//职位分类表
module.exports=sequelize.define('position',{
	positionId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'position_id',
		comment: '职位id'
	},
	positionName: {
		type: Sequelize.STRING(50),
		field: 'position_name',
		comment: '职位名称'
	},
	position_level: {
		type: Sequelize.INTEGER,
		field: 'position_level',
		comment: '职位级别'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
