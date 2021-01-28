// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
Adapted from:
ml5 Example
PoseNet example using p5.js
Available at https://ml5js.org
=== */
let type;
let video;
let poseNet;
let poses = [];
let side = '좌측';
let camera = 'rear';

let maxKneeFlexion = 180;
let maxHipFlexion = 180;
let maxDorsiflexion = 180;
let maxTrunkLean = 180;

let knee, hip, ankle, kneeFlexion, dorsiflexion, hipFlexion, shoulder, anKnee, sHip, trunkLean;
//for side check
let ankleOps, asideCheck, ssideCheck, ankles, shoulderOpt, shoulders;

let standPos = 0;
let squatPos = 0;

//for counting
let psquatPos = 0;
let pvalue = 0;
let kcal = 0;
let squat = [];
let count = 0;

//for angles
let squatAng = 0;
let shCount = 0;
let backPos = 0;
let kneePos = 0;
let upPos = 0;

//for angel ring
let leftx;
let lefty;
let rightx; 
let righty;
let xpoint;
let ypoint; 
let diameter;

function setup() {
	let canvas = createCanvas(640, 480);
	canvas.parent('app');

	constraints = {
		video: {
			width: { max: 640 },
			height: { max: 480 },
			facingMode: {
				ideal: 'environment'
			}
		}
	};
	video = createCapture(constraints);
	video.size(width, height);
	type = 'single';
	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, modelReady, type);

	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	// and extracts only the keypoints we are interested in (knee, hip, ankle, shoulder)
	// before also calculating the angles between these keypoints with atan2
	poseNet.on('pose', function(results) {
		poses = results;

		if (poses.length > 0) {
			switch (side) {
				case '좌측':
					knee = poses[0].pose.leftKnee;
					hip = poses[0].pose.leftHip;
					ankle = poses[0].pose.leftAnkle;
					shoulder = poses[0].pose.leftShoulder;
					//compare ankles for side check
					ankleOps = poses[0].pose.rightAnkle;
					shoulderOpt = poses[0].pose.rightShoulder;
					ankles = {l: ankle.y, r: ankleOps.y}
					shoulders = {l: shoulder.y, r: shoulderOpt.y}
					asideCheck = (ankles.l - ankles.r);
					ssideCheck = (shoulders.l - shoulders.r);
					// console.log('left '+ankles.l);
					// console.log('right '+ankles.r);
					if (asideCheck&&ssideCheck>5) {
						console.log('==================toRRRRRRRR');
						side = '우측';
						console.log('바뀐시점 left '+ankles.l);
						console.log('바뀐시점 right '+ankles.r);
						console.log('왼쪽 값이 더 큰가?')
						console.log('side changed!');
					}
					//until here

					anKnee = { x: knee.x, y: ankle.y };
					sHip = { x: shoulder.x, y: hip.y };
					kneeFlexion =
						(Math.atan2(ankle.y - knee.y, ankle.x - knee.x) - Math.atan2(hip.y - knee.y, hip.x - knee.x)) *
						(180 / Math.PI);
					hipFlexion =
						360 -
						(Math.atan2(knee.y - hip.y, knee.x - hip.x) -
							Math.atan2(shoulder.y - hip.y, shoulder.x - hip.x)) *
							(180 / Math.PI);
					dorsiflexion =
						360 -
						(Math.atan2(anKnee.y - ankle.y, anKnee.x - ankle.x) -
							Math.atan2(knee.y - ankle.y, knee.x - ankle.x)) *
							(180 / Math.PI);
					trunkLean =
						360 -
						(Math.atan2(sHip.y - hip.y, sHip.x - hip.x) -
							Math.atan2(shoulder.y - hip.y, shoulder.x - hip.x)) *
							(180 / Math.PI);
					break;
				case '우측':
					knee = poses[0].pose.rightKnee;
					hip = poses[0].pose.rightHip;
					ankle = poses[0].pose.rightAnkle;
					shoulder = poses[0].pose.rightShoulder;
					anKnee = { x: knee.x, y: ankle.y };
					sHip = { x: shoulder.x, y: hip.y };
					//compare ankles for side check
					shoulderOps = poses[0].pose.leftShoulder;
					ankleOps = poses[0].pose.leftAnkle;
					ankles = {r: ankle.y, l: ankleOps.y}
					shoulders = {r: shoulder.y, l: shoulderOpt.y}
					asideCheck = (ankles.r - ankles.l);
					ssideCheck = (shoulders.r - shoulders.l);
					
					// console.log('sideCheck:'+sideCheck+'so '+side);
					if (ssideCheck&&asideCheck>5) {
						console.log('-_-_-_-_-_-_-_-_-_-_-_-_LLLLLLL')
						console.log('바뀐시점 left '+ankles.l);
						console.log('바뀐시점 right '+ankles.r);
						console.log('오른쪽값이 더 큰가?')
						side = '좌측';
						console.log('side changed!');
					}
					//until here
					kneeFlexion =
						360 -
						(Math.atan2(ankle.y - knee.y, ankle.x - knee.x) - Math.atan2(hip.y - knee.y, hip.x - knee.x)) *
							(180 / Math.PI);
					hipFlexion =
						(Math.atan2(knee.y - hip.y, knee.x - hip.x) -
							Math.atan2(shoulder.y - hip.y, shoulder.x - hip.x)) *
						(180 / Math.PI);
					dorsiflexion =
						(Math.atan2(anKnee.y - ankle.y, anKnee.x - ankle.x) -
							Math.atan2(knee.y - ankle.y, knee.x - ankle.x)) *
						(180 / Math.PI);
					trunkLean =
						(Math.atan2(sHip.y - hip.y, sHip.x - hip.x) -
							Math.atan2(shoulder.y - hip.y, shoulder.x - hip.x)) *
						(180 / Math.PI);
			}
		}
	});

	// Hide the video element, and just show the canvas
	video.hide();

	textFont('Open Sans');
	textSize(22);

	button1 = createButton('<i class="fas fa-sync-alt"></i> Switch Sides');
	button1.parent('switchButtonContainer');
	button1.id('switchButton');
	button1.class(
		'rounded-full bg-white py-3 px-5 mx-3 shadow-lg hover:text-gray-900 border-2 border-white hover:border-gray-500'
	);
	button1.mousePressed(switchSides);

	button2 = createButton('<i class="fas fa-camera"></i> Take Snapshot');
	button2.parent('saveButtonContainer');
	button2.id('saveButton');
	button2.class(
		'rounded-full bg-white py-3 px-5 mx-3 shadow-lg hover:text-gray-900 border-2 border-white hover:border-gray-500'
	);
	button2.mousePressed(saveImage);

	// button3 = createButton('<i class="fas fa-sync-alt"></i> Switch Camera');
	// button3.parent('cameraButtonContainer');
	// button3.id('cameraButton');
	// button3.class(
	// 	'rounded-full bg-white py-3 px-4 mx-3 shadow-lg hover:text-gray-900 border-2 border-white hover:border-gray-500'
	// );
	// button3.mousePressed(switchCam);

	button4 = createButton('<i class="fas fa-sync-alt"></i> Reset');
	button4.parent('resetButtonContainer');
	button4.id('resetButton');
	button4.class(
		'rounded-full py-1 px-4 hover:text-gray-900 font-semibold text-sm border-2 border-gray-500 hover:border-gray-500 hover:bg-white shadow-md'
	);
	button4.mousePressed(resetMax);
}

