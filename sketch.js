/* - - Variables - - */
let handPose;
let webcam;
let hands = [];

/* - - Preload - - */
function preload() {
  handPose = ml5.handPose({ flipped: true, maxHands: 2 });
}

/* - - Setup - - */
function setup() {
  createCanvas(windowWidth, windowHeight); // fullscreen

  // styling
  noStroke();

  // create webcam capture
  webcam = createCapture(VIDEO, { flipped: true });
  webcam.hide();

  // start tracking
  handPose.detectStart(webcam, gotHands);
}

/* - - Draw - - */
function draw() {
  background(0);

  let video = getVideoDimensions(); // scale webcam to window
  if (!video) {
    return; // stop if webcam is not ready
  }

  // draw webcam
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(webcam, 0, 0, video.width, video.height);
  pop();

  // draw all hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = scalePoint(hand.keypoints[j], video);
      fill("white");
      noStroke();
      ellipse(keypoint.x, keypoint.y, 10);
    }
  }

  // draw ellipse on thumb
  if (hands.length > 0) {
    // our tracking points
    let thumb = scalePoint(hands[0].keypoints[4], video); // by number
    // let thumb = scalePoint(hands[0].thumb_tip, video); // by name

    // thumb
    fill("blue");
    ellipse(thumb.x, thumb.y, 50);
  }
}

/* - - Resize - - */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* - - Functions - - */

// ml5: hand tracking
function gotHands(results) {
  hands = results; // array of tracked points
  //console.log(hands);
}

// helper: scale webcam to window
function getVideoDimensions() {
  let videoWidth = webcam?.elt?.videoWidth;
  let videoHeight = webcam?.elt?.videoHeight;

  if (!videoWidth || !videoHeight) {
    return null;
  }

  let videoRatio = videoWidth / videoHeight;
  let canvasRatio = width / height;
  let drawWidth;
  let drawHeight;

  if (videoRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = drawHeight * videoRatio;
  } else {
    drawWidth = width;
    drawHeight = drawWidth / videoRatio;
  }

  return {
    x: (width - drawWidth) / 2,
    y: (height - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight,
    sourceWidth: videoWidth,
    sourceHeight: videoHeight,
  };
}

// helper: scale tracking points to webcam
function scalePoint(point, video) {
  return {
    x: video.x + map(point.x, 0, video.sourceWidth, 0, video.width),
    y: video.y + map(point.y, 0, video.sourceHeight, 0, video.height),
  };
}
