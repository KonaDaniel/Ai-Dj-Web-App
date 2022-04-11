leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(650, 540);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(650, 540);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function draw() {
    image(video, 0, 0, 650, 540);
    fill("red");
    stroke("black");

    circle(rightWristX, rightWristY, 30);

    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = " Speed = 0.5x"
        song.rate(0.5);
    }
    else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML = " Speed = 1x"
        song.rate(1);
    }
    else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed").innerHTML = " Speed = 1.5x"
        song.rate(1.5);
    }
    else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed").innerHTML = " Speed = 2x"
        song.rate(2);
    }
    else {
        document.getElementById("speed").innerHTML = " Speed = 2.5x"
        song.rate(2.5);
    }

    fill("blue");
    stroke("black");

    //if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 30);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals / 500;
    document.getElementById("volume").innerHTML = "Volume " + volume;
    song.setVolume(volume);
    //}
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('Ready!');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("X and Y Coordinates of left wrist is " + leftWristX + ", " + leftWristY);
        console.log("X and Y Coordinates of right wrist is " + rightWristX + ", " + rightWristY);
    }
}