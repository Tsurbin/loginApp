
module.exports = function headersMiddleware(req, res, next) {
    const origin = req.get('Origin');
    if (origin) {
        res.set('Access-Control-Allow-Origin', origin);
    }

    const allowHeaders =
        'accept, content-type, authorization, role,refreshToken, Origin, X-Requested-With, content-type, Accept, Authorization, X-OC-System, X-OC-Correlation';
    res.set({
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Headers': allowHeaders,
        'Cache-Control': 'no-store'
    });
    

    next();
};
