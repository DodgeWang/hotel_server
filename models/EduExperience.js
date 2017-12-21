//员工教育经历表
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('EduExperience', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id',
		comment: '教育经历id'
	},
	name: {
		type: DataTypes.STRING(50),
		field: 'name',
		comment: '学校名称'
	},
	address: {
		type: DataTypes.STRING(50),
		field: 'address',
		comment: '学校地址'
	},
	major: {
		type: DataTypes.STRING(50),
		field: 'major',
		comment: '所学专业'
	},
	degree: {
		type: DataTypes.STRING(50),
		field: 'degree',
		comment: '学位或文凭'
	},
	graduationTime: {
		type: DataTypes.STRING(50),
		field: 'graduation_time',
		comment: '毕业时间，格式yyyy-dd-mm'
	},
	stage: {
		type: DataTypes.INTEGER,
		field: 'stage',
		comment: '教育阶段，1高中，2大学'
	},
	employeeId: {
		type: DataTypes.INTEGER,
		field: 'employee_id',
		comment: '员工id'
	}
}, {
	tableName: 'edu_experience',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})
}