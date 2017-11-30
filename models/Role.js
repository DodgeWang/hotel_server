//角色表
module.exports = sequelize.define('role', {
	roleId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'role_id',
		comment: '角色id'
	},
	roleName: {
		type: Sequelize.STRING(50),
		field: 'role_name',
		comment: '角色名称'
	},
	roleDes: {
		type: Sequelize.STRING(255),
		field: 'role_des',
		comment: '角色名称'
	}
}, {
	freezeTableName: true,
	timestamps: true
})