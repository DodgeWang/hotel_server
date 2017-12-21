//房间物品表
module.exports = (sequelize, DataTypes) => {
 return sequelize.define('RoomArticle',{
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id',
		comment: '物品id'
	},
	name: {
		type: DataTypes.STRING(20),
		field: 'name',
		comment: '物品名称'
	},
	isCheck: {
		type: DataTypes.INTEGER,
		field: 'is_check',
		comment: '是否需要检查，1:true需要，0：false不需要'
	},
	isClean: {
		type: DataTypes.INTEGER,
		field: 'is_clean',
		comment: '是否需要打扫，1:true需要，0：false不需要'
	}
}, {
	tableName: 'room_article',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})
}
