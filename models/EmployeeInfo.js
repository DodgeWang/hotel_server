//员工基本信息表
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('EmployeeInfo', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id',
		comment: '员工信息id',
	},
	name: {
		type: DataTypes.STRING(100),
		field: 'name',
		comment: '真实姓名'
	},
	ssn: {
		type: DataTypes.STRING(100),
		field: 'ssn',
		comment: '社会安全号码'
	},
	homeAddress: {
		type: DataTypes.STRING(200),
		field: 'home_address',
		comment: '家庭住址'
	},
	zipCode: {
		type: DataTypes.STRING(100),
		field: 'zip_code',
		comment: '邮编'
	},
	age: {
		type: DataTypes.STRING(10),
		field: 'age',
		comment: '年龄'
	},
	email: {
		type: DataTypes.STRING(50),
		field: 'email',
		comment: '邮箱'
	},
	phone: {
		type: DataTypes.STRING(30),
		field: 'phone',
		comment: '电话号码'
	},
	workDay: {
		type: DataTypes.STRING(30),
		field: 'work_day',
		comment: '工作日（多选），1~7（星期一~星期天），0没有要求'
	},
	workHoursWeek: {
		type: DataTypes.STRING(10),
		field: 'work_hours_week',
		comment: '工作几小时/周'
	},
	canNight: {
		type: DataTypes.INTEGER,
		field: 'can_night',
		comment: '是否能晚上工作，1能，0不能'
	},
	workNature: {
		type: DataTypes.INTEGER,
		field: 'work_nature',
		comment: '工作性质，1全职，2兼职'
	},
	workTime: {
		type: DataTypes.STRING(50),
		field: 'work_time',
		comment: '开始工作时间，格式：yyyy-dd-mm'
	},
	isLegalStatus: {
		type: DataTypes.INTEGER,
		field: 'is_legal_status',
		comment: '是否有合法身份，1有，0没有'
	},
	haveCriminalRecord: {
		type: DataTypes.INTEGER,
		field: 'have_criminal_record',
		comment: '是否有犯罪记录，1有，0没有'
	},
	criminalRecord: {
		type: DataTypes.STRING(300),
		field: 'criminal_record',
		comment: '犯罪记录详情'
	},
	haveDl: {
		type: DataTypes.INTEGER,
		field: 'have_dl',
		comment: '是否有驾照，1有，0没有'
	},
	dlNumber: {
		type: DataTypes.STRING(50),
		field: 'dl_number',
		comment: '驾照号码'
	},
	dlIssuedStatus: {
		type: DataTypes.STRING(50),
		field: 'dl_issued_status',
		comment: '驾照在什么状态下发布'
	},
	isJoinedArmy: {
		type: DataTypes.INTEGER,
		field: 'is_joined_army',
		comment: '是否参过军，1有，0没有'
	},
	isMemberNg: {
		type: DataTypes.INTEGER,
		field: 'is_member_ng',
		comment: '是否是国民警备队一员，1是，0不是'
	},
	militarySpecialty: {
		type: DataTypes.STRING(50),
		field: 'military_specialty',
		comment: '军事专业'
	}


}, {
	tableName: 'employee_info',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'

})
}
