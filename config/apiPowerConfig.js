module.exports = () => {
	return [
            {   
        	typeName: '员工接口',
        	typeCode: 2,
        	list: [
        	    {
        	       path: '/employee/list',
        	       powerCode: 2001,
        	       des: '访问查询员工列表接口'
        	    },
                    {
        	       path: '/employee/add',
        	       powerCode: 2002,
        	       des: '访问添加员工接口'
        	    },
        	]        	
            },
            {   
                typeName: '部门管理接口',
                typeCode: 3,
                list: [
                    {
                       path: '/department/list',
                       powerCode: 3001,
                       des: '访问查询部门列表接口'
                    },
                    {
                       path: '/department/add',
                       powerCode: 3002,
                       des: '访问添加员工接口'
                    },
                    {
                       path: '/department/edit',
                       powerCode: 3003,
                       des: '访问编辑员工接口'
                    },
                    {
                       path: '/department/delete',
                       powerCode: 3004,
                       des: '访问删除员工接口'
                    },
                ]               
            },

	]
}