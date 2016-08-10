var masses = [1,1] ; 
var balls = new Array(masses.length) ;
var nBodies = masses.length;
var mass_pos ;
var ys ; 
var hs ;
var rate = 60;
var G = 1;
var thresh = 4;
var h_init = 0.3;
var epsilon = Math.pow(thresh,2.);
function setup() {
	createCanvas(windowWidth, windowHeight);
	balls[0] = new Ball(width/2-200, height/2+150,60,60)
	balls[1] = new Ball(width/2+200,height/2+150, 60,60)
	// balls[2] = new Ball(width/2,height/2 -150,60,60)
	// mass_pos = [[width/2-200, height/2+150],[width/2+200,height/2+150],[width/2,height/2 -150]];
	start();

	// ys.push(new Vector([200,0,200,0]))
	hs = new Array(ys.length);
	for (var n =0; n<ys.length;n++){
		hs[n] = h_init;
	}
	strokeWeight(2);
}

function draw() {
	fill(0,10);
	rect(0,0,width,height);

	fill(0);
	for (var i=0;i<nBodies;i++){
		balls[i].render(200,0);
		// ellipse(mass_pos[i][0],mass_pos[i][1],50,50);
	}
	for (var n=0; n<ys.length;n++){
		var y_prev = new Vector(ys[n].vals);
		var y = ys[n];
		for (var i=0; i<rate; i++){
			y = rungeKuttaStep(hs[n],fprime,y);
		}
		ys[n] = y;
		var diff = y.magdiff(y_prev);
		hs[n] = h_smoother(diff);
		// console.log(hs[n]);
		// if (diff < thresh){
		// 	hs[n] += 0.01;

		// }else if (diff > thresh){
		// 	hs[n] -= 0.01;
		// }
		// console.log(diff/hs[n]);
		// console.log(y.magdiff(y_prev));
		// var vel = Math.pow(y.vals[1],2) + Math.pow(y.vals[3],2)
		var vel = Math.pow((Math.pow(y.vals[1],2) + Math.pow(y.vals[3],2)), 0.5);
		var vel_map = map(vel, 0.05, 0.17, 60,-10);
		colorMode(HSB);
		strokeWeight(2);
		stroke(vel_map,255,100);
		line(y_prev.vals[0], y_prev.vals[2], y.vals[0], y.vals[2]);
		colorMode(RGB);
		stroke(0,0,0);


	}

	// console.log(y.vals);
	// ellipse(y.vals[0],y.vals[2],10,10);
}

function mousePressed(){
	for (var i=0;i<nBodies;i++){
		var ball = balls[i];
		if (ball.checkMouse()){
			ball.set_locked(true);
		}else{
			ball.set_locked(false);
		}
	}
}

function keyTyped() {
	// console.log("Key Pressed");
	console.log(key);
	if (key === "r") {
		start();
	}
}

function mouseDragged(){
	for (var i=0;i<nBodies;i++){
		var ball = balls[i];
		if (ball.get_locked()){
			ball.render(0,2);
			// ellipse(ball.x,ball.y,ball.size_x,ball.size_y);
			ball.change_xy(mouseX, mouseY);
		}
	}
}

function h_smoother(diff){
	// if (diff < thresh){
	h = 1.5+ (-((1.5-h_init)/thresh) * diff)
	if (h < 0.001){
		h = 0.001;
	}
	return h;

		// h = h_init*Math.exp((-diff + thresh));
		// println(h)
}

function squared_part_fn(y_test,y_bod){
    /*
    body1 is the number of the first body
    body2 is the number of the second body 
    should be zero indexed. 
    */
    var x1 = y_test.vals[0];  
    var x2 = y_bod[0]; 
   	var y1 = y_test.vals[2];
    var y2 = y_bod[1]; 
    var dist = Math.pow((x1-x2),2.) + Math.pow((y1-y2),2.)
    var squared_part_ = Math.pow((dist+epsilon),-1.5);
    // return smoothing(squared_part_); 
    return squared_part_;
}



function fprime(y_test){
	/*
	Derivative 'operator' for the Nbody problem. Take the current
	y values for the problem and returns the derivative. 
	*/
    var y_prime_ = new Array(4) ; 
    var y_prime_val_x = 0.0 ;
    var y_prime_val_y = 0.0 ; 
    for (var i=0; i < nBodies; i++){
    	var ball = balls[i];
    	var y_bod = [ball.x, ball.y] ;
        var squared_part = squared_part_fn(y_test,y_bod);
        y_prime_val_x = y_prime_val_x - G*masses[i]*(y_test.vals[0] - y_bod[0])*squared_part ; 
        y_prime_val_y = y_prime_val_y - G*masses[i]*(y_test.vals[2] - y_bod[1])*squared_part ; 
    }
    y_prime_[0] = y_test.vals[1] //- 0.01*y_test.vals[1]; 
    y_prime_[2] = y_test.vals[3] //- 0.01*y_test.vals[3]; 
    y_prime_[1] = y_prime_val_x;  
    y_prime_[3] = y_prime_val_y;             
    return new Vector(y_prime_);
}

function rungeKuttaStep(h,f_prime,y) {
	/*
	Assumes that fprime takes x and yas arguments, 
	where x and y are arrays of PVectors 
	*/
	var k1 = f_prime(y);
	var k2 = f_prime(y.add(k1.mult(h/2)));
	var k3 = f_prime(y.add(k2.mult(h/2)));
	var k4 = f_prime(y.add(k3.mult(h)));
	var yp1 = y.add((k1.add((k2.mult(2))).add((k3.mult(2))).add(k4)).mult(h/6.));
	return yp1 ;
}

function start() {
	background(0);
	ys = [];
	for (var i=0;i<width;i+=width/5){
		var y_temp0 = new Vector([i,0,0,0])
		var y_tempmax = new Vector([i,0,height,0])
		ys.push(y_temp0);
		ys.push(y_tempmax);
	}	
	for (var i=0;i<height;i+=height/5){
		var y_temp0 = new Vector([0,0,i,0])
		var y_tempmax = new Vector([width,0,i,0])
		ys.push(y_temp0);
		ys.push(y_tempmax);
	}

}
