//事件类型表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('EventType',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '事件类型id'
	    },
	    name: {
		    type: DataTypes.STRING(100),
		    field: 'name',
		    comment: '事件类型名称'
	    }
    }, {
    	tableName: 'event_type',
    	timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}