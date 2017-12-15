//员工社会关系
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('SocialRelations', {
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '社会关系id'
	    },
	    relationContent: {
		    type: DataTypes.STRING(500),
		    field: 'relation_content',
		    comment: '熟人详细信息'
	    }
    }, {
	    tableName: 'social_relations',
	    timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}