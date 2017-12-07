const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//任务详情表
module.exports=sequelize.define('task',{
	taskId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'task_id',
		comment: '任务id'
	},
	employeeId: {
		type: Sequelize.INTEGER,
		field: 'employee_id',
		comment: '员工id'
	},
	roomId: {
		type: Sequelize.INTEGER,
		field: 'room_id',
		comment: '房间id'
	},
	tasktypeId: {
		type: Sequelize.INTEGER,
		field: 'tasktype_id',
		comment: '任务类型id'
	},
	taskDes: {
		type: Sequelize.STRING(255),
		field: 'task_des',
		comment: '任务描述'
	},
	taskCreateTime: {
		type: Sequelize.STRING(50),
		field: 'task_create_time',
		comment: '任务创建时间，时间戳'
	},
	taskCompletionTime: {
		type: Sequelize.STRING(50),
		field: 'task_completion_time',
		comment: '任务完成时间，时间戳'
	},
	taskStatus: {
		type: Sequelize.INTEGER,
		field: 'task_status',
		comment: '任务状态，1待分配，2已分配，3待检查，4已完成'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
