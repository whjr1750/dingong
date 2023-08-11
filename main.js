video = "";
objects = [];

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(721, 400);
    canvas.position(280, 130);
}

function draw()
{
    image(video, 0, 0, 721, 400);
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

function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
}

function modelLoaded()
{
    console.log("Ready!");
    video.loop();
    video.speed(1);
    video.volume(1);
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
