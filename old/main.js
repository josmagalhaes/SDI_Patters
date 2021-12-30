let img;
let imgsource = "";



let widthfactor = 0.01;
let heightfactor = 0.007;

let currentMeth = 'dot';

//Speech Recognition

let classifier;

let label = 'listening...';
  
let soundModel = 'http://127.0.0.1:5500//model/';
  

function preload(){
    classifier = ml5.soundClassifier(soundModel + 'model.json');
}


function setup() {
	createCanvas(100,100);
	frameRate(60);
	background(0);

    classifier.classify(gotResult);
}

function initImage(passStr){
    if(passStr != imgsource)
    {
        imgsource = passStr;
        img = loadImage(passStr);
    }
	
	//rezsizeCanvas
	var wRatio = img.width/windowWidth;
	var hRatio = img.height/windowHeight;
	
	if(wRatio < hRatio) resizeCanvas(int(img.width / hRatio),int(windowHeight));
	else 	resizeCanvas(int(windowWidth), int(img.height / wRatio));		
	
	img.resize(width,height);

}


function draw() {

    if(imgsource != "")
    {
    if(widthfactor > 0.005)
    {
        widthfactor = widthfactor -   0.0001;
    }
    if(heightfactor > 0.005)
    {
        heightfactor = heightfactor - 0.0001;
    }
    
    
	for(let i = 0; i < 1000; i++){
		let x = int(random(width));
		let y = int(random(height));
		let col = img.get(x,y);
		col = color(red(col), green(col), blue(col), 120);
		
		
		if(currentMeth == 'dot'){
			let size = map(brightness(col),0,255,width*widthfactor,width*heightfactor);
			fill(col);
			noStroke();
			ellipse(x,y,size,size);
		}
		else if(currentMeth == 'line'){
			noFill();
			stroke(col);
			strokeWeight(width*0.002);
			line(x,y,x+random(width*-0.03,width*0.03),y+random(width*0.03));
		}
		else if(currentMeth == 'original'){
			image(img, 0, 0);
		}
		
	}
}

}


function changeMeth(){
	clear();
	currentMeth = methSel.value();
}


function speetchdecider(resultsin)
{
    let label = resultsin[0]['label'];
    let selected = 0;
    for(var i = 0; i < resultsin.length;i++)
    {
        if(resultsin[i]['confidence'] > resultsin[selected]['confidence'])
        {
            selected = i;
            label = resultsin[i]['label'];
        }
    }
    
    console.log(label);
    if(selected > -1)
    {
        
        if(label == "Initialize")
        {
            initImage("img_0.jpg");
            //console.log("Initialize");
        }

        if(label == "Show me")
        {
            initImage("img_1.jpg");
        }
    }
}



// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  else
  {
      speetchdecider(results);
  }
  
  // The results are in an array ordered by confidence.
  label = results[0].label;
}




