import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  UserX,
  Send,
  Eye,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';

export const EmployeesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { employees, departments, designations, addEmployee, updateEmployeeStatus, resendInvitation, verifyEmployeeProfile } = useHR();

  // Filters State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedDept, setSelectedDept] = useState(searchParams.get('department') || 'All');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'All');
  const [selectedType, setSelectedType] = useState('All');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusModalEmp, setStatusModalEmp] = useState(null);
  const [targetStatus, setTargetStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');

  // Add Employee Form State
  const [newEmpForm, setNewEmpForm] = useState({
    fullName: '',
    officialEmail: '',
    mobileNumber: '',
    departmentId: departments[0]?.id || '',
    designationId: designations[0]?.id || '',
    reportingManagerId: 'EMP-2026-001',
    joiningDate: new Date().toISOString().split('T')[0],
    employmentType: 'Full-Time',
    workLocation: 'Head Office - Mumbai',
    salary: '₹ 8,50,000 / annum'
  });
  const [formError, setFormError] = useState('');

  // Filter Logic
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.officialEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All' || emp.departmentName === selectedDept || emp.departmentId === selectedDept;
    
    let matchesStatus = true;
    if (selectedStatus === 'Pending') {
      matchesStatus = ['Invited', 'Profile Pending', 'Under Verification'].includes(emp.accountStatus);
    } else if (selectedStatus !== 'All') {
      matchesStatus = emp.accountStatus === selectedStatus;
    }

    const matchesType = selectedType === 'All' || emp.employmentType === selectedType;

    return matchesSearch && matchesDept && matchesStatus && matchesType;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!newEmpForm.fullName || !newEmpForm.officialEmail || !newEmpForm.mobileNumber) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const deptObj = departments.find(d => d.id === newEmpForm.departmentId);
    const desigObj = designations.find(d => d.id === newEmpForm.designationId);
    const managerObj = employees.find(e => e.id === newEmpForm.reportingManagerId);

    addEmployee({
      ...newEmpForm,
      departmentName: deptObj?.name || 'General',
      designationName: desigObj?.name || 'Executive',
      reportingManagerName: managerObj?.fullName || 'Rajesh Sharma'
    });

    setIsAddModalOpen(false);
    setNewEmpForm({
      fullName: '',
      officialEmail: '',
      mobileNumber: '',
      departmentId: departments[0]?.id || '',
      designationId: designations[0]?.id || '',
      reportingManagerId: 'EMP-2026-001',
      joiningDate: new Date().toISOString().split('T')[0],
      employmentType: 'Full-Time',
      workLocation: 'Head Office - Mumbai',
      salary: '₹ 8,50,000 / annum'
    });
  };

  const handleConfirmStatusChange = () => {
    if (!statusReason.trim()) return;
    updateEmployeeStatus(statusModalEmp.id, targetStatus, statusReason);
    setStatusModalEmp(null);
    setStatusReason('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px] border border-emerald-200">Active</span>;
      case 'Invited':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[11px] border border-blue-200">Invited</span>;
      case 'Profile Pending':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[11px] border border-amber-200">Profile Pending</span>;
      case 'Under Verification':
        return <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-extrabold text-[11px] border border-purple-200">Under Verification</span>;
      case 'Suspended':
        return <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 font-extrabold text-[11px] border border-orange-200">Suspended</span>;
      case 'Deactivated':
      case 'Terminated':
        return <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-[11px] border border-rose-200">{status}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[11px]">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Employee Directory ({filteredEmployees.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage employee onboarding, invitations, verification, department assignments and accounts.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" /> Add New Employee
        </button>
      </div>

      {/* Search & Filtering Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-saath-500 focus:outline-none focus:ring-2 focus:ring-saath-500/20"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs font-medium text-slate-800 bg-white focus:border-saath-500 focus:outline-none"
          >
            <option value="All">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs font-medium text-slate-800 bg-white focus:border-saath-500 focus:outline-none"
          >
            <option value="All">All Account Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Onboarding Pending</option>
            <option value="Invited">Invited</option>
            <option value="Profile Pending">Profile Pending</option>
            <option value="Under Verification">Under Verification</option>
            <option value="Suspended">Suspended</option>
            <option value="Deactivated">Deactivated</option>
            <option value="Terminated">Terminated</option>
          </select>

          {/* Employment Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs font-medium text-slate-800 bg-white focus:border-saath-500 focus:outline-none"
          >
            <option value="All">All Employment Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        {(searchTerm || selectedDept !== 'All' || selectedStatus !== 'All' || selectedType !== 'All') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">Showing filtered results ({filteredEmployees.length})</span>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDept('All'); setSelectedStatus('All'); setSelectedType('All'); }}
              className="text-saath-600 font-bold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Employees Table */}
      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-extrabold uppercase tracking-wider">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Department & Designation</th>
                <th className="py-3.5 px-4">Reporting Manager</th>
                <th className="py-3.5 px-4">Joining & Type</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400 font-medium">
                    No employees match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Employee Profile */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.fullName}
                          className="h-10 w-10 rounded-xl object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm hover:text-saath-600 cursor-pointer" onClick={() => navigate(`/employees/${emp.id}`)}>
                            {emp.fullName}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
                            <span className="font-mono font-bold text-saath-700">{emp.id}</span>
                            <span>•</span>
                            <span>{emp.officialEmail}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Dept & Designation */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{emp.designationName}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{emp.departmentName}</div>
                    </td>

                    {/* Manager */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-700">{emp.reportingManagerName}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{emp.workLocation}</div>
                    </td>

                    {/* Joining */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{emp.joiningDate}</div>
                      <div className="text-[11px] text-saath-600 font-bold">{emp.employmentType}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(emp.accountStatus)}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/employees/${emp.id}`)}
                          className="p-2 rounded-xl text-slate-600 hover:bg-saath-50 hover:text-saath-600 transition-colors"
                          title="View Profile Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {emp.accountStatus === 'Invited' && (
                          <button
                            onClick={() => resendInvitation(emp.id)}
                            className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Resend Onboarding Invitation"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        )}

                        {emp.accountStatus === 'Under Verification' && (
                          <button
                            onClick={() => verifyEmployeeProfile(emp.id)}
                            className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Verify Profile"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}

                        {/* Status Toggle Dropdown / Action */}
                        {emp.accountStatus === 'Active' ? (
                          <button
                            onClick={() => { setStatusModalEmp(emp); setTargetStatus('Suspended'); }}
                            className="p-2 rounded-xl text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Suspend Account"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </button>
                        ) : emp.accountStatus === 'Suspended' ? (
                          <button
                            onClick={() => { setStatusModalEmp(emp); setTargetStatus('Active'); }}
                            className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Reactivate Account"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8">
            <h3 className="text-xl font-extrabold text-slate-900">Add New Employee Record</h3>
            <p className="text-xs text-slate-500 mt-1">
              Create employee record and automatically dispatch an onboarding invite link to their official email.
            </p>

            {formError && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newEmpForm.fullName}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, fullName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs font-medium focus:border-saath-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh.k@saathhr.com"
                    value={newEmpForm.officialEmail}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, officialEmail: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs font-medium focus:border-saath-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 00000"
                    value={newEmpForm.mobileNumber}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, mobileNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs font-medium focus:border-saath-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={newEmpForm.departmentId}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, departmentId: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs font-medium focus:border-saath-500 focus:outline-none bg-white"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                  <select
                    value={newEmpForm.designationId}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, designationId: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs font-medium focus:border-saath-500 focus:outline-none bg-white"
                  >
                    {designations.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Reporting Manager</label>
                  <select
                    value={newEmpForm.reportingManagerId}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, reportingManagerId: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs font-medium focus:border-saath-500 focus:outline-none bg-white"
                  >
                    {employees.map(m => (
                      <option key={m.id} value={m.id}>{m.fullName} ({m.designationName})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Joining Date</label>
                  <input
                    type="date"
                    value={newEmpForm.joiningDate}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, joiningDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs font-medium focus:border-saath-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={newEmpForm.employmentType}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, employmentType: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs font-medium focus:border-saath-500 focus:outline-none bg-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-saath-600 text-xs font-bold text-white hover:bg-saath-700 shadow-lg shadow-saath-600/30 transition-all"
                >
                  Create & Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Status Confirmation Modal */}
      {statusModalEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900">
              Confirm Account Status Change ({targetStatus})
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              You are updating account status for <strong className="text-slate-900">{statusModalEmp.fullName}</strong> to <span className="font-bold text-saath-600">{targetStatus}</span>.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">Mandatory Administrative Reason *</label>
              <textarea
                required
                rows={3}
                placeholder="Specify compliance or administrative reason for audit log..."
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:border-saath-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setStatusModalEmp(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusChange}
                disabled={!statusReason.trim()}
                className="px-4 py-2 rounded-xl bg-saath-600 text-xs font-bold text-white hover:bg-saath-700 disabled:opacity-50"
              >
                Confirm & Log Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
