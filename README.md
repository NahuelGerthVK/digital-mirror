# Digital Mirror

A small p5.js sketch that uses your webcam and ml5 HandPose to track hand landmarks and draw them over the live video feed.

![Preview](/preview.jpg)

## What it does

- Shows the webcam in full-screen
- Detects hand keypoints with ml5
- Draws white dots for tracked joints
- Highlights the thumb with a blue circle

## Files

- index.html — page setup and script loading
- sketch.js — drawing logic and hand tracking
- style.css — basic styling
- p5.min.js — local p5 library

## Tracking points

**Useful points**
- thumb tip: 4
- index finger tip: 8
- middle finger tip: 12
- ring finger tip: 16
- pinky tip: 20

**All points**
![Points](/tracking-points.jpg)

For feedback and improvement ideas feel free to reach out to [info@nahuelgerth.de](mailto:info@nahuelgerth.de)

## Links

- [p5.js](https://p5js.org/)
- [ml5.js](https://ml5js.org/)
- [MediaPipe](https://developers.google.com/edge/mediapipe/solutions/examples)
