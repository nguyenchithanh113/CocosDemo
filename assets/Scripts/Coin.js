// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        effect:{
            default:null,
            type:cc.Prefab
        }
    },


    // onLoad () {},

    start () {

    },
    onBeginContact(contact, selfCollider, otherCollider){
        if(otherCollider.node.name = "Player"){
            var canvas = this.node.parent;
            var fx = cc.instantiate(this.effect);
            fx.parent = canvas;
            fx.x = this.node.x;
            fx.y = this.node.y;
            this.node.active = false;
        }
    },


    // update (dt) {},
});
