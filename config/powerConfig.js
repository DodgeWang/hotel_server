module.exports = () => {
	return [
           {   
             name: '部门管理',
             code: 1001,
             list: [{
                         path: '/admin/departments',
                         des: '部门管理首页'
                     },{
                         path: '/admin/departments/create',
                         des: '创建部门页面'
                     }]              
           },
	       ]
}