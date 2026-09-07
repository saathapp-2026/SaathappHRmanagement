const fs = require('fs');
const path = require('path');

function fixHeader() {
  const file = 'src/components/hr/offboarding/OffboardingHeader.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/onUpdate: \(record: Partial<OffboardingRecord>\) => void/g, 'onUpdate?: (record: Partial<OffboardingRecord>) => void');
  // Just use onUpdate if it's there
  content = content.replace(/<button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 bg-white">/g, '<button onClick={() => onUpdate && onUpdate({ status: \'Cancelled\' })} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 bg-white">');
  fs.writeFileSync(file, content);
}

function fixStartModal() {
  const file = 'src/components/hr/offboarding/StartOffboardingModal.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import React, \{ useState \} from 'react';/, 'import React, { useState, FormEvent } from \'react\';');
  fs.writeFileSync(file, content);
}

function fixExitInterviewCard() {
  const file = 'src/components/hr/offboarding/ExitInterviewCard.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import \{ Calendar, User, Video, Edit \} from 'lucide-react';/, "import { Calendar, User, Video } from 'lucide-react';");
  fs.writeFileSync(file, content);
}

fixHeader();
fixStartModal();
fixExitInterviewCard();
