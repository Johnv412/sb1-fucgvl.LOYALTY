import React, { useState } from 'react';
import { CreditCard, Mail, Link } from 'lucide-react';

interface IntegrationOption {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentIntegrations: IntegrationOption[] = [
  { name: 'PayPal', icon: <CreditCard />, description: 'Accept payments via PayPal' },
  { name: 'Stripe', icon: <CreditCard />, description: 'Process credit card payments with Stripe' },
];

const autoresponderIntegrations: IntegrationOption[] = [
  { name: 'Aweber', icon: <Mail />, description: 'Connect with Aweber email marketing' },
  { name: 'Mailchimp', icon: <Mail />, description: 'Integrate Mailchimp for email campaigns' },
  { name: 'Active Campaign', icon: <Mail />, description: 'Use Active Campaign for marketing automation' },
];

const otherIntegrations: IntegrationOption[] = [
  { name: 'Clover POS', icon: <Link />, description: 'Integrate with Clover Point of Sale' },
  { name: 'Square', icon: <Link />, description: 'Connect Square for payments and POS' },
  { name: 'Amazon S3', icon: <Link />, description: 'Use Amazon S3 for file storage' },
  { name: 'SMTP', icon: <Mail />, description: 'Set up SMTP for reliable email delivery' },
];

const IntegrationCard: React.FC<{ integration: IntegrationOption }> = ({ integration }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center mb-2">
      <div className="mr-2 text-blue-500">{integration.icon}</div>
      <h3 className="text-lg font-semibold">{integration.name}</h3>
    </div>
    <p className="text-gray-600 mb-4">{integration.description}</p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
      Connect
    </button>
  </div>
);

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payment');

  const renderIntegrations = (integrations: IntegrationOption[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {integrations.map((integration) => (
        <IntegrationCard key={integration.name} integration={integration} />
      ))}
    </div>
  );

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Integrations</h2>
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'payment' ? 'bg-white text-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('payment')}
          >
            Payment Integration
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'autoresponder' ? 'bg-white text-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('autoresponder')}
          >
            Autoresponder Integration
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'other' ? 'bg-white text-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('other')}
          >
            Other Integration
          </button>
        </nav>
      </div>
      <div className="bg-white p-6 rounded-lg">
        {activeTab === 'payment' && renderIntegrations(paymentIntegrations)}
        {activeTab === 'autoresponder' && renderIntegrations(autoresponderIntegrations)}
        {activeTab === 'other' && renderIntegrations(otherIntegrations)}
      </div>
    </div>
  );
};

export default Integrations;