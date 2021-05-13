// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.win = false;
    },

    start () {

    },

    update (dt) {
        let thisPos = this.node.getPosition();
        let playerPos = this.player.getPosition();
        let dis = thisPos.sub(playerPos).magSqr();
        if(dis < 250){
            if(!this.win){
                this.win =  true;
                this.winGame()
            }
        }
    },
    winGame(){
        cc.director.pause();
        cc.log("win");
    }
});
