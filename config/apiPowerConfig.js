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
        }

	]
}