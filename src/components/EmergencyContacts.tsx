import { Phone, AlertCircle } from 'lucide-react';

const EMERGENCY_CONTACTS = [
  {
    name: 'Police',
    number: '100',
    icon: '🚔',
  },
  {
    name: 'Ambulance',
    number: '102',
    icon: '🚑',
  },
  {
    name: 'Fire',
    number: '101',
    icon: '🚒',
  },
];

export const EmergencyContacts = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-red-600">Emergency Contacts (India)</h3>
      </div>
      
      <div className="space-y-2">
        {EMERGENCY_CONTACTS.map((contact) => (
          <div
            key={contact.number}
            className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{contact.icon}</span>
              <span className="font-medium text-red-900">{contact.name}</span>
            </div>
            <a
              href={`tel:${contact.number}`}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">{contact.number}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
