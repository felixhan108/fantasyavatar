import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
export async function GET() {
  try {
    const promptText = `
    이 세상은 판타지 세상이고, 주인공은 오늘 첫 여행을 시작합니다.
    여정 도중, 우연한 사건을 통해 주인공이 아래 직업 중 하나를 자연스럽게 얻게 됩니다:
    '병사', '검사', '기사', '창기사', '마법사', '프리스트', '궁수'.

    이야기는 JRPG 고전 스타일로 서술해주세요. 사건은 마을 또는 마을 주변에서 발생해야 합니다.
    던전앤드래곤에 나오는 명사는 사용 가능합니다.
    직업은 병사,검사,기사,창기사,궁수가 가장 흔하고 마법사,프리스트는 희귀한 경험을 통해야 합니다.
    이야기는 약 200자 이내로 해주세요.

    '이야기'와 '역활'은 jsonData로 출력해줘. 
    예시:
    {
      "story": "평화로운 어느날..."
      "role": "마법사",
    }
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: promptText },
        { role: 'user', content: '시작해줘' },
      ],
      temperature: 0.8,
    });

    const fullText = completion.choices[0].message.content || '';
    const rawText = fullText
      .replace(/```json/, '')
      .replace(/```/, '')
      .trim();

    let story = '';
    let role = '';

    try {
      const parsed = JSON.parse(rawText);
      story = parsed.story?.trim() || '';
      role = parsed.role || '';
    } catch (e) {
      console.error('JSON parse error:', e);
    }

    return NextResponse.json({ success: true, text: story, role });
  } catch (error) {
    console.error('[gameStart GET error]', error);
    return NextResponse.json({ success: false, error: 'API 호출 실패' }, { status: 500 });
  }
}
