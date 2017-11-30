//员工社会关系
module.exports = sequelize.define('social_relations', {
	relationId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'relation_id',
		comment: '社会关系id'
	},
	relationContent: {
		type: Sequelize.STRING(500),
		field: 'relation_content',
		comment: '熟人详细信息'
	},
	employeeIdcode: {
		type: Sequelize.STRING(100),
		field: 'employee_idcode',
		comment: '员工唯一识别码'
	}
}, {
	freezeTableName: true,
	timestamps: true
})