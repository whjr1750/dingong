video = "";
objects = [];

function preload()
{
    video = createVideo('video.mp4');
    // 
}

function setup()
{
    
    canvas = createCanvas(721, 400);
    canvas.center();
    video.hide();
}

function start()
{
    
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
  }
function draw()
{
    image(video, 0, 0, 721, 400);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            fill("#A2CDB0");
            strokeWeight(0.5);
            percent = floor(objects[i].confidence * 100);
            textSize(15);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 20);
            noFill();
            strokeWeight(3);
            stroke("#A2CDB0");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


function gotResult(error, results) 
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
