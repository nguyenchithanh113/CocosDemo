// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getPhysicsManager();
        var collisionManager = cc.director.getCollisionManager();
        manager.enabled = true;
        collisionManager.enabled = true;
        collisionManager.enabledDebugDraw = true;
        collisionManager.enabledDrawBoundingBox = true;
        cc.log("collisionManager")
    },

    start () {

    },

    // update (dt) {},
});
