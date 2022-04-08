leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(650, 540);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 650, 540);
    fill("red");
    stroke("black");
    circle(leftWristX, leftWristY, 20);

    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume " + volume;
    song.setVolume(volume);
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log('Ready!');
}

function gotPoses(results)
{
   if(results.length > 0)
   {
       console.log(results);

       leftWristX = results[0].pose.leftWrist.x;
       lefttWristY = results[0].pose.leftWrist.y;
       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;

       console.log("X and Y Coordinates of left wrist is " + leftWristX + ", " + leftWristY);
       console.log("X and Y Coordinates of right wrist is " + rightWristX + ", " + rightWristY);
   }
}