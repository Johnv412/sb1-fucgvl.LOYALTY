import React, { useState, useEffect } from 'react';

interface SubAccount {
  id?: number;
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

interface SubAccountFormProps {
  account: SubAccount | null;
  onSave: (account: SubAccount) => void;
  onCancel: () => void;
}

const SubAccountForm: React.FC<SubAccountFormProps> = ({ account, onSave, onCancel }) => {
  const [formData, setFormData] = useState<SubAccount>({
    fullName: '',
    cellPhone: '',
    email: '',
    storeName: '',
    storeAddress: '',
    posSystem: '',
    operatingHours: '',
    socialMedia: [],
    rewardRules: { pointsPerDollar: 1 },
    accessLevel: 'manager',
  });

  useEffect(() => {
    if (account) {
      setFormData(account);
    }
  }, [account]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (platform: string) => {
    setFormData(prevData => ({
      ...prevData,
      socialMedia: prevData.socialMedia.includes(platform)
        ? prevData.socialMedia.filter(p => p !== platform)
        : [...prevData.socialMedia, platform],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4">{account ? 'Edit' : 'Add'} Sub-Account</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name of Account Owner"
          className="border rounded px-2 py-1"
          required
        />
        <input
          type="tel"
          name="cellPhone"
          value={formData.cellPhone}
          onChange={handleChange}
          placeholder="Cell Phone Number"
          className="border rounded px-2 py-1"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border rounded px-2 py-1"
          required
        />
        <input
          type="text"
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          placeholder="Store Name"
          className="border rounded px-2 py-1"
          required
        />
        <input
          type="text"
          name="storeAddress"
          value={formData.storeAddress}
          onChange={handleChange}
          placeholder="Store Address"
          className="border rounded px-2 py-1"
          required
        />
        <select
          name="posSystem"
          value={formData.posSystem}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          required
        >
          <option value="">Select POS System</option>
          <option value="Clover">Clover</option>
          <option value="Square">Square</option>
          <option value="Shopify">Shopify</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="operatingHours"
          value={formData.operatingHours}
          onChange={handleChange}
          placeholder="Business Operating Hours"
          className="border rounded px-2 py-1"
          required
        />
        <div>
          <p className="mb-2">Preferred Social Media Platforms:</p>
          {['Facebook', 'Instagram', 'Twitter', 'TikTok'].map(platform => (
            <label key={platform} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={formData.socialMedia.includes(platform)}
                onChange={() => handleSocialMediaChange(platform)}
                className="mr-1"
              />
              {platform}
            </label>
          ))}
        </div>
        <div>
          <label className="block mb-2">
            Points per Dollar:
            <input
              type="number"
              value={formData.rewardRules.pointsPerDollar}
              onChange={(e) => setFormData(prevData => ({
                ...prevData,
                rewardRules: { ...prevData.rewardRules, pointsPerDollar: Number(e.target.value) }
              }))}
              className="border rounded px-2 py-1 ml-2"
              min="0"
              step="0.1"
              required
            />
          </label>
        </div>
        <select
          name="accessLevel"
          value={formData.accessLevel}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          required
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>
      <div className="mt-4 flex justify-end">
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {account ? 'Update' : 'Create'} Sub-Account
        </button>
      </div>
    </form>
  );
};

export default SubAccountForm;