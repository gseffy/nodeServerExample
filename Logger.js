var Logger = require('bunyan');
var logerPath = 'C:\\log.log';

log = new Logger({
    name: 'Logger',
    streams: [
        {
            level: 'info',
            path: logerPath
        },
        {
            level: 'error',
            path: logerPath
        }

    ],
    serializers: {
        req: Logger.stdSerializers.req,
        res: Logger.stdSerializers.res
    }
});


/**
 * Description
 * @method LogInfo- print to inno.log file the info msg.
 * @param {} theMsg
 * @return
 */
exports.LogInfo = function(info){

    log.info(info);
}

/**
 * Description
 * @method LogWarning -  print to inno.log file the warning msg.
 * @param {} theMsg
 * @return
 */
exports.LogWarning = function(theMsg){
    log.warn(theMsg);
}

/**
 * Description
 * @method LogError - print to inno.log file the error msg.
 * @param {} theMsg
 * @return
 */
exports.LogError = function(err,theMsg){
    var str="";
    if(err!=undefined || err!=null)
        if(typeof err === 'object')
            str=(err.message+ " "+ err.stack)+"\n";
    if(theMsg!=null && theMsg!=undefined)
        str=theMsg+str;
    log.error(str);
}


/**
 * Description
 * @method LogRequest - print to inno.log file the info msg while request.
 * @param {} request
 * @param {} theMsg
 * @return
 */
exports.LogRequest= function(request,theMsg){
    log.info(request, theMsg);
}

/**
 * Description
 * @method LogResponse -  print to inno.log file the info msg while response.
 * @param {} response
 * @param {} theMsg
 * @return
 */
exports.LogResponse= function(response,theMsg){
    log.info(response, theMsg);
}
