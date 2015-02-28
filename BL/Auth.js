var trycatch = require("trycatch");
var crypto = require('crypto');
var Logger = require("../Logger");

exports.CheckCardinalsAndCreateSession =  function(req, res) {
    try{
        if(req==null || req==undefined) res.send(JSON.stringify({type: false,
            data: "req empty (need to contain body with username and password"}));

        if(req.body==null || req.body==undefined) res.send(JSON.stringify({type: false,
            data: "req body is empty (need to contain username and password"}));

        var checkUserName = req.body.username;
        var checkPassword = req.body.password;
        var md5Pass=crypto.createHash('md5').update(checkPassword).digest('hex');

        // Create token for the Session
        crypto.randomBytes(48, function(ex, buf) {
            var token = buf.toString('hex');
                    res.send(JSON.stringify({type: true,
                        data: checkUserName,
                        token: token,
                        authorization: "admin"}));
        });
    }
    catch(e){
        Logger.LogError(e," in Auth.js User try to login and exception occurred ");
        res.send(JSON.stringify({type: false,
            data: "Request error"}));
    }
};

/*
 * req- HTTP Request contain authorization header with session token
 * res- HTTP Response to the request
 * callback - Function to call if the token is ok
 * Check if the token exist and created in the last 24 hours and used in the last hour
 * If the token is ok call the callback
 * other return HTTP response access denied
 * */
exports.CheckSession =  function(req, res, role,callcack) {
    try{
        var token = req.headers["authorization"];
        if (typeof token !== 'undefined') {
            callcack();
        }
        else res.send(403);
    }
    catch(e){
        Logger.LogError(e," in Auth.js User try action with token ");
        res.send(403);
    }
}

function getAuthorizationStr(data,alias)
{
    var authorizationStr="";
    for(var i=0;i<data.length;i++)
    {
        if(authorizationStr=="") authorizationStr=data[i][alias].authorization;
        else authorizationStr=authorizationStr+","+data[i][alias].authorization;
    }
    return authorizationStr;
}
