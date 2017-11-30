//任务类型表
module.exports=sequelize.define('task_type',{
	tasktypeId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'tasktype_id',
		comment: '任务类型id'
	},
	tasktypeName: {
		type: Sequelize.STRING(20),
		field: 'tasktype_name',
		comment: '任务类型名称'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
