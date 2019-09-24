const Websocket = require('websocket').w3cwebsocket;
// const {cmd, analysis, plazeFlagsMap, RoomFlagsMap} = require('./ag');
const cmd = require('./ag/cmd');
const { RoomFlagsMap, plazeFlagsMap } = require('./ag/cmd');

function Ws(url, onMessage, onConnect, onClose, onError) {
    var ws = new Websocket(url);
    ws.binaryType="arraybuffer";

    var isConnect = false;
    var lastTickTime = 0;
    var tickData = cmd.getTickData();
    var pingData = cmd.getPingData();

    function sendHearData() {
        var currentTickTime = new Date().getTime();
        if (currentTickTime - lastTickTime >= 1e4) {
            ws.send(pingData);
            ws.send(tickData);
            lastTickTime = currentTickTime;
        }
    }

    ws.onopen =  () => {
        sendHearData();
    };

    ws.onmessage = (event) => {
        sendHearData();
        
        var message = Buffer.from(event.data);
        if (message.equals(tickData)) {
            if(!isConnect) {
                isConnect = true;
                if(onConnect !== undefined) onConnect(ws);
            }
        } else {
            if(!isConnect) {
                ws.close();
            } else {
                onMessage(ws, message);
            }
        }

    };

    ws.onclose = () => { 
        if(onClose !== undefined) {
            onClose(ws);
        }
    };
    ws.onerror = (err) => { 
        if(onError !== undefined) {
            onError(ws, err);
        }
    };
    return ws;
}


module.exports = Ws;