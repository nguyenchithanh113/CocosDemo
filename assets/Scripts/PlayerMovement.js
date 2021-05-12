// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed:5,
        skin:{
            default:null,
            type:cc.Node
        },
        idle:"idle"
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.reverseAngle = 0;

        this.accLeft = false;
        this.accRight = false;

        this.rb = this.node.getComponent(cc.RigidBody);
        this.currentSpeed;

        this.canjump = true;

        this.skeleton = this.skin.getComponent("sp.Skeleton");
        console.log(this.skeleton.animation);

    },
    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onKeyDown(event){
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                this.accRight = false;
                break
            case cc.macro.KEY.d:
                this.accLeft = false;
                this.accRight = true;
                break
            case cc.macro.KEY.space:               
                if(this.canjump){
                    this.Jumping();
                    this.canjump = false;
                }
                break;
        }
    },
    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },
    Jumping(){
        this.rb.applyForceToCenter(cc.v2(0,200000))
    },
    SetAnimation(trackIndex = 0, animationName = "",loop = false){
        if(animationName!=this.skeleton.animation){
            this.skeleton.setAnimation(trackIndex, animationName, loop);
        }
    },
    GetPosAfterRotate(point = cc.v2(),degree = 0){
        let x = point.x;
        let y = point.y;
        degree = degree * (Math.PI/180);
        point.x = x*Math.cos(degree) - y*Math.sin(degree);
        point.y = y*Math.cos(degree) + x*Math.sin(degree);
        return point;
    },
    onBeginContact(contact, selfCollider, otherCollider) {
        if(selfCollider.tag == 1){
            var worldManifold = contact.getWorldManifold();
            var point = worldManifold.points[0];
            var thisPos = cc.v2();
            
            thisPos.x = this.node.x;
            thisPos.y = this.node.y;
            var dis = point.sub(thisPos).mag();
            cc.log(dis);
        }
        
        cc.log("collide");
    },
    
    start () {

    },

    update (dt) {
        if(this.accLeft){
            this.node.x -= this.speed * dt;
            this.node.angle += this.speed * dt;
        }else if(this.accRight){
            this.node.x += this.speed * dt;
            this.node.angle -= this.speed * dt;
        }
        // reverseAngle = -this.node.angle;
        // let preFootPos = cc.v2();
        // preFootPos.x = this.foot.x;
        // preFootPos.y = this.foot.y;
        // preFootPos = this.GetPosAfterRotate(preFootPos,reverseAngle);
        // this.foot.x = preFootPos.x;
        // this.foot.y = preFootPos.y; 
    },
});
