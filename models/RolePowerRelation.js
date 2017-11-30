//角色和权限关联表
module.exports=sequelize.define('role_power_relation',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id'
	},
	roleId: {
		type: Sequelize.INTEGER,
		field: 'role_id',
		comment: '角色id'
	},
	powerId: {
		type: Sequelize.INTEGER,
		field: 'power_id',
		comment: '权限id'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
