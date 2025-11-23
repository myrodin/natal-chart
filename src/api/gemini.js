import { GoogleGenerativeAI } from "@google/generative-ai";



const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    // 사용 가능한 모델 목록에서 확인된 최신 모델 사용
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

export const analyzeNatalChart = async (data) => {
    if (!API_KEY || API_KEY.includes("여기에_API_키를_입력하세요")) {
        throw new Error("API Key가 올바르게 설정되지 않았습니다. .env 파일에 실제 키를 입력했는지 확인해주세요.");
    }

    const prompt = `
당신은 운명을 꿰뚫어보는 예리하고 직설적인 점성술가입니다.
사용자의 네이탈 차트 정보를 바탕으로, 질문에 대해 아주 구체적이고 확신에 찬 예측을 내놓으세요.

[사용자 정보]
- 이름: ${data.name}
- 생년월일: ${data.birthDate}
- 태어난 시간: ${data.birthTime || "모름"}
- 태어난 장소: ${data.birthPlace}
- 현재 시각: ${new Date().toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}

[질문]
대분류: ${data.main}
소분류: ${data.sub}
구체적 질문: ${data.question}

[필수 지침]
1. **과거/현재 (신뢰 형성)**: 사용자의 성격이나 지난 상황을 묘사할 때는 **"겉으로는 강해 보이지만 속은 여린 면이 있다", "최근 남들에게 말 못 할 고민으로 잠 못 이룬 적이 있다"** 와 같이 누구나 공감할 수 있는 **광범위하고 보편적인 문장(바넘 효과)**을 사용하세요. 구체적인 사실보다는 감정과 성향을 터치하여 "내 이야기다"라고 느끼게 하세요.
2. **미래 예측 (온도차)**: 
   - **좋은 예언**: "3월 12일 오후 2시, 기다리던 합격 소식이 들려온다"와 같이 **날짜와 시간을 콕 집어 아주 구체적이고 단정적**으로 말하세요.
   - **나쁜 예언/경고**: "가을 무렵, 잠시 먹구름이 끼는 시기가 온다"와 같이 **은유적이고 애매하게** 표현하여 불안감을 조성하지 마세요.
3. **단정적 어조 (좋은 일 한정)**: 긍정적인 예측은 "~할 것이다"가 아니라 "**~한다**", "**~된다**"로 끝맺어 확신을 주세요.
4. **3가지 예언 포함**: 질문에 대한 답변과 함께, 다음 3가지 영역에 대한 예언을 포함하세요:
   (1) 인간관계
   (2) 금전/일
   (3) 감정/내면
5. **형식**: 마크다운 없이 줄바꿈으로만 문단을 나누세요. 전체 분량은 3~4문단으로 구성하세요.

[예시 톤]
- (좋은 일) "5월 15일, 우연히 들어간 장소에서 평생의 귀인을 만나게 된다."
- (나쁜 일) "겨울이 시작될 무렵에는 마음의 문을 잠시 닫고 내면을 돌보는 시간이 필요할 듯하다."
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        // 구체적인 에러 메시지를 포함하여 던짐
        throw new Error(`별들의 목소리를 듣는 중에 문제가 발생했습니다.\n(에러 상세: ${error.message || error})`);
    }
};
