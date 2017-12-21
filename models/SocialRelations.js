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
	    content: {
		    type: DataTypes.STRING(500),
		    field: 'content',
		    comment: '熟人详细信息'
	    },
	    employeeId: {
		    type: DataTypes.INTEGER,
		    field: 'employee_id',
		    comment: '员工id'
	    }
    }, {
	    tableName: 'social_relations',
	    timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}