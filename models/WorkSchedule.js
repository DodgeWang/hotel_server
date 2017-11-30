//工作排班表
module.exports=sequelize.define('work_ schedule',{
	scheduleId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'schedule_id',
		comment: 'schedule_id'
	},
	startTime: {
		type: Sequelize.STRING(50),
		field: 'start_time',
		comment: '上班时间，时间戳'
	},
	endTime: {
		type: Sequelize.STRING(50),
		field: 'end_time',
		comment: '下班时间，时间戳'
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
