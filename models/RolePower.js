//角色权限表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RolePower',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '关联的id'
	    },
	    roleId: {
		    type: DataTypes.INTEGER,
		    field: 'role_id',
		    comment: '角色id'
	    },
	    powerCode: {
		    type: DataTypes.STRING(100),
		    field: 'power_code',
		    comment: '权限码'
	    }
    }, {
	    tableName: 'role_power',
    	timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}