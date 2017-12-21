//房间物品表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RoomCheckIn',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '入住登记id'
	    },
	    roomId: {
		    type: DataTypes.INTEGER,
		    field: 'room_id',
		    comment: '房间id'
	    },
	    guestName: {
		    type: DataTypes.STRING(50),
		    field: 'guest_name',
		    comment: '客人名称'
	    },
	    guestPhone: {
		    type: DataTypes.STRING(50),
		    field: 'guest_phone',
		    comment: '客人联系电话'
	    },
	    checkInTime: {
		    type: DataTypes.STRING(50),
		    field: 'check_in_time',
		    comment: '入住时间，时间戳'
	    },
	    checkOutTime: {
		    type: DataTypes.STRING(50),
		    field: 'check_out_time',
		    comment: '退房时间，时间戳'
	    }
    }, {
	    tableName: 'room_checkin',
	    timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
