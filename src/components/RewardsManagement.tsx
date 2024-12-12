import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle, X, Edit, Trash2, Copy, Eye } from 'lucide-react';
import { getRewards, createReward, updateReward, deleteReward, getStores } from '../utils/wordpressApi';

interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  quota: number;
  validity: string;
  neverExpire: boolean;
  expirationDate?: string;
  storeId: number;
}

interface Store {
  id: number;
  name: string;
}

const initialReward: Reward = {
  id: 0,
  name: '',
  description: '',
  points: 0,
  quota: 0,
  validity: 'instant',
  neverExpire: true,
  storeId: 0,
};

const RewardsManagement: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward>(initialReward);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRewards();
    fetchStores();
  }, []);

  const fetchRewards = async () => {
    try {
      const fetchedRewards = await getRewards();
      setRewards(fetchedRewards);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      alert('An error occurred while fetching rewards. Please try again.');
    }
  };

  const fetchStores = async () => {
    try {
      const fetchedStores = await getStores();
      setStores(fetchedStores);
    } catch (error) {
      console.error('Error fetching stores:', error);
      alert('An error occurred while fetching stores. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentReward({ ...currentReward, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCurrentReward({ ...currentReward, [name]: checked });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentReward.name) newErrors.name = 'Reward name is required';
    if (!currentReward.description) newErrors.description = 'Description is required';
    if (currentReward.points <= 0) newErrors.points = 'Points must be greater than 0';
    if (currentReward.quota < 0) newErrors.quota = 'Quota must be 0 or greater';
    if (!currentReward.validity) newErrors.validity = 'Validity is required';
    if (!currentReward.neverExpire && !currentReward.expirationDate) {
      newErrors.expirationDate = 'Expiration date is required when not set to never expire';
    }
    if (currentReward.storeId === 0) newErrors.storeId = 'Store selection is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (currentReward.id === 0) {
        const newReward = await createReward(currentReward);
        setRewards([...rewards, newReward]);
      } else {
        const updatedReward = await updateReward(currentReward);
        setRewards(rewards.map(r => r.id === updatedReward.id ? updatedReward : r));
      }
      setIsFormOpen(false);
      setCurrentReward(initialReward);
    } catch (error) {
      console.error('Error saving reward:', error);
      alert('An error occurred while saving the reward. Please try again.');
    }
  };

  const handleEdit = (reward: Reward) => {
    setCurrentReward(reward);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      try {
        await deleteReward(id);
        setRewards(rewards.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error deleting reward:', error);
        alert('An error occurred while deleting the reward. Please try again.');
      }
    }
  };

  const handleDuplicate = (reward: Reward) => {
    const duplicatedReward = { ...reward, id: 0, name: `Copy of ${reward.name}` };
    setCurrentReward(duplicatedReward);
    setIsFormOpen(true);
  };

  const handlePreview = (reward: Reward) => {
    setCurrentReward(reward);
    setIsPreviewOpen(true);
  };

  const filteredRewards = rewards.filter(reward =>
    reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reward.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRewards = filteredRewards.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Rewards Management</h2>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search rewards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={20} className="mr-2" /> Add New Reward
        </button>
      </div>
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
          <div className="mb-4">
            <label className="block mb-2">Store</label>
            <select
              name="storeId"
              value={currentReward.storeId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
            {errors.storeId && <p className="text-red-500 text-sm mt-1">{errors.storeId}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Reward Name</label>
            <input
              type="text"
              name="name"
              value={currentReward.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={currentReward.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Points Required</label>
            <input
              type="number"
              name="points"
              value={currentReward.points}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="0"
            />
            {errors.points && <p className="text-red-500 text-sm mt-1">{errors.points}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Reward Quota</label>
            <input
              type="number"
              name="quota"
              value={currentReward.quota}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="0"
            />
            {errors.quota && <p className="text-red-500 text-sm mt-1">{errors.quota}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Customer Redeem Validity</label>
            <select
              name="validity"
              value={currentReward.validity}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="instant">Instant</option>
              <option value="limited">Limited Time</option>
            </select>
            {errors.validity && <p className="text-red-500 text-sm mt-1">{errors.validity}</p>}
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="neverExpire"
                checked={currentReward.neverExpire}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Never Expire
            </label>
          </div>
          {!currentReward.neverExpire && (
            <div className="mb-4">
              <label className="block mb-2">Expiration Date</label>
              <input
                type="date"
                name="expirationDate"
                value={currentReward.expirationDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {errors.expirationDate && <p className="text-red-500 text-sm mt-1">{errors.expirationDate}</p>}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {currentReward.id === 0 ? 'Create' : 'Update'} Reward
            </button>
          </div>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Store</th>
              <th className="p-2 text-left">Points</th>
              <th className="p-2 text-left">Quota</th>
              <th className="p-2 text-left">Validity</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRewards.map((reward) => (
              <tr key={reward.id} className="border-b">
                <td className="p-2">{reward.name}</td>
                <td className="p-2">{stores.find(s => s.id === reward.storeId)?.name}</td>
                <td className="p-2">{reward.points}</td>
                <td className="p-2">{reward.quota}</td>
                <td className="p-2">{reward.validity}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(reward)}
                    className="text-blue-500 mr-2"
                    title="Edit"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(reward.id)}
                    className="text-red-500 mr-2"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDuplicate(reward)}
                    className="text-green-500 mr-2"
                    title="Duplicate"
                  >
                    <Copy size={20} />
                  </button>
                  <button
                    onClick={() => handlePreview(reward)}
                    className="text-purple-500"
                    title="Preview"
                  >
                    <Eye size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredRewards.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-bold mb-4">{currentReward.name}</h3>
            <p className="mb-2"><strong>Store:</strong> {stores.find(s => s.id === currentReward.storeId)?.name}</p>
            <p className="mb-2"><strong>Points:</strong> {currentReward.points}</p>
            <p className="mb-2"><strong>Description:</strong> {currentReward.description}</p>
            <p className="mb-2"><strong>Quota:</strong> {currentReward.quota}</p>
            <p className="mb-2"><strong>Validity:</strong> {currentReward.validity}</p>
            <p className="mb-4">
              <strong>Expiration:</strong> {currentReward.neverExpire ? 'Never expires' : currentReward.expirationDate}
            </p>
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsManagement;