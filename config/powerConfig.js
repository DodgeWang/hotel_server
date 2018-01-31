module.exports = () => {
	return [
               {   
                 name: '员工管理',
                 code: 1001,
                 list: [{
                             path: '/admin/employees',
                             des: '员工管理首页'
                         },{
                             path: '/admin/employees/create',
                             des: '新建员工页面'
                         }]              
               },
               {   
                 name: '部门管理',
                 code: 2001,
                 list: [{
                             path: '/admin/departments',
                             des: '部门管理首页'
                         },{
                             path: '/admin/departments/create',
                             des: '创建部门页面'
                         },{
                             path: '/admin/departments/edit',
                             des: '编辑部门信息页面'
                         }]              
               },
               {   
                 name: '角色管理',
                 code: 3001,
                 list: [{
                             path: '/admin/roles',
                             des: '角色管理首页'
                         },{
                             path: '/admin/roles/create',
                             des: '创建角色页面'
                         },{
                             path: '/admin/roles/edit',
                             des: '编辑角色页面'
                         }]              
               },
               {   
                 name: '客房管理',
                 code: 4001,
                 list: [{
                             path: '/admin/rooms',
                             des: '客房管理首页'
                         },{
                             path: '/admin/rooms/create',
                             des: '创建客房页面'
                         },{
                             path: '/admin/rooms/edit',
                             des: '编辑客房页面'
                         }]              
               },
               {   
                 name: '客房类型管理',
                 code: 5001,
                 list: [{
                             path: '/admin/roomtypes',
                             des: '客房类型管理首页'
                         },{
                             path: '/admin/roomtypes/create',
                             des: '创建客房类型页面'
                         },{
                             path: '/admin/roomtypes/edit',
                             des: '编辑客房类型页面'
                         }]              
               },
               {   
                 name: '物品管理',
                 code: 6001,
                 list: [{
                             path: '/admin/articles',
                             des: '物品管理首页'
                         },{
                             path: '/admin/articles/create',
                             des: '创建物品页面'
                         },{
                             path: '/admin/articles/edit',
                             des: '编辑物品页面'
                         }]              
               },
               {   
                 name: '任务链管理',
                 code: 7001,
                 list: [{
                             path: '/admin/taskchains',
                             des: '任务链管理首页'
                         },{
                             path: '/admin/taskchains/edit',
                             des: '编辑任务链页面'
                         }]              
               },
               {   
                 name: '工作排班管理',
                 code: 8001,
                 list: [{
                             path: '/admin/schedule',
                             des: '排班管理首页'
                         }]              
               },
	       ]
}