//房间类型表
module.exports=sequelize.define('room_type',{
	roomtypeId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'roomtype_id',
		comment: '房间类型id'
	},
	roomtypeName: {
		type: Sequelize.STRING(100),
		field: 'roomtype_name',
		comment: '类型名称'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
