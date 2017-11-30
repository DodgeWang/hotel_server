//事件表
module.exports=sequelize.define('events',{
	eventId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'event_id',
		comment: '事件id'
	},
	eventTypeId: {
		type: Sequelize.INTEGER,
		field: 'event_type_id',
		comment: '事件类别id'
	},
	eventContent: {
		type: Sequelize.STRING(500),
		field: 'event_content',
		comment: '事件内容'
	},
	eventIsRemind: {
		type: Sequelize.INTEGER,
		field: 'event_is_remind',
		comment: '是否提醒，1是，0否'
	},
	eventIsReport: {
		type: Sequelize.INTEGER,
		field: 'event_is_report',
		comment: '是否报表，1是，0否'
	},
	eventIsShare: {
		type: Sequelize.INTEGER,
		field: 'event_is_share',
		comment: '是否分享，1是，0否'
	},
	employeeId: {
		type: Sequelize.INTEGER,
		field: 'employee_id',
		comment: '员工id'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
