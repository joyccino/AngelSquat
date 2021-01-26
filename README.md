# 👼 AngelSquat

Codes in this forked repository have been modified.

You can find the original squatcam repo at https://github.com/jmablog/squatcam

[Try it out for yourself here](https://jmablog.com/post/posenet-app/) and see [this blog post on jmablog.com](https://jmablog.com/post/posenet-app/) for more details.

Thank you James for your amazing work.

# 🌎 개발 환경 (Environment)
* OS: macOS Mojave (Version 10.14.6)
* 작업 툴 (Editor Tool): VSCode
* 주요 사용 라이브러리 (Core Library): p5.js(https://p5js.org/), ml5.js(https://ml5js.org/)
* 주요 Api (Core Api): PoseNet (https://ml5js.org/reference/api-PoseNet/)

# 👀 동작 맛보기 (Demo)
![squatWendy](https://user-images.githubusercontent.com/67300266/105364190-fb687c80-5c50-11eb-8afd-fac5152e19ce.gif) 

<br>
(Kor) <br>

1) 몸의 키 포인트 감지, <br>
2) Three Angles (Upper Body Lean, Hip Angle, Knee Angle) 계산 후, <br>
3) Three Angles 가 모두 적정 범위 내의 값이라는 조건을 만족하는 경우, <br>
4) 각  와 머리 위 천사 고리 푸른색(cyan)으로 표시. <br>
5) Squat 는 개당 카운트 되며 1 squat 시 소리로 알려줌. <br>
 <br>
(Eng) <br>

1) Detect Body Key Points from inputs. <br>
2) Calculate Three Angles (Upper Body Lean, Hip Angle, Knee Angle). <br>
3) Compare these Three Angles with Demo Angles. <br>
4) Alter the colour and the line thickness of Skeleton Lines and Angel Ring above the person's head.  <br>
5) Squats are now being counted while the app gives a sound alert when 1 squat is counted.
