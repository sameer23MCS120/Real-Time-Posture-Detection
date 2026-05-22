// sketch.js

let capture;
let poseNet;

let singlePose;
let skeleton;

let postureState = "";
let lastSpokenTime = 0;

function setup() {

    createCanvas(640, 480);

    // Webcam
    capture = createCapture(VIDEO);

    capture.size(640, 480);

    capture.hide();

    // Load PoseNet
    poseNet = ml5.poseNet(capture, modelLoaded);

    // Detect poses
    poseNet.on('pose', receivedPoses);

    textFont('Arial');
}

function modelLoaded() {

    console.log("PoseNet Loaded Successfully");
}

function receivedPoses(poses) {

    if (poses.length > 0) {

        singlePose = poses[0].pose;

        skeleton = poses[0].skeleton;
    }
}

// Voice Assistant
function speak(message) {

    // Prevent repeated speech
    if (millis() - lastSpokenTime > 4000) {

        speechSynthesis.cancel();

        let speech =
            new SpeechSynthesisUtterance(message);

        speech.volume = 1;

        speech.rate = 1;

        speech.pitch = 1;

        speechSynthesis.speak(speech);

        lastSpokenTime = millis();
    }
}

function draw() {

    background(0);

    // Mirror webcam
    push();

    translate(width, 0);

    scale(-1, 1);

    image(capture, 0, 0, width, height);

    pop();

    if (singlePose) {

        // ---------- DRAW KEYPOINTS ----------

        fill(255, 0, 0);

        noStroke();

        for (let i = 0; i < singlePose.keypoints.length; i++) {

            ellipse(
                width - singlePose.keypoints[i].position.x,
                singlePose.keypoints[i].position.y,
                10
            );
        }

        // ---------- DRAW SKELETON ----------

        stroke(255);

        strokeWeight(2);

        for (let j = 0; j < skeleton.length; j++) {

            line(
                width - skeleton[j][0].position.x,
                skeleton[j][0].position.y,

                width - skeleton[j][1].position.x,
                skeleton[j][1].position.y
            );
        }

        // ---------- POSTURE ANALYSIS ----------

        let leftShoulder =
            singlePose.leftShoulder;

        let rightShoulder =
            singlePose.rightShoulder;

        let nose =
            singlePose.nose;

        // Mid shoulder point
        let shoulderMidX =
            (leftShoulder.x + rightShoulder.x) / 2;

        let shoulderMidY =
            (leftShoulder.y + rightShoulder.y) / 2;

        // Neck angle
        let dx =
            nose.x - shoulderMidX;

        let dy =
            shoulderMidY - nose.y;

        // Convert to degrees
        let neckAngle =
            degrees(atan2(dy, dx));

        neckAngle =
            abs(neckAngle);

        // Shoulder balance
        let shoulderDiff =
            abs(leftShoulder.y - rightShoulder.y);

        // ---------- ACCURACY SCORE ----------

        // Neck accuracy
        let neckAccuracy =
            map(neckAngle, 40, 90, 0, 100);

        neckAccuracy =
            constrain(neckAccuracy, 0, 100);

        // Shoulder accuracy
        let shoulderAccuracy =
            map(shoulderDiff, 0, 40, 100, 0);

        shoulderAccuracy =
            constrain(shoulderAccuracy, 0, 100);

        // Final posture accuracy
        let postureAccuracy =
            floor(
                (neckAccuracy + shoulderAccuracy) / 2
            );

        // ---------- STATUS ----------

        if (postureAccuracy >= 80) {

            fill(0, 255, 0);

            textSize(32);

            text("Correct Posture", 20, 50);

            if (postureState !== "correct") {

                speak("Correct posture detected");

                postureState = "correct";
            }

        } else {

            fill(255, 0, 0);

            textSize(32);

            text("Wrong Posture", 20, 50);

            if (postureState !== "wrong") {

                speak("Please straighten your posture");

                postureState = "wrong";
            }
        }

        // ---------- DISPLAY ----------

        fill(255);

        textSize(24);

        text(
            "Posture Accuracy: " +
            postureAccuracy + "%",
            20,
            100
        );

        text(
            "Neck Angle: " +
            floor(neckAngle),
            20,
            140
        );

        text(
            "Shoulder Difference: " +
            floor(shoulderDiff),
            20,
            180
        );
    }
}