// function switchCam() {
// 	switch (camera) {
// 		case 'rear':
// 			camera = 'front';
// 			break;
// 		case 'front':
// 			side = 'rear';
// 	}
// }

function switchSides() {
	switch (side) {
		case '좌측':
			side = '우측';
			select('#sideInstruction').html('우측');
			resetMax();
			break;
		case '우측':
			side = '좌측';
			select('#sideInstruction').html('좌측');
			resetMax();
	}
}

function resetMax() {
	maxKneeFlexion = 180;
	maxHipFlexion = 180;
	maxDorsiflexion = 180;
	maxTrunkLean = 180;

	select('#kneeFlexion').html('-');
	select('#hipFlexion').html('-');
	select('#shinAngle').html('-');
	select('#trunkAngle').html('-');
}

function saveImage() {
	saveCanvas(canvas, 'snapshot', 'png');
}

function modelReady() {
	select('#status').style('color', '#4A5568');
	select('#status').html('Ready!✔ <i class="fas fa-check-circle" style="color:#4A5568;"></i>');
}
function draw() {
	
	clear();
	image(video, 0, 0, width, height);

	fill('white');
	strokeWeight(0);
	stroke('#A0AEC0');
	rectMode(CENTER);
	rect(45, 24, 60, 25, 15);

	fill('#4A5568');
	noStroke();
	textSize(30);
	textAlign(CENTER, CENTER);
	textStyle(BOLD);
	textFont('sans-serif');
	displaySide = side.toUpperCase();
	text(displaySide, 45, 25);

	if (poses.length > 0) {
		// draws the angles as they happen over the video feed
		fill('#FFFFFF');
		text(Math.round(kneeFlexion) + '°', knee.x + 20, knee.y + 10);
		text(Math.round(hipFlexion) + '°', hip.x + 20, hip.y + 10);
		text(Math.round(dorsiflexion) + '°', ankle.x + 20, ankle.y + 10);
		text(Math.round(trunkLean) + '°', shoulder.x + 20, shoulder.y + 10);

		if (trunkLean > 180) {
			trunkLean = Math.round(trunkLean-180)
		}else {
			trunkLean = Math.round(trunkLean)
		}

		if (hipFlexion > 180) {
			hipFlexion = Math.round(hipFlexion-180)
		}else {
			hipFlexion = Math.round(hipFlexion)
		}

		if (kneeFlexion > 180) {
			kneeFlexion = Math.round(kneeFlexion-180)
		}else {
			kneeFlexion = Math.round(kneeFlexion)
		}

		// //Here starts to detect and count a squat.
		
		if (standPos && psquatPos == 1) {
			
			//for music alert
			let audio = new Audio('ding.mp3');
			audio.play();

			psquatPos = 0;
			squat.push("squat");
			count = squat.length;
			select('#squat_count').html(count);
			kcal = 0.43*count;
			select('#kcal').html(kcal);
		}
		//firstly, is standing?
		if (kneeFlexion&&hipFlexion>160) {
				kneePos = 0;
				select('#squat_detect').html('standing');
				document.getElementById("squat_detect").style.color = 'orange';

				select('#backAng').html('-');
				select('#kneeAng').html('-');
				select('#upper').html('-');
				select('#squat_detect').html('Standing');

				document.getElementById("backAng").style.color = 'orange';
				document.getElementById("kneeAng").style.color = 'orange';
				document.getElementById("upper").style.color = 'orange';
				document.getElementById("squat_detect").style.color = 'orange';
				standPos = 1;
			}else {
				standPos = 0;
			}
		//secondly... is it a perfect squat?
		//what happens kneef lower than 150?
		if (kneeFlexion < 160){
			if (kneeFlexion > 130) { //knee max 130
				dkvalue = Math.round(kneeFlexion - 130);
				select('#kneeAng').html(dkvalue+'° ↓');
				select('#squat_detect').html('False');
				kneePos = 0;
				document.getElementById("kneeAng").style.color = 'red';
				document.getElementById("squat_detect").style.color = 'red';
			}else if(kneeFlexion < 120){ //knee min 120
				dkvalue = Math.round(120 - kneeFlexion);
				select('#kneeAng').html(dkvalue+'° ↑');
				select('#squat_detect').html('False');
				kneePos = 0;
				document.getElementById("kneeAng").style.color = 'red';
				document.getElementById("squat_detect").style.color = 'red';
			}else { 
				dkvalue = Math.round(kneeFlexion)
				select('#kneeAng').html('Okay!');
				kneePos = 1; //correction
				document.getElementById("kneeAng").style.color = 'green';
				//now check hip flexion
				if (hipFlexion < 150){
					if (hipFlexion > 140){ //hip max 140
						dhvalue = Math.round(hipFlexion - 140)
						select('#backAng').html(dhvalue+'° ↓');
						select('#squat_detect').html('False');
						backPos = 0;
						document.getElementById("backAng").style.color = 'red';
						document.getElementById("squat_detect").style.color = 'red';
					}else if (hipFlexion < 126) { //hip min 125
							dhvalue = Math.round(125 - hipFlexion)
							select('#backAng').html(dhvalue+'° ↑');
							select('#squat_detect').html('False');
							backPos = 0;
							document.getElementById("backAng").style.color = 'red';
							document.getElementById("squat_detect").style.color = 'red';
					}else {
							dhvalue = Math.round(hipFlexion)
							select('#backAng').html('Okay!');
							backPos = 1; //correction
							document.getElementById("backAng").style.color = 'green';
						//now check upperBody lean
						if (trunkLean > 90){ //upper max 90
							duvalue = Math.round(trunkLean - 90);
							select('#upper').html(duvalue+'° ↓');
							select('#squat_detect').html('False');
							upPos = 0;
							document.getElementById("upper").style.color = 'red';
							document.getElementById("squat_detect").style.color = 'red';
						}else if (trunkLean < 79) { //upper min 70
							duvalue = Math.round(79 - trunkLean);
							select('#upper').html(duvalue+'° ↑');
							select('#squat_detect').html('False');
							upPos = 0;
							document.getElementById("upper").style.color = 'red';
							document.getElementById("squat_detect").style.color = 'red';
						}else {
							duvalue = Math.round(trunkLean);
							select('#upper').html('Okay!')
							upPos = 1;
							document.getElementById("upper").style.color = 'green';
						}
					}
				}
			}
		}
		
		if (kneePos && backPos && upPos == 1) {
			select('#squat_detect').html('True');
			document.getElementById("squat_detect").style.color = 'green';
			squatPos = 1;
			//practice for counting
			psquatPos = squatPos;

		}else {
			squatPos = 0;
		}

		// updates the max numbers reached if they are exceeded at any time
		// then replaces the connected HTML span with the new max number
		if ((knee.confidence > 0.5) & (kneeFlexion > 20) ) {
			maxKneeFlexion = Math.round(kneeFlexion);
			select('#kneeFlexion').html(maxKneeFlexion);
		}
		if ((hip.confidence > 0.5) & (hipFlexion > 20) ) {
			maxHipFlexion = Math.round(hipFlexion);
			select('#hipFlexion').html(maxHipFlexion);
		}
		// if ((ankle.confidence > 0.5) & (dorsiflexion > 20) ) {
		// 	maxDorsiflexion = Math.round(dorsiflexion);
		// 	select('#shinAngle').html(maxDorsiflexion);
		// }
		if ((shoulder.confidence > 0.5) & (trunkLean > 20) ) {
			maxTrunkLean = Math.round(trunkLean);
			select('#trunkAngle').html(maxTrunkLean);

		drawKeypoints();
		drawSkeleton(squatPos, backPos, upPos, kneePos);

		leftx = poses[0].pose.keypoints[3].position.x;
    	lefty = poses[0].pose.keypoints[3].position.y;
    	rightx = poses[0].pose.keypoints[4].position.x;
    	righty = poses[0].pose.keypoints[4].position.y;

      	drawEllipse(leftx, lefty, rightx, righty, squatPos);
		}
	}
}

