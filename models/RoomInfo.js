//房间详情表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RoomInfo',{
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id',
		comment: '房间id'
	},
	roomNumber: {
		type: DataTypes.STRING(20),
		field: 'room_number',
		comment: '房间号'
	},
	roomQrCode: {
		type: DataTypes.STRING(200),
		field: 'room_qr_code',
		comment: '二维码'
	},
	roomStatus: {
		type: DataTypes.INTEGER,
		field: 'room_status',
		comment: '房间状态，1已入住，0未入住',
		defaultValue: 0
	},
	roomCleanStatus: {
		type: DataTypes.INTEGER,
		field: 'room_clean_status',
		comment: '房间打扫状态，1已打扫，0未打扫',
		defaultValue: 0
	},
	roomtypeId: {
		type: DataTypes.INTEGER,
		field: 'roomtype_id',
		comment: '房间类型'
	}
}, {
	tableName: 'room_info',
	timestamps: true,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})
}
