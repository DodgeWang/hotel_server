//任务详情表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TaskFlow',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '任务流程id'
	    },
	    employeeId: {
		    type: DataTypes.INTEGER,
		    field: 'employee_id',
		    comment: '执行员工id'
	    },
	    type: {
		    type: DataTypes.INTEGER,
		    field: 'type',
		    comment: '类型（1代表分配，2代表执行，3代表检查）'
	    },
        record: {
		    type: DataTypes.STRING(255),
		    field: 'record',
		    comment: '记录备注'
	    },
	    taskId: {
		    type: DataTypes.INTEGER,
		    field: 'task_id',
		    comment: '任务id'
	    },	    
	    status: {
		    type: DataTypes.INTEGER,
		    field: 'status',
		    comment: '任务状态，1完成，0未完成'
	    }
    }, {
    	tableName: 'task_flow',
    	timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
    
