//员工教育经历表
module.exports = sequelize.define('education_experience', {
	eduId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'edu_id',
		comment: '教育经历id'
	},
	schName: {
		type: Sequelize.STRING(50),
		field: 'sch_name',
		comment: '学校名称'
	},
	schAddress: {
		type: Sequelize.STRING(50),
		field: 'sch_address',
		comment: '学校地址'
	},
	schMajor: {
		type: Sequelize.STRING(50),
		field: 'sch_major',
		comment: '所学专业'
	},
	schDegree: {
		type: Sequelize.STRING(50),
		field: 'sch_degree',
		comment: '学位或文凭'
	},
	schGraduationTime: {
		type: Sequelize.STRING(50),
		field: 'sch_graduation_time',
		comment: '毕业时间，格式yyyy-dd-mm'
	},
	schStage: {
		type: Sequelize.INTEGER,
		field: 'sch_stage',
		comment: '教育阶段，1高中，2大学'
	},
	employeeIdcode: {
		type: Sequelize.STRING(100),
		field: 'employee_idcode',
		comment: '用户唯一识别码'
	}
}, {
	freezeTableName: true,
	timestamps: true
})