import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


type TripSpot = {
  name: string;
  description: string;
};

const TripPlannerChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<string[]>([
    "어디로 여행 가고 싶으신가요? 지역을 입력해주세요."
  ]);
  const [input, setInput] = useState("");
  const [refineInput, setRefineInput] = useState("");
  const [stage, setStage] = useState<"askRegion" | "askMood" | "showResult">("askRegion");
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<{ region?: string; mood?: string }>({});
  const [spots, setSpots] = useState<TripSpot[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleUserInput = async () => {
    if (!input.trim()) return;
    const userMessage = `🙋‍♂️ ${input}`;
    const newMessages = [...messages, userMessage];

    if (stage === "askRegion") {
      setContext((prev) => ({ ...prev, region: input }));
      setMessages([...newMessages, "어떤 분위기의 여행을 원하시나요? (20대가 많이 가는 맛집 포함한 데이트코스 추천해줘)"]);
      setStage("askMood");
      setInput("");
      return;
    }

    if (stage === "askMood") {
      setContext((prev) => ({ ...prev, mood: input }));
      setMessages([...newMessages, "AI가 여행지를 추천 중입니다..."]);
      setStage("showResult");
      setLoading(true);
      setInput("");

      await fetchRecommendations(context.region!, input, newMessages, true);
    }
  };

  const resetAll = () => {
  setMessages(["어디로 여행 가고 싶으신가요? 지역을 입력해주세요."]);
  setInput("");
  setRefineInput("");
  setStage("askRegion");
  setContext({});
  setSpots([]);
  setSelected(new Set());
  setLoading(false);
};


  const fetchRecommendations = async (
    region: string,
    mood: string,
    currentMessages: string[],
    isInitial: boolean
  ) => {
    try {
      const res = await axios.post("http://113.198.66.75:10072/trip/plan", { region, mood });
      const newSpots: TripSpot[] = res.data.route;

      setSpots((prevSpots) => {
        const existingNames = new Set(prevSpots.map((s) => s.name));
        const filteredSpots = newSpots.filter((s) => !existingNames.has(s.name));

        setMessages([
          ...currentMessages,
          filteredSpots.length > 0
            ? isInitial
              ? "🗽 추천된 여행지입니다:"
              : "🌟 추가로 추천된 여행지:"
            : "⚠️ 이미 추천된 장소와 중복되어 새로운 여행지가 없습니다.",
          ...filteredSpots.map((spot) => `📍 ${spot.name}: ${spot.description}`)
        ]);

        return [...prevSpots, ...filteredSpots];
      });
    } catch (err) {
      console.error(err);
      setMessages([...currentMessages, "❌ 추천에 실패했습니다. 다시 시도해주세요."]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ refine을 새로운 mood로 간주
  const handleRefine = async () => {
    if (!refineInput.trim()) return;
    setLoading(true);

    // refine을 mood로 덮어쓰기
    setContext((prev) => ({ ...prev, mood: refineInput }));

    await fetchRecommendations(context.region!, refineInput, [...messages], false);
    setRefineInput("");
  };

  const toggleSelect = (name: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  return (
    <div className="flex gap-6 w-full">
      {/* 왼쪽 대화 영역 */}
      <div className="flex-1 bg-white rounded-[30px] p-8 shadow-lg">
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
            onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
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

      {/* 오른쪽 보완 요청 & 선택 여행지 */}
      <div className="w-[350px] bg-white rounded-[30px] p-8 shadow-lg h-fit">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">📝 선택 여행지</h3>

        {spots.map((spot, idx) => (
          <div key={idx} className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={selected.has(spot.name)}
              onChange={() => toggleSelect(spot.name)}
              className="w-5 h-5"
            />
            <div className="text-lg text-gray-800">{spot.name}</div>
          </div>
        ))}

        <div className="mt-8">
          <input
            type="text"
            className="border rounded-xl px-4 py-2 w-full text-lg shadow-inner mb-3"
            value={refineInput}
            onChange={(e) => setRefineInput(e.target.value)}
            placeholder="보완 요청 입력 (예: 놀이공원 포함해줘)"
          />
          <button
            onClick={handleRefine}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-md"
            disabled={loading || refineInput.trim() === ""}
          >
            추가 요청하기
          </button>
        </div>

        <button
            onClick={() => {
            const selectedSpots = spots.filter((s) => selected.has(s.name));
            console.log("최종 선택:", selectedSpots);
            navigate("/trip/bestplan", { state: { spots: selectedSpots } });
            }}
          className="mt-4 w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-md"
          disabled={selected.size === 0}
        >
          이대로 여행하기
        </button>

        <button
            onClick={resetAll}
            className="mt-4 w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-xl font-bold text-lg shadow-md"
            >
            🔄 여행 추천 초기화
        </button>
      </div>
    </div>
  );
};

export default TripPlannerChatBot;
