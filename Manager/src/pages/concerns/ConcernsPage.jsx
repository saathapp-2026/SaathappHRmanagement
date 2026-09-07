import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import {
  HelpCircle,
  AlertCircle,
  MessageSquare,
  Lock,
  Send,
  ShieldAlert,
  CheckCircle2,
  Paperclip,
  Clock,
  UserCheck,
  Plus,
  RefreshCw,
  Search,
  Filter,
  FileText,
  XCircle,
  ArrowRight,
  Info,
  ChevronRight,
  User,
  Shield,
  HelpCircle as HelpIcon,
  Check
} from 'lucide-react';

export const ConcernsPage = () => {
  const {
    concerns,
    employees,
    currentUser,
    updateConcernStatus,
    addPublicResponseToConcern,
    submitConcern,
    submitHelpRequest,
    assignHrRepresentative,
    requestMoreInfo
  } = useHR();

  // Top Desk Mode: 'concern' vs 'help'
  const [deskMode, setDeskMode] = useState('concern'); // 'concern' or 'help'

  // Sub-Tab Filters
  const [concernTab, setConcernTab] = useState('All'); // All, Open, Under Review, In Progress, Resolved, Closed
  const [helpTab, setHelpTab] = useState('All');       // All, Submitted, Open, Assigned, In Progress, Resolved, Closed

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Active Ticket Selection
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  // Simulated States: Loading & Error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Modals
  const [isConcernModal, setIsConcernModal] = useState(false);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [isRequestInfoModal, setIsRequestInfoModal] = useState(false);
  const [infoPromptText, setInfoPromptText] = useState('');

  // Reply Forms
  const [replyText, setReplyText] = useState('');
  const [replyAttachment, setReplyAttachment] = useState('');
  const [internalNote, setInternalNote] = useState('');

  // Form States
  const [concernForm, setConcernForm] = useState({
    category: 'Salary/Payroll',
    priority: 'High',
    subject: '',
    description: '',
    attachmentUrl: '',
    isConfidential: true
  });

  const [helpForm, setHelpForm] = useState({
    category: 'HR Help',
    subject: '',
    description: '',
    attachmentUrl: ''
  });

  // Filter Tickets by Desk Mode and Status Tab
  const deskTickets = concerns.filter(c => {
    if (deskMode === 'concern') return c.type === 'Concern';
    return c.type === 'Help';
  });

  const filteredTickets = deskTickets.filter(ticket => {
    // Search
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Status Tab
    const currentTab = deskMode === 'concern' ? concernTab : helpTab;
    if (currentTab === 'All') return true;
    return ticket.status === currentTab;
  });

  // Active Ticket Object
  const activeTicket = deskTickets.find(t => t.id === selectedTicketId) || filteredTickets[0] || deskTickets[0] || null;

  // Handle Tab Change with Loading simulation
  const handleSwitchTab = (newTab, mode) => {
    setIsLoading(true);
    setErrorMessage('');
    if (mode === 'concern') setConcernTab(newTab);
    else setHelpTab(newTab);

    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  const handleSwitchDeskMode = (mode) => {
    setIsLoading(true);
    setDeskMode(mode);
    setSelectedTicketId(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  // Submit Concern Handler
  const handleCreateConcern = (e) => {
    e.preventDefault();
    if (!concernForm.subject.trim() || !concernForm.description.trim()) {
      setErrorMessage('Please fill in all mandatory fields for your formal concern.');
      return;
    }

    submitConcern({
      employeeId: currentUser?.employeeId || employees[0]?.id || 'EMP-2026-001',
      employeeName: currentUser?.fullName || employees[0]?.fullName || 'Rajesh Sharma',
      departmentName: currentUser?.department || employees[0]?.departmentName || 'Human Resources',
      category: concernForm.category,
      priority: concernForm.priority,
      subject: concernForm.subject,
      description: concernForm.description,
      attachmentUrl: concernForm.attachmentUrl,
      assignedHrId: 'EMP-2026-002',
      assignedHrName: 'Priya Mehta'
    });

    setIsConcernModal(false);
    setConcernForm({ category: 'Salary/Payroll', priority: 'High', subject: '', description: '', attachmentUrl: '', isConfidential: true });
    setDeskMode('concern');
    setConcernTab('Open');
  };

  // Submit Help Request Handler
  const handleCreateHelpRequest = (e) => {
    e.preventDefault();
    if (!helpForm.subject.trim() || !helpForm.description.trim()) {
      setErrorMessage('Please provide a message describing how we can help you.');
      return;
    }

    submitHelpRequest({
      employeeId: currentUser?.employeeId || employees[0]?.id || 'EMP-2026-001',
      employeeName: currentUser?.fullName || employees[0]?.fullName || 'Rajesh Sharma',
      departmentName: currentUser?.department || employees[0]?.departmentName || 'Human Resources',
      category: helpForm.category,
      priority: 'Medium',
      subject: helpForm.subject,
      description: helpForm.description,
      attachmentUrl: helpForm.attachmentUrl,
      assignedHrId: '',
      assignedHrName: 'Unassigned'
    });

    setIsHelpModal(false);
    setHelpForm({ category: 'HR Help', subject: '', description: '', attachmentUrl: '' });
    setDeskMode('help');
    setHelpTab('Submitted');
  };

  // Send Public Reply Handler
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;

    let fullMessage = replyText;
    if (replyAttachment.trim()) {
      fullMessage += `\n[Attachment Link]: ${replyAttachment.trim()}`;
    }

    addPublicResponseToConcern(activeTicket.id, fullMessage);
    setReplyText('');
    setReplyAttachment('');
  };

  // Internal HR Note Handler
  const handleAddInternalNote = (e) => {
    e.preventDefault();
    if (!internalNote.trim() || !activeTicket) return;

    updateConcernStatus(activeTicket.id, activeTicket.status, internalNote);
    setInternalNote('');
  };

  // Request More Info Handler
  const handleConfirmRequestMoreInfo = () => {
    if (!infoPromptText.trim() || !activeTicket) return;

    requestMoreInfo(activeTicket.id, infoPromptText);
    setIsRequestInfoModal(false);
    setInfoPromptText('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Concerns & Help Desk Portal
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage employee grievances, formal HR concerns, and routine help requests with end-to-end conversation history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHelpModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-all flex items-center gap-1.5"
          >
            <HelpIcon className="h-4 w-4" /> Ask for Help
          </button>
          <button
            onClick={() => setIsConcernModal(true)}
            className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-1.5"
          >
            <Shield className="h-4 w-4" /> Raise Formal Concern
          </button>
        </div>
      </div>

      {/* DIFFERENCE CALLOUT BANNER (SECTION 16 REQUIREMENT) */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-saath-950 to-slate-900 text-white shadow-md">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-2xl bg-white/10 text-saath-300 shrink-0 mt-0.5">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h3 className="font-extrabold text-sm text-white tracking-tight">Understanding Support Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" /> Raise a Concern
                </span>
                <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">
                  For formal or sensitive HR matters (workplace conduct, policy violations, payroll discrepancies, discrimination, or formal grievances).
                </p>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-extrabold text-indigo-300 flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5" /> Ask for Help
                </span>
                <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">
                  For simple assistance, equipment/IT queries, building access, routine manager approvals, and general workplace support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESK MODE SWITCHER (Formal Concerns vs Ask for Help) */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit text-xs font-bold">
        <button
          onClick={() => handleSwitchDeskMode('concern')}
          className={`px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
            deskMode === 'concern' ? 'bg-white text-saath-800 shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shield className="h-4 w-4 text-saath-600" /> Formal Concerns Desk ({concerns.filter(c => c.type === 'Concern').length})
        </button>
        <button
          onClick={() => handleSwitchDeskMode('help')}
          className={`px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
            deskMode === 'help' ? 'bg-white text-indigo-800 shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="h-4 w-4 text-indigo-600" /> Ask for Help Desk ({concerns.filter(c => c.type === 'Help').length})
        </button>
      </div>

      {/* ERROR STATE BANNER */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-rose-500 hover:text-rose-800">
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* SUB-TABS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        {/* Concerns Sub-Tabs (All, Open, Under Review, In Progress, Resolved, Closed) */}
        {deskMode === 'concern' ? (
          <div className="flex gap-1 overflow-x-auto">
            {['All', 'Open', 'Under Review', 'In Progress', 'Resolved', 'Closed'].map(tab => (
              <button
                key={tab}
                onClick={() => handleSwitchTab(tab, 'concern')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  concernTab === tab ? 'bg-saath-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : (
          /* Help Request Sub-Tabs (All, Submitted, Open, Assigned, In Progress, Resolved, Closed) */
          <div className="flex gap-1 overflow-x-auto">
            {['All', 'Submitted', 'Open', 'Assigned', 'In Progress', 'Resolved', 'Closed'].map(tab => (
              <button
                key={tab}
                onClick={() => handleSwitchTab(tab, 'help')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  helpTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets by ID, subject, name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:border-saath-500"
          />
        </div>
      </div>

      {/* MAIN CONTENT SPLIT LAYOUT (LIST + DETAILS TIMELINE) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: TICKET LIST */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase tracking-wider px-1">
            <span>{deskMode === 'concern' ? 'Formal Concerns' : 'Help Requests'} ({filteredTickets.length})</span>
            {isLoading && <RefreshCw className="h-3.5 w-3.5 animate-spin text-saath-600" />}
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <RefreshCw className="h-6 w-6 animate-spin text-saath-600 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Fetching support desk tickets...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            /* EMPTY STATE */
            <div className="p-10 text-center rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <h4 className="text-xs font-extrabold text-slate-700">No Tickets Found</h4>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                No {deskMode === 'concern' ? 'formal concerns' : 'help requests'} match your selected filter tab ({deskMode === 'concern' ? concernTab : helpTab}).
              </p>
            </div>
          ) : (
            /* TICKET CARDS */
            filteredTickets.map(ticket => {
              const isSelected = activeTicket?.id === ticket.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-4 rounded-3xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-saath-500 bg-saath-50/50 shadow-md ring-2 ring-saath-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-saath-700 font-extrabold text-xs">{ticket.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] ${
                      ticket.priority === 'Urgent' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      ticket.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {ticket.priority} Priority
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm mt-1.5 line-clamp-1">{ticket.subject}</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    <strong>{ticket.employeeName}</strong> • {ticket.category}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mt-3 pt-2 border-t border-slate-100">
                    <span>Created: {ticket.createdDate}</span>
                    <span className={`px-2 py-0.5 rounded-md font-extrabold ${
                      ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'bg-emerald-100 text-emerald-800' :
                      ticket.status === 'Under Review' || ticket.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT COLUMN: TICKET DETAIL & CONVERSATION TIMELINE */}
        {activeTicket ? (
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            {/* Header & Status Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-saath-600">{activeTicket.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-800 font-extrabold text-[10px]">
                    {activeTicket.category}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 mt-1">{activeTicket.subject}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Raised by <strong className="text-slate-800">{activeTicket.employeeName}</strong> ({activeTicket.departmentName}) on {activeTicket.createdDate}
                </p>
              </div>

              {/* HR Status Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Assign Representative */}
                <select
                  value={activeTicket.assignedHrId || ''}
                  onChange={(e) => {
                    const selectedEmp = employees.find(emp => emp.id === e.target.value);
                    if (selectedEmp) assignHrRepresentative(activeTicket.id, selectedEmp.id, selectedEmp.fullName);
                  }}
                  className="rounded-xl border border-slate-200 py-1.5 px-3 text-xs font-bold text-slate-700 bg-white"
                >
                  <option value="">Assigned: {activeTicket.assignedHrName || 'Unassigned'}</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>Assign: {emp.fullName}</option>
                  ))}
                </select>

                {/* Status Dropdown */}
                <select
                  value={activeTicket.status}
                  onChange={(e) => updateConcernStatus(activeTicket.id, e.target.value)}
                  className="rounded-xl border border-slate-200 py-1.5 px-3 text-xs font-extrabold text-saath-800 bg-saath-50"
                >
                  {deskMode === 'concern' ? (
                    <>
                      <option value="Open">Open</option>
                      <option value="Under Review">Under Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </>
                  ) : (
                    <>
                      <option value="Submitted">Submitted</option>
                      <option value="Open">Open</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </>
                  )}
                </select>

                {/* Request Info Button */}
                <button
                  onClick={() => setIsRequestInfoModal(true)}
                  className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 font-bold text-xs hover:bg-amber-100"
                >
                  Request Info
                </button>
              </div>
            </div>

            {/* TIMELINE THREAD (CONVERSATION & AUDIT LOGS) */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-saath-600" /> Conversation Timeline & Updates
              </h3>

              {/* Step 1: Employee Original Message */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-saath-600 text-white font-black flex items-center justify-center text-xs">
                      {activeTicket.employeeName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900">{activeTicket.employeeName}</span>
                      <p className="text-[10px] text-slate-400 font-semibold">{activeTicket.createdDate}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold text-[10px]">
                    Original Request
                  </span>
                </div>

                <p className="text-slate-800 leading-relaxed font-medium pt-1">{activeTicket.description}</p>

                {activeTicket.attachmentUrl && (
                  <div className="pt-2">
                    <a
                      href={activeTicket.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-saath-600 font-bold text-[11px] shadow-sm hover:bg-slate-50"
                    >
                      <Paperclip className="h-3.5 w-3.5" /> View Attached Proof Document
                    </a>
                  </div>
                )}
              </div>

              {/* Step 2: Public HR Responses & Employee Replies */}
              {activeTicket.publicResponses.map((res, index) => (
                <div key={index} className="p-4 rounded-2xl bg-saath-50/70 border border-saath-200 text-xs space-y-1.5 ml-4">
                  <div className="flex items-center justify-between font-bold text-saath-900">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-saath-800 text-white font-bold flex items-center justify-center text-[10px]">
                        HR
                      </div>
                      <span>{res.sender}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">{res.date}</span>
                  </div>
                  <p className="text-slate-800 whitespace-pre-wrap leading-relaxed pl-8 font-medium">{res.text}</p>
                </div>
              ))}

              {/* REPLY BOX (SECTION 16 REQUIREMENT) */}
              <form onSubmit={handleSendReply} className="pt-2 space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <label className="block text-xs font-extrabold text-slate-800">
                    Reply to Employee / Post Timeline Update
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Type official response or update..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    className="w-full rounded-xl border p-2.5 text-xs font-medium focus:border-saath-500"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <input
                      type="text"
                      placeholder="Optional attachment URL..."
                      value={replyAttachment}
                      onChange={e => setReplyAttachment(e.target.value)}
                      className="flex-1 rounded-xl border px-3 py-1.5 text-xs font-medium"
                    />

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-saath-600 text-white font-bold text-xs shadow-md hover:bg-saath-700 flex items-center gap-1.5 shrink-0"
                    >
                      <Send className="h-3.5 w-3.5" /> Send Reply
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* CONFIDENTIAL PRIVATE INTERNAL HR STAFF NOTES */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h3 className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-amber-600" /> Private Internal HR Staff Notes (Confidential)
              </h3>

              {activeTicket.internalNotes.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No confidential internal notes added yet.</p>
              ) : (
                activeTicket.internalNotes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs">
                    <div className="flex items-center justify-between font-extrabold text-amber-950">
                      <span>{note.author}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{note.date}</span>
                    </div>
                    <p className="text-slate-800 mt-1 font-medium">{note.note}</p>
                  </div>
                ))
              )}

              <form onSubmit={handleAddInternalNote} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add confidential internal note for HR staff..."
                  value={internalNote}
                  onChange={e => setInternalNote(e.target.value)}
                  className="flex-1 rounded-xl border border-amber-200 px-3 py-2 text-xs focus:border-amber-500 font-medium"
                />
                <button type="submit" className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700">
                  Save Note
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 p-12 text-center text-slate-400 text-xs bg-white rounded-3xl border border-slate-200/80 shadow-sm">
            Select a ticket from the left panel to inspect details and conversation timeline.
          </div>
        )}
      </div>

      {/* MODAL 1: RAISE FORMAL CONCERN */}
      {isConcernModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="flex min-h-full items-start sm:items-center justify-center p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-saath-600" /> Raise a Formal Concern
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Submit a confidential grievance or formal policy violation ticket for HR investigation.</p>

            <form onSubmit={handleCreateConcern} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Concern Category *</label>
                  <select
                    value={concernForm.category}
                    onChange={e => setConcernForm({ ...concernForm, category: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium bg-white"
                  >
                    <option value="Salary/Payroll">Salary/Payroll</option>
                    <option value="Workplace Conduct">Workplace Conduct</option>
                    <option value="Policy Violation">Policy Violation</option>
                    <option value="Grievance">Grievance / Harassment</option>
                    <option value="Other">Other Sensitive Matter</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority Level *</label>
                  <select
                    value={concernForm.priority}
                    onChange={e => setConcernForm({ ...concernForm, priority: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium bg-white"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject / Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="Brief headline of the concern..."
                  value={concernForm.subject}
                  onChange={e => setConcernForm({ ...concernForm, subject: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Explanation *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide complete facts, dates, names, and details..."
                  value={concernForm.description}
                  onChange={e => setConcernForm({ ...concernForm, description: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Attachment URL / Proof (Optional)</label>
                <input
                  type="text"
                  placeholder="https://example.com/docs/proof_file.pdf"
                  value={concernForm.attachmentUrl}
                  onChange={e => setConcernForm({ ...concernForm, attachmentUrl: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div className="p-3 rounded-2xl bg-saath-50 border border-saath-200">
                <label className="flex items-center gap-2 font-bold text-saath-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={concernForm.isConfidential}
                    onChange={e => setConcernForm({ ...concernForm, isConfidential: e.target.checked })}
                    className="h-4 w-4 text-saath-600 rounded"
                  />
                  Strict Confidential Handling (Restricted to HR Director)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsConcernModal(false)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-saath-600 text-white font-bold shadow-md shadow-saath-600/30">
                  Submit Concern Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* MODAL 2: ASK FOR HELP (SECTION 16 REQUIREMENT) */}
      {isHelpModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="flex min-h-full items-start sm:items-center justify-center p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8">
            <div className="text-center pb-3 border-b">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 font-extrabold flex items-center justify-center mx-auto mb-2">
                <HelpIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">How can we help you?</h3>
              <p className="text-xs text-slate-500 mt-0.5">Submit a simple assistance request for quick team support.</p>
            </div>

            <form onSubmit={handleCreateHelpRequest} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Help Category *</label>
                <select
                  value={helpForm.category}
                  onChange={e => setHelpForm({ ...helpForm, category: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-bold bg-white"
                >
                  <option value="HR Help">HR Help</option>
                  <option value="IT Help">IT Help</option>
                  <option value="Office Help">Office Help</option>
                  <option value="Manager Assistance">Manager Assistance</option>
                  <option value="Payroll Help">Payroll Help</option>
                  <option value="General Help">General Help</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject / Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Request for dual monitor setup..."
                  value={helpForm.subject}
                  onChange={e => setHelpForm({ ...helpForm, subject: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what assistance or equipment you require..."
                  value={helpForm.description}
                  onChange={e => setHelpForm({ ...helpForm, description: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Optional Attachment URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/docs/file.pdf"
                  value={helpForm.attachmentUrl}
                  onChange={e => setHelpForm({ ...helpForm, attachmentUrl: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsHelpModal(false)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5">
                  Submit Help Request <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* MODAL 3: REQUEST MORE INFORMATION */}
      {isRequestInfoModal && activeTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="flex min-h-full items-start sm:items-center justify-center p-4">
            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-xs space-y-4 my-8">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-600" /> Request Information ({activeTicket.id})
            </h3>
            <p className="text-slate-500">Prompt the employee for specific clarification or missing evidence. Status will automatically update to <strong>Under Review</strong>.</p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Clarification Prompt Text *</label>
              <textarea
                rows={3}
                required
                placeholder="Specify what document, screenshot, or information is required..."
                value={infoPromptText}
                onChange={e => setInfoPromptText(e.target.value)}
                className="w-full rounded-xl border p-2.5 font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button onClick={() => setIsRequestInfoModal(false)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">
                Cancel
              </button>
              <button onClick={handleConfirmRequestMoreInfo} className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold shadow-md">
                Send Information Request
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
