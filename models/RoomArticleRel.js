//房间详情表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RoomArticleRel',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '房间与物品关联id'
	    },
	    articleId: {
		    type: DataTypes.STRING(20),
		    field: 'article_id',
		    comment: '物品id'
	    },
	    roomId: {
		    type: DataTypes.INTEGER,
		    field: 'room_id',
		    comment: '房间id'
	    }
    }, {
	    tableName: 'room_article_rel',
	    timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
