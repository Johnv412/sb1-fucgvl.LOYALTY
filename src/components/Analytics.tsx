import React from 'react';

const Analytics: React.FC = () => {
  // Mock data for the chart
  const data = [
    { name: 'Jan', purchases: 4000, points: 2400, rewards: 2400 },
    { name: 'Feb', purchases: 3000, points: 1398, rewards: 2210 },
    { name: 'Mar', purchases: 2000, points: 9800, rewards: 2290 },
    { name: 'Apr', purchases: 2780, points: 3908, rewards: 2000 },
    { name: 'May', purchases: 1890, points: 4800, rewards: 2181 },
    { name: 'Jun', purchases: 2390, points: 3800, rewards: 2500 },
    { name: 'Jul', purchases: 3490, points: 4300, rewards: 2100 },
  ];

  // Mock data for sub-account performance
  const subAccountData = [
    { name: "Joe's Pizza", customers: 500, pointsEarned: 15000, rewardsRedeemed: 200 },
    { name: "Maria's Pizzeria", customers: 750, pointsEarned: 22500, rewardsRedeemed: 300 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Overall Customer Engagement</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Month</th>
                <th className="px-4 py-2 border">Purchases</th>
                <th className="px-4 py-2 border">Points</th>
                <th className="px-4 py-2 border">Rewards</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.purchases}</td>
                  <td className="px-4 py-2 border">{item.points}</td>
                  <td className="px-4 py-2 border">{item.rewards}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Total Customers</h4>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Points Earned (This Month)</h4>
          <p className="text-2xl">45,678</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Rewards Redeemed</h4>
          <p className="text-2xl">789</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4">Sub-Account Performance</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sub-Account
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customers
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Points Earned
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rewards Redeemed
              </th>
            </tr>
          </thead>
          <tbody>
            {subAccountData.map((account, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.customers}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.pointsEarned}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.rewardsRedeemed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;