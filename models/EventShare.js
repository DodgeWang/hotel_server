//事件分享表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('EventShare',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '事件分享id'
	    },
	    eventId: {
		    type: DataTypes.INTEGER,
		    field: 'event_id',
		    comment: '事件id'
	    },
	    sharerId: {
		    type: DataTypes.INTEGER,
		    field: 'sharer_id',
		    comment: '分享者id'
	    },
	    sharedId: {
		    type: DataTypes.INTEGER,
		    field: 'shared_id',
		    comment: '被分享者id'
	    },
	    isShareAll: {
		    type: DataTypes.INTEGER,
		    field: 'is_share_all',
		    comment: '是否分享所有人 1:是 0:否'
	    }
    }, {
	   tableName: 'event_share',
	   timestamps: false,
	   // paranoid: true,
	   charset: 'utf8',
       collate: 'utf8_general_ci'
    })
}
    
