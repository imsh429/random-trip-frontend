import axios from 'axios';
import React, { useState } from 'react';

type TripSpot = {
  name: string;
  description: string;
};

const TripPlannerChatBot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "어디로 여행 가고 싶으신가요? 지역을 입력해주세요."
  ]);
  const [input, setInput] = useState("");
  const [region, setRegion] = useState<string>("");
  const [mood, setMood] = useState<string>("");
  const [spots, setSpots] = useState<TripSpot[]>([]);
  const [stage, setStage] = useState<"askRegion" | "askMood" | "showResult">("askRegion");
  const [loading, setLoading] = useState(false);

  const handleUserInput = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, `🙋‍♂️ ${input}`];

    if (stage === "askRegion") {
      setRegion(input);
      setMessages([...newMessages, "어떤 분위기의 여행을 원하시나요? (힐링 / 모험 / 맛집)"]);
      setStage("askMood");
    } else if (stage === "askMood") {
      setMood(input);
      setMessages([...newMessages, "잠시만요! AI가 여행지를 추천 중입니다..."]);
      setStage("showResult");
      setLoading(true);

      try {
        const res = await axios.post("http://113.198.66.75:10072/trip/plan", {
          region,
          mood: input
        });

        const route: TripSpot[] = res.data.route;
        setSpots(route);

        const resultMessages = [
          ...newMessages,
          "🗺 추천된 여행지 목록입니다:",
          ...route.map(spot => `📍 ${spot.name}: ${spot.description}`)
        ];

        setMessages(resultMessages);
      } catch (err) {
        console.error(err);
        setMessages([...newMessages, "❌ 추천에 실패했습니다. 다시 시도해주세요."]);
        setStage("askRegion");
      }
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div className="w-full bg-white rounded-[30px] p-8 shadow-lg">
      <div className="min-h-[400px] flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-lg text-gray-800">{msg}</div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <input
          type="text"
          className="border rounded-xl px-4 py-3 flex-1 shadow-inner text-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
          placeholder={loading ? "잠시만 기다려주세요..." : "메시지를 입력하세요..."}
          disabled={loading}
        />
        <button
          onClick={handleUserInput}
          className="bg-yellow-300 hover:bg-yellow-400 px-8 py-3 rounded-xl font-bold text-lg shadow-md"
          disabled={loading}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default TripPlannerChatBot;
