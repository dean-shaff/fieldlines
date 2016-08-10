function Vector(arr){

	this.vals = arr; 
	this.shape = this.vals.length; 

	this.mult = function(val_new){
		var temp = new Array(this.shape)
		if (typeof val_new == "number"){
			var getVal = function(i){return val_new} ;
		}else{
			var getVal = function(i){return val_new.vals[i]};
		}
		for (var i=0;i<this.shape;i++){
			// console.log(this.vals[i],arr_new.vals[i]);
			temp[i] = this.vals[i]*getVal(i);
		}
		return new Vector(temp);
	}

	// this.mult = function(val){
	// 	var temp = new Array(this.shape)
	// 	for (var i=0;i<this.shape;i++){
	// 		temp[i] = this.vals[i]*val
	// 	}
	// 	return new Vector(temp);
	// }

	this.add = function(arr_new){
		var temp = new Array(this.shape)	
		for (var i=0;i<this.shape;i++){
			temp[i] = this.vals[i]+arr_new.vals[i]
		}
		return new Vector(temp);
	}

	this.magdiff = function(arr_new){
		var sum = 0 ;
		for (var i=0;i<this.shape;i++){
			sum += Math.pow(this.vals[i] - arr_new.vals[i], 2);
		}
		return Math.pow(sum,0.5)
	}



}