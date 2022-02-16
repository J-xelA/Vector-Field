let W = window.innerWidth;
let H = window.innerHeight;

let points = []; // Intial positions
let smooth = 0.00005; // Lower = more smooth
let compactness = 750; // Lower = more compact
let max = 0;
let reds, greens, blues; // Random color values

function setup(){
	createCanvas(W, H);
	background(15);
	noiseDetail(1);

	let density = 101; // Higher = more dense

	for(let x = 0; x < W; x += (W/density)){
		for(let y = 0; y < H; y += (W/density)){
			let point = createVector(random(-100, 100)+x, random(-100, 100)+y);
			points.push(point);
		}//for
	}//for

	shuffle(points, true);

	reds = random(255);
	greens = random(255);
	blues = random(255);
}//setup()

function draw(){
	noStroke();
	if(frameCount == 500)
		noLoop();

	console.log(frameCount);

	if(33*frameCount <= points.length)
		max = 33*frameCount;
	else
		max = points.length;

	for(let i = 0; i < max; ++i){
		let R = map(points[i].x, 0, W, reds, greens);
		let G = map(points[i].y, 0, H, blues, reds);
		let B = map(points[i].x, 0, W, greens, blues);

		fill(R, G, B);

		let angle = map(noise(smooth*points[i].x, smooth*points[i].y), 0, 0.5, 0, compactness);
		points[i].add(createVector(cos(angle), sin(angle)));
		
		ellipse(points[i].x, points[i].y, 2);
	}//for
}//draw()

(function () {
	let SSWZ = function () {
		this.keyScrollHandler = function (e) {
			if (e.ctrlKey) {
				e.preventDefault();
				return false;
			}
		}
	};

	if (window === top) {
		let sswz = new SSWZ();
		window.addEventListener('wheel', sswz.keyScrollHandler, { passive: false });
	}
})();