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
	number: {
		type: DataTypes.STRING(20),
		field: 'number',
		comment: '房间号'
	},
	qrCode: {
		type: DataTypes.STRING(200),
		field: 'qr_code',
		comment: '二维码'
	},
	status: {
		type: DataTypes.INTEGER,
		field: 'status',
		comment: '房间状态，1已入住，0未入住',
		defaultValue: 0
	},
	cleanStatus: {
		type: DataTypes.INTEGER,
		field: 'clean_status',
		comment: '房间打扫状态，1已打扫，0未打扫',
		defaultValue: 0
	},
    typeId: {
		type: DataTypes.INTEGER,
		field: 'type_id',
		comment: '房间类型'
	}
}, {
	tableName: 'room_info',
	timestamps: true,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})
}
