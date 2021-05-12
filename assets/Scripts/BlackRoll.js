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
        RIGHT:"RIGHT"
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("blackroll");
        this.unitVec = cc.Vec3.FORWARD;
        this.unitVec.x =this.node.x + 25;
        this.currentAngle = 0;
        this.angle = 180; 

        this.rotPoint = cc.v2(this.node.x-25,this.node.y-25);
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
        this.step = 1;
        this.collider = this.node.getComponent(cc.PhysicsBoxCollider);
        this.debugCollider = this.node.getComponent(cc.BoxCollider);
        cc.log("collider: " +this.collider.offset.x + " "+this.collider.offset.y );
        
        //cc.log("cord "+this.corners[0].cord.x);
        
    },
    setAnchor(direct){
        if(direct == this.LEFT){
            
            if(this.currentCorner == "bot_right"){
                this.currentCorner = "bot_left";
                this.currentCornerIndex = 3;
            }else if(this.currentCorner == "bot_left"){
                this.currentCorner = "top_left";
                this.currentCornerIndex =  2;
            }else if(this.currentCorner == "top_left"){
                this.currentCorner = "top_right";
                this.currentCornerIndex = 1;
            }else if(this.currentCorner == "top_right"){
                this.currentCorner = "bot_right";
                this.currentCornerIndex = 0;
            }
            this.node.anchorX = this.corners[this.currentCornerIndex].cord.x;
            this.node.anchorY = this.corners[this.currentCornerIndex].cord.y;
            
            cc.log(this.collider.offset.x +" "+this.collider.offset.y);
            //cc.log("LEFT :" + this.node.anchorX + " " + this.node.anchorY);
            this.node.x -= 50;
        }else{
            if(this.currentCorner == "bot_right"){
                this.currentCorner = "top_right";
                this.currentCornerIndex = 1;
            }else if(this.currentCorner == "bot_left"){
                this.currentCorner = "bot_right";
                this.currentCornerIndex =  0;
            }else if(this.currentCorner == "top_left"){
                this.currentCorner = "bot_left";
                this.currentCornerIndex = 3;
            }else if(this.currentCorner == "top_right"){
                this.currentCorner = "top_left";
                this.currentCornerIndex = 2;
            }
            this.node.anchorX = this.corners[this.currentCornerIndex].cord.x;
            this.node.anchorY = this.corners[this.currentCornerIndex].cord.y;
            //cc.log("RIGHT: " + this.node.anchorX + " " + this.node.anchorY);
            this.node.x += 50;
            this.count = 0;
        }
        //cc.log(this.node.anchorX + " " + this.node.anchorY);
    },
    start () {
        
    },
    degreeToRad(degree){
        var rad = degree * (Math.PI/180);
        return rad;
    },
    update (dt) {
        // if(this.count <this.angle){
        //     // var tempX = this.original.x;
        //     // var tempY = this.original.y;
        //     // this.count++;
        //     // this.currentAngle -= 1;
            
            
        //     // let newX = tempX * Math.cos(this.degreeToRad(this.currentAngle)) - tempY*Math.sin(this.degreeToRad(this.currentAngle));
        //     // let newY = tempX * Math.sin(this.degreeToRad(this.currentAngle)) - tempY*Math.cos(this.degreeToRad(this.currentAngle));
        //     // this.node.x = newX;
        //     // this.node.y = newY;
        //     // cc.log(this.node.x)
        //     // this.node.angle = this.currentAngle;
        //     if(this.finishStep){
        //         this.currentAngle = 0;
        //         this.finishStep = false;
        //         if(this.step%5==0){
        //             if(this.currentDirect == this.LEFT){
        //                 this.setAnchor(this.RIGHT);
        //                 this.currentDirect = this.RIGHT;
        //             }else{
        //                 this.setAnchor(this.LEFT);
        //                 this.currentDirect = this.LEFT;
        //             }
        //         }
        //     }
        //     if(this.currentDirect == this.LEFT){
        //         if(this.currentAngle < 90){
        //             this.currentAngle+=2;
        //             this.node.angle+=2;
        //         }else{
        //             this.setAnchor(this.LEFT);
        //             this.step++;
        //             this.finishStep= true;
        //         }
        //     }else{
        //         if(this.currentAngle < 90){
        //             this.currentAngle+=2;
        //             this.node.angle-=2;
        //         }else{
        //             this.setAnchor(this.RIGHT);
        //             this.step++;
        //             this.finishStep= true;
        //         }
        //     }
            
        // }
        //this.node.angle+=1;
        //this.node.x-=1;
        
        this.currentAngle++;
        this.count ++;
        let newX = (this.original.x - this.rotPoint.x)*Math.cos(this.degreeToRad(this.count)) - (this.original.y - this.rotPoint.y)*Math.sin(this.degreeToRad(this.count)) + this.rotPoint.x
        let newY = (this.original.x - this.rotPoint.x)*Math.sin(this.degreeToRad(this.count)) + (this.original.y - this.rotPoint.y)*Math.cos(this.degreeToRad(this.count)) + this.rotPoint.y
        this.node.x = newX;
        this.node.y = newY;
        this.node.angle = this.currentAngle;
        if(this.count % 90 == 0){
            this.original.x = newX;
            this.original.y = newY;
            this.count = 0;
            this.rotPoint = cc.v2(this.original.x-25,this.original.y-25);
        }
        
    },
});
