//时间报表配置表
module.exports=sequelize.dedine('report_config',{
	reportId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'report_id',
		comment: '报表配置id'
	},
	reportEmail: {
		type: Sequelize.STRING(50),
		field: 'report_email',
		comment: '发送邮件'
	},
	reportTime: {
		type: Sequelize.STRING(50),
		field: 'report_time',
		comment: '发送时间'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
