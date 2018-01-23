//handlebars模板引擎自定义helper

let helper = {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },

        if_eq: function(v1, v2, opts) {
            if(v1 == v2){
            	return opts.fn(this);
            }    
            else{
            	return opts.inverse(this);
            }
        }


}

module.exports = helper;