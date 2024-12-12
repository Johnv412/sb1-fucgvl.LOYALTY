import React from 'react';
import { Pizza } from 'lucide-react';

interface HeaderProps {
  user: { name: string; points: number };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Pizza className="mr-2" size={32} />
          <h1 className="text-2xl font-bold">Pizza Rewards</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-4">Welcome, {user.name}</span>
          <span className="bg-yellow-400 text-blue-800 py-1 px-3 rounded-full font-bold">
            {user.points} Points
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;