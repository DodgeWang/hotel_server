//任务详情表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TaskType',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '任务类型id'
	    },
	    name: {
		    type: DataTypes.STRING(100),
		    field: 'name',
		    comment: '任务类型名称'
	    },
	    allocatorRole: {
		    type: DataTypes.INTEGER,
		    field: 'allocator_role',
		    comment: '分配任务角色id'
	    },
	    executorRole: {
		    type: DataTypes.INTEGER,
		    field: 'executor_role',
		    comment: '执行任务角色id'
	    },
	    examinerRole: {
		    type: DataTypes.INTEGER,
		    field: 'examiner_role',
		    comment: '检查任务角色id'
	    }
	    
    }, {
    	tableName: 'task_type',
    	timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
    
