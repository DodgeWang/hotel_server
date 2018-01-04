//事件表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Event',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '事件id'
	    },
	    typeId: {
		    type: DataTypes.INTEGER,
		    field: 'type_id',
		    comment: '事件类别id'
	    },
	    content: {
		    type: DataTypes.STRING(500),
		    field: 'content',
		    comment: '事件内容'
	    },
	    isRemind: {
		    type: DataTypes.INTEGER,
		    field: 'is_remind',
		    comment: '是否提醒，1是，0否'
	    },
	    isReport: {
		    type: DataTypes.INTEGER,
		    field: 'is_report',
		    comment: '是否报表，1是，0否'
	    },
	    // isShare: {
		   //  type: DataTypes.INTEGER,
		   //  field: 'is_share',
		   //  comment: '是否分享，1是，0否'
	    // },
	    employeeId: {
		    type: DataTypes.INTEGER,
		    field: 'employee_id',
		    comment: '发布者id'
	    }
    }, {
	   tableName: 'event',
	   timestamps: false,
	   // paranoid: true,
	   charset: 'utf8',
       collate: 'utf8_general_ci'
    })
}
    
