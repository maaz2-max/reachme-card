import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { PreferenceModal } from './PreferenceModal';
import { EmergencyContacts } from './EmergencyContacts';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { usePreferences } from '@/hooks/usePreferences';

export const FooterContent = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [changingTo, setChangingTo] = useState<'on' | 'off'>('on');
  const { preferences, verifyPin, savePreferences } = usePreferences();

  if (!preferences) {
    return null;
  }

  const handleToggle = (newValue: boolean) => {
    setChangingTo(newValue ? 'on' : 'off');
    setModalOpen(true);
  };

  const handlePinConfirm = (pin: string): boolean => {
    if (verifyPin(pin)) {
      savePreferences(changingTo);
      return true;
    }
    return false;
  };

  const getMessage = () => {
    if (!preferences.showDetails) {
      return (
        <div className="text-sm text-gray-600 mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
          <p className="font-medium">Details are currently hidden</p>
          <p>The user may be driving or not in use. Turn ON to show details.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-2xl mx-auto">
        {/* Emergency Contacts - Always Visible */}
        <div className="px-4 py-4 border-b border-gray-200">
          <EmergencyContacts />
        </div>

        {/* Car Details and Preference Control */}
        <div className="px-4 py-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between py-2 hover:bg-gray-100 rounded px-2 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Car Details & Preferences
              </span>
            </div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {expanded && (
            <div className="mt-4 space-y-4 pt-4 border-t border-gray-200">
              {/* Car Details */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Car Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Model:</span> Toyota Fortuner
                  </p>
                  <p>
                    <span className="font-medium">License Plate:</span> DL 01 AB 1234
                  </p>
                  <p>
                    <span className="font-medium">Color:</span> Silver
                  </p>
                </div>
              </div>

              {/* Show/Hide Details Toggle */}
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      Show Contact Details
                    </p>
                    <p className="text-xs text-gray-500">
                      Phone & location visibility
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showDetails}
                    onCheckedChange={handleToggle}
                  />
                </div>

                {getMessage()}
              </div>

              {/* Info Note */}
              <div className="flex gap-2 p-2 bg-blue-50 rounded border border-blue-200 mt-3">
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Your privacy settings are saved securely. Only on/off preference is stored in cloud.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <PreferenceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handlePinConfirm}
        isChangingTo={changingTo}
      />
    </footer>
  );
};
