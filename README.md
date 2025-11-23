# Cosmic Insight 🔮
> AI 기반 네이탈 차트(점성술) 분석 웹사이트

사용자의 생년월일과 태어난 시간/장소를 입력받아, Google Gemini AI가 신비로운 점성술가의 페르소나로 운세를 분석해주는 웹 애플리케이션입니다.

## ✨ 주요 기능
- **주제별 운세 선택**: 연애/사랑, 직업/진로, 인생/자아 등 관심 있는 분야를 선택할 수 있습니다.
- **상세 질문**: 대분류 선택 후 구체적인 고민(소분류)을 선택하여 맞춤형 분석을 받습니다.
- **AI 점성술사**: Google Gemini 2.0 Flash 모델을 활용하여, 입력된 정보를 바탕으로 실시간으로 차트를 해석해줍니다.
- **신비로운 디자인**: 우주와 별을 테마로 한 몰입감 있는 UI/UX.

## 🛠 기술 스택
- **Frontend**: React, Vite
- **Styling**: Vanilla CSS (Glassmorphism, Animations)
- **AI**: Google Gemini API (`@google/generative-ai`)
- **Deployment**: GitHub Pages (GitHub Actions)

## 🚀 시작하기

### 1. 설치
프로젝트를 클론하고 의존성을 설치합니다.
```bash
git clone https://github.com/myrodin/natal-chart.git
cd natal-chart
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 Google AI Studio에서 발급받은 API 키를 입력합니다.
(`.env.example` 파일을 참고하세요)
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 3. 실행
개발 서버를 실행합니다.
```bash
npm run dev
```

## 📝 라이선스
This project is licensed under the MIT License.
