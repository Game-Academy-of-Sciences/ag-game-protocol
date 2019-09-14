
输赢响应（其他人）  VideoGameCore.GamePayoutOtherResp

自己输赢(下注后才有响应)  GamePayoutMeResp  



getCMDEnterRoad
getCMDAutoEnterTable
AutoEnterTableVidResp
getCMDKeepSeq
getCMDGameTableExit  这个可能是5次未下注强制退出


GameJettonResp     下注响应
BacGameResultResp  所有桌子的响应


            console.log('------VideoGameCore.BacGameResultResp------');
            console.log('vid:' + this["vid"]);
            console.log('res:' + this["res"]);
            console.log('code:' + this["code"]);
            console.log('bval:' + this["bval"]);
            console.log('pval:' + this["pval"]);
            console.log('num:' + this["num"]);
            console.log('pair:' + this["pair"]);