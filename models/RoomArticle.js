//房间物品表
module.exports=sequelize.define('room_article',{
	articleId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'article_id',
		comment: '物品id'
	},
	articleName: {
		type: Sequelize.STRING(20),
		field: 'article_name',
		comment: '物品名称'
	},
	articleCheck: {
		type: Sequelize.INTEGER,
		field: 'article_check',
		comment: '是否需要检查，1:true需要，0：false不需要'
	},
	articleClean: {
		type: Sequelize.INTEGER,
		field: 'article_clean',
		comment: '是否需要打扫，1:true需要，0：false不需要'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
