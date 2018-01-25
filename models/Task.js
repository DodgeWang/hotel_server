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
		    comment: '任务状态，1完成，0未完成'
	    }
    }, {
    	tableName: 'task',
    	timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
    
