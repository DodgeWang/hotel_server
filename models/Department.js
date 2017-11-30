//部门表
module.exports=sequelize.define('department',{
	departmentId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'department_id',
		comment: '部门id'
	},
	departmentName: {
		type: Sequelize.STRING(50),
		field: 'department_name',
		comment: '部门名称'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
