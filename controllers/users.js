'use strict';

// insert modules from container.js
module.exports = function(_) {
    return {
        SetRouting: function(router) {
            router.get('/', this.indexPage);
        },

        indexPage: function(req, res) {
            return res.render('index');
        }
    }
}