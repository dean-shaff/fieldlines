function Ball(x, y, size_x, size_y) {
	this.x = x ;
	this.y = y ; 
	var size_x_min = 20;
    var size_y_min = 20;
    var factor = 4.0;

	this.constructor1 = function() {
		this.size_x = size_x_min;
		this.size_y = size_y_min;
	}

	this.constructor2 = function (size_x, size_y) {
		this.size_x = size_x/factor + size_x_min;
		this.size_y = size_y/factor + size_y_min;
	}

	if (size_x === undefined && size_y === undefined) {
		this.constructor1();
	} else {
		this.constructor2(size_x, size_y);
	}

	var locked = false;
    
   	this.checkMouse = function(){
        if (mouseX > this.x - this.size_x && mouseX < this.x + this.size_x && 
            mouseY > this.y - this.size_y && mouseY < this.y + this.size_y){
                return true;      
            }else{
                return false;
            }
    }

    this.set_locked = function(val){
        this.locked = val;   
    }
    
    this.get_locked = function(){
         return this.locked;   
    }
    
    this.render = function(fill_val,size_adjust){
        strokeWeight(0);
        fill(fill_val);
        ellipse(this.x, this.y, this.size_x+size_adjust, this.size_y+size_adjust);            
        // fill(fill_val);
        // var factor = 0.9;
        // if (fill_val == 0){
        //     for (var r=this.size_x+size_adjust; r > (factor*(this.size_x+size_adjust)); r -= this.size_x/5){
        //         var fill_temp = map(r,this.size_x+size_adjust,0,255,0)
        //         fill(fill_temp)
        //         ellipse(this.x, this.y, r, r);
        //     }
        //     fill(0)
        //     // ellipse(this.x, this.y, this.size_x+size_adjust, this.size_y+size_adjust);
        //     ellipse(this.x,this.y,(factor*(this.size_x+size_adjust)),(factor*(this.size_x+size_adjust)))
        // else{
        //     fill(0);
        //     ellipse(this.x, this.y, this.size_x+size_adjust, this.size_y+size_adjust);
        // }
    }
    
    this.change_xy = function(x_new, y_new){
        this.x = x_new ;
        this.y = y_new ; 
    }
    
    this.change_size = function (size_new_x, size_new_y){
        //if (size_new_x < size_x_min){
        //    size_x = size_x_min;   
        //}
        //else if (size_new_y < size_y_min){
        //    size_y = size_y_min;   
        //}
        //size_x = (float) Math.sqrt(size_new_x);
        //size_y = (float) Math.sqrt(size_new_y);
        this.size_x = size_new_x/factor + size_x_min;
        this.size_y = size_new_y/factor + size_y_min;
    }
}