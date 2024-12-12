import React from 'react';
import { Utensils, Star, Share2, MessageSquare } from 'lucide-react';

interface DashboardProps {
  user: { name: string; points: number };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome to Pizza Rewards, {user.name}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <Utensils className="text-blue-500 mb-2" size={32} />
          <h3 className="font-bold mb-2">Earn Points</h3>
          <p>Earn 1 point for every $1 spent on purchases</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <Star className="text-green-500 mb-2" size={32} />
          <h3 className="font-bold mb-2">Redeem Rewards</h3>
          <p>Use your points for discounts and free items</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <Share2 className="text-yellow-500 mb-2" size={32} />
          <h3 className="font-bold mb-2">Share & Earn</h3>
          <p>Get bonus points for sharing on social media</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <MessageSquare className="text-purple-500 mb-2" size={32} />
          <h3 className="font-bold mb-2">Leave Reviews</h3>
          <p>Earn points for leaving reviews on your orders</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;