# Real Time Posture Detection Using Posenet

An  real-time posture detection system built using **PoseNet**, **ml5.js**, and **p5.js**.
This project detects human posture through a webcam, analyzes neck and shoulder alignment, and provides **live visual + voice feedback** for maintaining correct posture.

---

##  Features

* Real-time webcam posture detection
* Human pose estimation using PoseNet
* Skeleton and keypoint visualization
* Posture accuracy calculation
* Neck angle analysis
* Shoulder balance analysis
* Voice assistant feedback
* Correct/Wrong posture alerts
* Lightweight browser-based application

---

##  Technologies Used

* HTML5
* JavaScript
* p5.js
* ml5.js
* PoseNet
* Web Speech API

---

##  Project Structure

```bash
AI-Smart-Posture-Detection/
│
├── index.html
├── sketch.js
└── README.md
```

---

##  How It Works

1. The webcam captures live video.
2. PoseNet detects body keypoints.
3. Neck angle and shoulder alignment are analyzed.
4. A posture accuracy score is calculated.
5. The system displays:

   * Correct Posture 
   * Wrong Posture 
6. Voice feedback guides the user.

---

##  Posture Analysis Logic

The system uses:

* **Neck Angle**
* **Shoulder Height Difference**

to calculate:

```text
Posture Accuracy (%) =
(Neck Accuracy + Shoulder Accuracy) / 2
```

---

##  Installation & Setup

### 1️ Clone Repository

```bash
git clone https://github.com/your-username/AI-Smart-Posture-Detection.git
```

### 2️ Open Project Folder

```bash
cd AI-Smart-Posture-Detection
```

### 3️ Run the Project

Simply open:

```bash
index.html
```

in your browser.

---

##  Requirements

* Modern Web Browser
* Webcam Access
* Internet Connection (for CDN libraries)

---

##  Output Preview

### Correct Posture

* Green text displayed
* Voice: “Correct posture detected”

### Wrong Posture

* Red text displayed
* Voice: “Please straighten your posture”

---

##  Libraries Used

### p5.js

Used for:

* Canvas rendering
* Webcam handling
* Graphics visualization

### ml5.js

Used for:

* PoseNet model loading
* Human pose estimation

---

##  Future Improvements

* Multi-person posture detection
* Sitting posture analysis
* Exercise posture correction
* Mobile support
* Data logging & analytics
* AI-based posture recommendations

---

#Result Video Link
#Link - https://youtu.be/QOvyhAiR6nA



