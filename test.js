const Sequelize = require('sequelize');
var sequelize = new Sequelize('dbtest', 'root', '000000', {
         host: 'localhost',
         dialect: 'mysql',
         pool: {
             max: 5,
             min: 0,
             idle: 30000
         }
});


var User = sequelize.define('User',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id',
		comment: '用户id'
	},
	username: {
		type: Sequelize.STRING(50),
		field: 'username',
		comment: '用户名称'
	}
}, {
	tableName: 'user',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})


var Address = sequelize.define('Address',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id',
		comment: '地址id'
	},
	path: {
		type: Sequelize.STRING(50),
		field: 'path',
		comment: '地址'
	},
	userId: {
		type: Sequelize.INTEGER,
	    field: 'user_id',
		comment: '用户id'
	}
}, {
	tableName: 'address',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})


User.hasMany(Address,{foreignKey:'user_id',as:'addresses'});
// Address.belongsTo(User, {foreignKey:'user_id'});

sequelize.sync({froce:true});

var paramObj = {
	username:'王梓霖',
	addresses:[{
		path:"汉旺3"
	},{
		path:"天池4"
	}]
}
User.create(paramObj,{
  include: [{
    model: Address,
    as: 'addresses'
  }]
}).then(user => {

console.log('************************')
	// var names="";       
 //    for(var name in user){       
 //       names+=name+": "+user[name]+", ";  
 //    }  
 //    console.log(names);
	// var a = Address.build({
	// 	id:20,
	// 	path:'hanwang'
	//  }
	// )
	// user.setWorks(a)
	// console.log('************************')
	// console.log(user)
	console.log('************************');
	// user.setWorks([{
	// 	path:'3123132'
	// }
	// ]).then(()=>{
	// 	console.log("ok")
	// })
	// var newAddress = Address.build({path:'绵竹中心广场',userId:user.dataValues.id});

	// console.log(newAddress)
	// user.addAddress(newAddress)
})



