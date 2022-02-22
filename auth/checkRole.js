module.exports = {
    checkRole: (req, res, next) => {
        if(req.decoded.role == 'admin'){
            next()
        }
    }
}