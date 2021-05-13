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
        this.button = this.node.getComponent(cc.Button);
        this.playerMovement =  this.player.getComponent("PlayerMovement");
        
        
        
        // this.button.node.on(cc.Node.EventType.TOUCH_START, function (event) {
        //     this.playerMovement.Jumping();
        // });
        // this.button.node.on(cc.Node.EventType.TOUCH_END, function (event) {
        //     this.playerMovement.OnLeftUp();
        // });
        
    },
    onTouchStart(){
        
    },
    start () {
        // this.playerMovement.OnLeftDown();
        var movement = this.playerMovement;
        this.button.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            movement.OnRightDown();
        });
        this.button.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            movement.OnRightUp();
        });
    },

    // update (dt) {},
});
