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
	    submitterId: {
		    type: DataTypes.INTEGER,
		    field: 'submitter_id',
		    comment: '提交申请任务员工id'
	    },
	    allocatorId: {
		    type: DataTypes.INTEGER,
		    field: 'allocator_id',
		    comment: '分配任务人员id'
	    },
	    executorId: {
		    type: DataTypes.INTEGER,
		    field: 'executor_id',
		    comment: '执行人员id'
	    },
	    examinerId: {
		    type: DataTypes.INTEGER,
		    field: 'examiner_id',
		    comment: '检查人员id'
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
	    status: {
		    type: DataTypes.INTEGER,
		    field: 'status',
		    comment: '任务状态，1待分配，2已分配，3待检查，4已完成'
	    }
    }, {
    	tableName: 'task',
    	timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
    
