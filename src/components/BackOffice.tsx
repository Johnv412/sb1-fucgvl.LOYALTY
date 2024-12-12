import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import SubAccountForm from './SubAccountForm';

interface SubAccount {
  id: number;
  fullName: string;
  cellPhone: string;
  email: string;
  storeName: string;
  storeAddress: string;
  posSystem: string;
  operatingHours: string;
  socialMedia: string[];
  rewardRules: { pointsPerDollar: number };
  accessLevel: string;
}

interface BackOfficeProps {
  subAccounts: SubAccount[];
  setSubAccounts: React.Dispatch<React.SetStateAction<SubAccount[]>>;
}

const BackOffice: React.FC<BackOfficeProps> = ({ subAccounts, setSubAccounts }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<SubAccount | null>(null);

  const handleEdit = (account: SubAccount) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this sub-account?')) {
      setSubAccounts(subAccounts.filter(account => account.id !== id));
    }
  };

  const handleSave = (account: SubAccount) => {
    if (editingAccount) {
      setSubAccounts(subAccounts.map(acc => 
        acc.id === account.id ? account : acc
      ));
    } else {
      const newId = Math.max(...subAccounts.map(a => a.id), 0) + 1;
      setSubAccounts([...subAccounts, { ...account, id: newId }]);
    }
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Back Office - Manage Sub-Accounts</h2>
      
      {!isFormOpen && (
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6"
        >
          <Plus size={20} className="inline mr-2" /> Add New Sub-Account
        </button>
      )}

      {isFormOpen && (
        <SubAccountForm
          account={editingAccount}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <h3 className="text-xl font-semibold mb-4">Existing Sub-Accounts</h3>
      <div className="space-y-4">
        {subAccounts.map(account => (
          <div key={account.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold">{account.storeName}</h4>
              <p>{account.fullName} - {account.email}</p>
              <p>{account.storeAddress}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(account)} className="text-blue-500 mr-2">
                <Edit size={20} />
              </button>
              <button onClick={() => handleDelete(account.id)} className="text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackOffice;