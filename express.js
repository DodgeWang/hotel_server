const express = require('express');


module.exports = () => {
	console.log('int express...');
    let app = express();
    

    app.get('/test',(req,res,next) => {
    	res.json({name:'1'})
    });

    return app;
}