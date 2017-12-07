const Sequelize = require('sequelize');
let sequelize = require('../utils/db');


//时间类型表
module.exports=sequelize.define('event_type',{
	eventTypeId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'event_type_id',
		comment: '时间类别id'
	},
	eventTypeName: {
		type: Sequelize.INTEGER,
		field: 'event_type_name',
		comment: '事件类别名'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
