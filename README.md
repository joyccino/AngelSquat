# 🌎 Environment
* OS: macOS Mojave (Version 10.14.6)
* 주요 사용 라이브러리 (Core Library): p5.js(https://p5js.org/), ml5.js(https://ml5js.org/)
* 주요 Api (Core Api): PoseNet (https://ml5js.org/reference/api-PoseNet/)

# 👀 Demonstration
1. Automatic side transition based on comparison of both ankle location values has been added. <br>

![sideTransition](https://user-images.githubusercontent.com/67300266/106098729-e02fcc80-617c-11eb-822b-031b5107063a.gif) <br> <br>
2. SquatCounter function has been updated. It gives a 'ding' sound  with a burned calories calculation for each squat. <br> <br>
![squatCounter](https://user-images.githubusercontent.com/67300266/106098744-e4f48080-617c-11eb-8b3a-b33cffdcbd47.gif)

<br>
(Kor) <br>

1) 몸의 키 포인트 감지, <br>
2) Three Angles (Upper Body Lean, Hip Angle, Knee Angle) 계산 후, <br>
3) Three Angles 가 모두 적정 범위 내의 값이라는 조건을 만족하는 경우: <br>
각 뼈대는 굵은 녹색, 머리 위 천사 고리 푸른색(cyan)으로 표시. <br>
5) Squat 는 개당 카운트 되며 1 squat 시 알림음. <br>
 <br>
(Eng) <br>

1) Detect Body Key Points from inputs. <br>
2) Calculate Three Angles (Upper Body Lean, Hip Angle, Knee Angle). <br>
3) Compare these Three Angles with Demo Angles. <br>
4) Alter the colour and the line thickness of Skeleton Lines and Angel Ring above the person's head.  <br>
5) Squats are now being counted while the app gives a sound alert when each squat is counted.
