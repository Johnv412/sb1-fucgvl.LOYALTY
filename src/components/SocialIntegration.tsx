import React from 'react';
import { Facebook, Instagram, Twitter, Share2 } from 'lucide-react';

interface SocialIntegrationProps {
  user: { name: string; points: number };
}

const SocialIntegration: React.FC<SocialIntegrationProps> = ({ user }) => {
  const handleShare = (platform: string) => {
    // In a real app, this would integrate with the platform's API
    console.log(`Sharing to ${platform}`);
    alert(`Shared to ${platform}! You've earned 10 bonus points!`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Social Media Integration</h2>
      <p className="mb-4">
        Share your rewards progress and earn bonus points! Connect your social media accounts to get started.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <button
          className="flex items-center justify-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => handleShare('Facebook')}
        >
          <Facebook className="mr-2" /> Share on Facebook
        </button>
        <button
          className="flex items-center justify-center bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors"
          onClick={() => handleShare('Instagram')}
        >
          <Instagram className="mr-2" /> Share on Instagram
        </button>
        <button
          className="flex items-center justify-center bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors"
          onClick={() => handleShare('Twitter')}
        >
          <Twitter className="mr-2" /> Share on Twitter
        </button>
        <button
          className="flex items-center justify-center bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => handleShare('TikTok')}
        >
          <Share2 className="mr-2" /> Share on TikTok
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Recent Activity</h3>
        <ul className="list-disc list-inside">
          <li>You shared your 500 points milestone on Facebook</li>
          <li>Your friend John redeemed a reward using your referral</li>
          <li>You earned 50 points for leaving a review on your last order</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialIntegration;