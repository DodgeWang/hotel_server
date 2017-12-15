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
	schName: {
		type: DataTypes.STRING(50),
		field: 'sch_name',
		comment: '学校名称'
	},
	schAddress: {
		type: DataTypes.STRING(50),
		field: 'sch_address',
		comment: '学校地址'
	},
	schMajor: {
		type: DataTypes.STRING(50),
		field: 'sch_major',
		comment: '所学专业'
	},
	schDegree: {
		type: DataTypes.STRING(50),
		field: 'sch_degree',
		comment: '学位或文凭'
	},
	schGraduationTime: {
		type: DataTypes.STRING(50),
		field: 'sch_graduation_time',
		comment: '毕业时间，格式yyyy-dd-mm'
	},
	schStage: {
		type: DataTypes.INTEGER,
		field: 'sch_stage',
		comment: '教育阶段，1高中，2大学'
	}
}, {
	tableName: 'edu_experience',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})
}