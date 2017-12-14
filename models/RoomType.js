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
	    roomtypeName: {
		    type: DataTypes.STRING(100),
		    field: 'roomtype_name',
		    comment: '类型名称'
	    }
    }, {
	    tableName: 'room_type',
    	timestamps: true,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
