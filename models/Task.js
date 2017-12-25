//任务详情表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Task',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '任务id'
	    },
	    employeeId: {
		    type: DataTypes.INTEGER,
		    field: 'employee_id',
		    comment: '员工id'
	    },
	    roomId: {
		    type: DataTypes.INTEGER,
		    field: 'room_id',
		    comment: '房间id'
	    },
	    tasktypeId: {
		    type: DataTypes.INTEGER,
		    field: 'tasktype_id',
		    comment: '任务类型id'
	    },
	    describe: {
		    type: DataTypes.STRING(255),
		    field: 'describe',
		    comment: '任务描述'
	    },
	    createTime: {
		    type: DataTypes.STRING(50),
		    field: 'create_time',
		    comment: '任务创建时间，时间戳'
	    },
	    completionTime: {
		    type: DataTypes.STRING(50),
		    field: 'completion_time',
		    comment: '任务完成时间，时间戳'
	    },
	    status: {
		    type: DataTypes.INTEGER,
		    field: 'status',
		    comment: '任务状态，1待分配，2已分配，3待检查，4已完成'
	    }
    }, {
    	tableName: 'task',
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
    
