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
	articleName: {
		type: DataTypes.STRING(20),
		field: 'article_name',
		comment: '物品名称'
	},
	articleCheck: {
		type: DataTypes.INTEGER,
		field: 'article_check',
		comment: '是否需要检查，1:true需要，0：false不需要'
	},
	articleClean: {
		type: DataTypes.INTEGER,
		field: 'article_clean',
		comment: '是否需要打扫，1:true需要，0：false不需要'
	}
}, {
	tableName: 'room_article',
	timestamps: true,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})
}
