import { useEffect } from "react";
import { getToday } from "./utils/weekdays";

const RANKINGS_URL = "https://raw.githubusercontent.com/itsme-harsh/sup8/tree/main/json";

function App() {
  const weeks = getCurrentWeekOfMonth();
  const today = getToday();

  const [rankings, setRankings] = useState([]);
  const [week, setWeek] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(RANKINGS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load rankings");
        return res.json();
      })
      .then((data) => {
        setRankings(data.rankings || []);
        setWeek(data.week || "");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading rankings…
      </div>
    );
  }

  return (
    <div className="bg-[#2f3442] w-full flex justify-center px-4 py-8">
     
      <div className="w-full max-w-2xl">

        {/* Header */}
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          🏆 Train Conductors 🏆 
        <p className="text-xs text-gray-400">From: {weeks.start}–{weeks.end} {weeks.month}</p>
        </h1>

        {/* Ranking List */}
        <div className="space-y-4">
          {RANKINGS.map((rank) => (
            <RankCard
              key={rank.rank}
              {...rank}
              isToday={rank.day === today}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

function RankCard({
  rank,
  name,
  clan = "[SUP8] super territory",
  score,
  bg,
  isToday,
  highlight,
}) {
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-between rounded-xl p-4 shadow-md ${bg}
    ${highlight ? "border-2 border-green-700" : ""}`}
    >

      {/* TODAY Ribbon */}
      {isToday && <div className="ribbon">Today</div>}


      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold w-8 text-center">{rank}</span>
        <div>
          <p className="font-bold leading-tight">{name}</p>
          <p className="text-xs opacity-80">{clan}</p>
        </div>
      </div>

      <span className="font-bold text-sm md:text-base">{score}</span>
    </div>
  );
}

export default App;
