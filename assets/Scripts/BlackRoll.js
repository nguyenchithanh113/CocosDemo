// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        LEFT:"LEFT",
        RIGHT:"RIGHT",
        speed:2
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("blackroll");
        this.currentAngle = 0;
        this.angle = 180; 

        this.rotPoint = cc.v2(this.node.x-35,this.node.y-35);
        this.finishStep = true;

        this.original = cc.v2(this.node.x,this.node.y);
        
        this.radAngle = 90 * (Math.PI/180);
        this.count = 0;
        this.topRight = {name:"top_right",cord:cc.v2(1,1),collider:cc.v2(-25,-25)};
        this.botRight = {name:"bot_right",cord:cc.v2(1,0),collider:cc.v2(-25,25)};
        this.topLeft = {name:"top_left",cord:cc.v2(0,1),collider:cc.v2(25,-25)};
        this.botLeft = {name:"bot_left",cord:cc.v2(0,0),collider:cc.v2(25,25)};
        this.corners = [this.botRight,this.topRight,this.topLeft,this.botLeft];
        this.currentCornerIndex = 0;
        this.currentCorner = "bot_left";

        this.currentDirect = this.LEFT;
        this.step = 0;
        this.collider = this.node.getComponent(cc.PhysicsBoxCollider);
        this.debugCollider = this.node.getComponent(cc.BoxCollider);
        cc.log("collider: " +this.collider.offset.x + " "+this.collider.offset.y );
        

        
    },
    die(){
        cc.log("die");
        cc.log(cc.isValid(this.node))
        this.node.active = false;
        //this.node.obj.destroy();
    },
    start () {
        
    },
    degreeToRad(degree){
        var rad = degree * (Math.PI/180);
        return rad;
    },
    update (dt) {
        
        
        this.currentAngle+=this.speed;
        this.count += this.speed
        
        let newX = (this.original.x - this.rotPoint.x)*Math.cos(this.degreeToRad(this.count)) - (this.original.y - this.rotPoint.y)*Math.sin(this.degreeToRad(this.count)) + this.rotPoint.x
        let newY = (this.original.x - this.rotPoint.x)*Math.sin(this.degreeToRad(this.count)) + (this.original.y - this.rotPoint.y)*Math.cos(this.degreeToRad(this.count)) + this.rotPoint.y
        this.node.x = newX;
        this.node.y = newY;
        this.node.angle = this.currentAngle;
        
        if(this.count % 90 == 0){
            this.step++;           
            this.original.x = newX;
            this.original.y = newY;
            this.count = 0;
            //this.rotPoint = cc.v2(this.original.x-25,this.original.y-25);
            if(this.step%4==0){
                this.speed *= -1;            
            }
            if(this.speed<0){
                this.rotPoint = cc.v2(this.original.x+35,this.original.y-35);        
            }else{
                this.rotPoint = cc.v2(this.original.x-35,this.original.y-35);
            }   
        }
        
    },
});
