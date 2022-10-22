
module.exports.isAuthorized = function (req, res, next) {
    if (req.session.user) {
        next()
    }
    else {
        res.redirect('/')
    }

    
    };

    
module.exports.adminAuthorized = function (req, res, next) {
    if (req.originalUrl != '/admin/login'){
        
        if (req.session.admin) {
            next()
        }
        else {
            res.redirect('/admin/login')
        }
    }
        
    else {
        next()
    }
    
    };
