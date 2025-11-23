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
당신은 신비롭고 통찰력 있는 점성술가입니다. 
아래 사용자의 정보를 바탕으로 네이탈 차트를 분석하여 질문에 대한 답변을 해주세요.

[사용자 정보]
- 이름: ${data.name}
- 생년월일: ${data.birthDate}
- 태어난 시간: ${data.birthTime || "모름"}
- 태어난 장소: ${data.birthPlace}

[질문]
대분류: ${data.main}
소분류: ${data.sub}
구체적 질문: ${data.question}

[지침]
1. 말투는 신비롭고 정중하게, 마치 별들의 이야기를 들려주듯이 작성하세요.
2. 사용자의 생년월일과 태어난 장소를 기반으로 별들의 배치를 상상하여 해석하세요 (실제 천문학적 계산은 불가능하더라도 그럴듯한 점성술적 용어를 사용하여 해석의 깊이를 더하세요).
3. 질문에 대한 구체적인 조언과 미래에 대한 긍정적인 전망을 포함하세요.
4. 답변은 3~4문단 정도로 구성하고, 가독성 있게 작성하세요.
5. 마크다운 형식을 사용하지 말고 일반 텍스트로 줄바꿈을 적절히 활용하여 작성하세요.
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
