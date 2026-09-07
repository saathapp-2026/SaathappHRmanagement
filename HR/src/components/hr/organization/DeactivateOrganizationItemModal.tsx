import React from 'react';
import { X, AlertCircle } from 'lucide-react';

export function DeactivateOrganizationItemModal({ 
  isOpen, 
  onClose, 
  itemName, 
  itemType, 
  warningCount 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  itemName: string, 
  itemType: string, 
  warningCount?: number 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><AlertCircle size={20} className="text-amber-500"/> Deactivate {itemType}?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-800">
            Are you sure you want to deactivate <strong>{itemName}</strong>?
          </p>
          
          {warningCount && warningCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3 text-sm text-amber-900">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <p>This {itemType.toLowerCase()} currently has <strong>{warningCount} employees</strong> assigned. Reassign employees before final backend deactivation.</p>
            </div>
          )}
          
          <p className="text-xs text-gray-500 italic mt-4">Before backend implementation, this action is simulated only.</p>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-sm">Deactivate</button>
        </div>
      </div>
    </div>
  );
}
