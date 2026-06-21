import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar, Topbar } from "sdkwork-xiangqi-pc-commons";
import { Dashboard, GameCenter, Leaderboard, Tournaments } from "sdkwork-xiangqi-pc-dashboard";
import { Subscription } from "sdkwork-xiangqi-pc-vip";
import { ComputeCenter } from "sdkwork-xiangqi-pc-compute";
import { PointsMall } from "sdkwork-xiangqi-pc-mall";
import { Wallet } from "sdkwork-xiangqi-pc-wallet";
import { AIArena } from "sdkwork-xiangqi-pc-arena";
import { Profile } from "sdkwork-xiangqi-pc-user";
import { QuizArena } from "sdkwork-xiangqi-pc-quiz";
import { Auth } from "sdkwork-xiangqi-pc-auth";
import { RingMatch } from "sdkwork-xiangqi-pc-ringmatch";
import { ClawsManager } from "sdkwork-xiangqi-pc-claws";

export default function App() {
  const [currentView, setCurrentView] = useState("auth");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  const handleViewPlayer = (player: any) => {
    setSelectedPlayer(player);
    setCurrentView("playerProfile");
  };

  const renderView = () => {
    switch (currentView) {
      case "auth":
        return <Auth setCurrentView={setCurrentView} />;
      case "dashboard":
        return <Dashboard setCurrentView={setCurrentView} />;
      case "leaderboard":
        return <Leaderboard onViewPlayer={handleViewPlayer} />;
      case "games":
        return <GameCenter setCurrentView={setCurrentView} />;
      case "arena":
        return <AIArena />;
      case "ringmatch":
        return <RingMatch />;
      case "claws":
        return <ClawsManager setCurrentView={setCurrentView} />;
      case "tournaments":
        return <Tournaments />;
      case "profile":
        return <Profile isPublic={false} />;
      case "playerProfile":
        return <Profile isPublic={true} playerData={selectedPlayer} onBack={() => setCurrentView("leaderboard")} />;
      case "quiz":
        return <QuizArena setCurrentView={setCurrentView} />;
      case "subscription":
        return <Subscription setCurrentView={setCurrentView} />;
      case "compute":
        return <ComputeCenter />;
      case "mall":
        return <PointsMall />;
      case "wallet":
        return <Wallet />;
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  };

  if (currentView === "auth") {
    return (
      <div className="h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-hidden font-sans selection:bg-rose-500/30 transition-colors duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-hidden font-sans selection:bg-rose-500/30 transition-colors duration-300">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col relative">
        <Topbar setCurrentView={setCurrentView} />
        <main className="flex-1 overflow-y-auto p-6 relative z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
