import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface RewardsProgramProps {
  user: { name: string; points: number };
  setUser: React.Dispatch<React.SetStateAction<{ name: string; points: number }>>;
}

const RewardsProgram: React.FC<RewardsProgramProps> = ({ user, setUser }) => {
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const rewards = [
    { name: 'Free Small Pizza', points: 100 },
    { name: '20% Off Next Order', points: 200 },
    { name: 'Free Large Pizza', points: 300 },
    { name: 'Free Side & Drink', points: 150 },
  ];

  const handleRedemption = () => {
    if (selectedReward) {
      const reward = rewards.find((r) => r.name === selectedReward);
      if (reward && user.points >= reward.points) {
        setUser((prevUser) => ({
          ...prevUser,
          points: prevUser.points - reward.points,
        }));
        alert(`You've successfully redeemed: ${selectedReward}`);
        setSelectedReward(null);
      } else {
        alert("You don't have enough points for this reward.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Rewards Program</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {rewards.map((reward) => (
          <div
            key={reward.name}
            className={`border p-4 rounded-lg cursor-pointer ${
              selectedReward === reward.name ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedReward(reward.name)}
          >
            <Gift className="text-blue-500 mb-2" size={24} />
            <h3 className="font-bold mb-2">{reward.name}</h3>
            <p>{reward.points} Points</p>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={handleRedemption}
        disabled={!selectedReward}
      >
        Redeem Selected Reward
      </button>
    </div>
  );
};

export default RewardsProgram;