function drawEllipse(leftx, lefty, rightx, righty,squatPos) {
	noFill();
	if (squatPos == 0) {
		strokeWeight(2)
		stroke('red');
	}else if (squatPos == 1) {
		strokeWeight(8);
		stroke('cyan')
	}
	xpoint = (leftx + rightx) / 2
	ypoint = (lefty + righty) / 2
	diameter = Math.sqrt(Math.pow(rightx-leftx, 2) + Math.pow(righty-lefty, 2));
	ellipse(xpoint, ypoint-(diameter*1.2), diameter*0.75, diameter*0.2);
 }

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, loop through all the keypoints
		let pose = poses[i].pose;
		for (let j = 0; j < pose.keypoints.length; j++) {
			// A keypoint is an object describing a body part (like rightArm or leftShoulder)
			let keypoint = pose.keypoints[j];
			// Only draw an ellipse is the pose probability is bigger than 0.2
			if (keypoint.score > 0.5) {
				push();
				fill('rgba(255,255,255, 0.5)');
				noStroke();
				ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
				pop();
			}
		}
	}
}

// A function to draw the skeletons
function drawSkeleton(squatPos, backPos, upPos, kneePos) {
	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i++) {
		let skeleton = poses[i].skeleton;
		// stroke('rgb(0,255,0)'); //to green
		// For every skeleton, loop through all body connections
		for (let j = 0; j < skeleton.length; j++) {
			let partA = skeleton[j][0];
			let partB = skeleton[j][1];
			push();
			if (squatPos > 0) {
				stroke('green');
				strokeWeight(6);
			}else {
				stroke('red')
				strokeWeight(1);
			}
			line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
			pop();
		}
	}
	
}
