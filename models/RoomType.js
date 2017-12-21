//房间类型表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RoomType',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '房间类型id'
	    },
	    name: {
		    type: DataTypes.STRING(100),
		    field: 'name',
		    comment: '类型名称'
	    }
    }, {
	    tableName: 'room_type',
    	timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
