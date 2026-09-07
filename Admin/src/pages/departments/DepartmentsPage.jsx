import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Building2, Plus, Users, ShieldAlert, Award, ChevronRight, Edit3, Trash2, AlertCircle } from 'lucide-react';

export const DepartmentsPage = () => {
  const {
    departments,
    departmentsLoading,
    departmentsError,
    designations,
    designationsLoading,
    designationsError,
    employees,
    addDepartment,
    addDesignation
  } = useHR();

  const [activeTab, setActiveTab] = useState('departments');
  const [isAddDeptModal, setIsAddDeptModal] = useState(false);
  const [isAddDesigModal, setIsAddDesigModal] = useState(false);
  const [deletionBlockedMessage, setDeletionBlockedMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deptForm, setDeptForm] = useState({ name: '', code: '', headEmployeeId: '' });
  const [desigForm, setDesigForm] = useState({ name: '', departmentId: '', level: 'Mid' });

  const handleAddDept = async (e) => {
    e.preventDefault();
    if (!deptForm.name || !deptForm.code) return;
    setActionError('');
    setIsSubmitting(true);
    try {
      const headObj = employees.find(emp => emp.id === deptForm.headEmployeeId);
      await addDepartment({
        ...deptForm,
        headName: headObj ? headObj.fullName : 'Unassigned'
      });
      setIsAddDeptModal(false);
      setDeptForm({ name: '', code: '', headEmployeeId: '' });
    } catch (err) {
      setActionError(err.message || 'Failed to create department.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddDesig = async (e) => {
    e.preventDefault();
    if (!desigForm.name) return;
    setActionError('');
    setIsSubmitting(true);
    try {
      const selectedDeptId = desigForm.departmentId || (departments[0]?.id || '');
      const deptObj = departments.find(d => d.id === selectedDeptId);
      await addDesignation({
        ...desigForm,
        departmentId: selectedDeptId,
        departmentName: deptObj ? deptObj.name : 'General'
      });
      setIsAddDesigModal(false);
      setDesigForm({ name: '', departmentId: '', level: 'Mid' });
    } catch (err) {
      setActionError(err.message || 'Failed to create designation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAttemptDeleteDept = (dept) => {
    const assignedCount = employees.filter(e => e.departmentId === dept.id || e.departmentName === dept.name).length;
    if (assignedCount > 0) {
      setDeletionBlockedMessage(`Deletion blocked: Department "${dept.name}" currently has ${assignedCount} active employee(s) assigned. Reassign all employees to another department before deleting.`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Departments & Designations
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage organizational hierarchy, department heads, designations, and employee allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActionError(''); setIsAddDeptModal(true); }}
            className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Department
          </button>
          <button
            onClick={() => { setActionError(''); setDesigForm({ name: '', departmentId: departments[0]?.id || '', level: 'Mid' }); setIsAddDesigModal(true); }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Designation
          </button>
        </div>
      </div>

      {/* Deletion Protection Warning Banner */}
      {deletionBlockedMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
            <span>{deletionBlockedMessage}</span>
          </div>
          <button onClick={() => setDeletionBlockedMessage('')} className="font-bold text-amber-900 underline">Dismiss</button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('departments')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'departments' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'
          }`}
        >
          <Building2 className="h-4 w-4" /> Departments ({departments.length})
        </button>
        <button
          onClick={() => setActiveTab('designations')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'designations' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'
          }`}
        >
          <Award className="h-4 w-4" /> Designations ({designations.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'departments' ? (
        departmentsLoading ? (
          <div className="py-16 text-center text-slate-500 font-medium bg-white rounded-3xl border border-slate-200/80">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-saath-600"></div>
              <span>Loading departments from database...</span>
            </div>
          </div>
        ) : departmentsError ? (
          <div className="py-12 text-center text-rose-600 font-medium bg-rose-50 rounded-3xl border border-rose-200">
            <p className="font-bold">Failed to load departments</p>
            <p className="text-xs text-rose-500 mt-1">{departmentsError}</p>
          </div>
        ) : departments.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-medium bg-white rounded-3xl border border-slate-200/80 p-8">
            <Building2 className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-700">No departments found in database</p>
            <p className="text-xs text-slate-500 mt-1">Click "Add Department" above to create your first department record.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => {
              const count = employees.filter(e => e.departmentId === dept.id || e.departmentName === dept.name).length;
              return (
                <div key={dept.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-saath-100 text-saath-800 font-extrabold text-[10px] font-mono">
                        {dept.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                        {dept.status || 'Active'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base">{dept.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Head: <strong className="text-slate-800">{dept.headName}</strong></p>

                    <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-saath-600" /> Active Employees</span>
                      <span className="text-sm font-black text-slate-900">{count}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button onClick={() => handleAttemptDeleteDept(dept)} className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
                      <Trash2 className="h-3.5 w-3.5" /> Reassign / Delete
                    </button>
                    <span className="text-[10px] text-slate-400 font-medium">Est. {dept.createdDate || '2026'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        designationsLoading ? (
          <div className="py-16 text-center text-slate-500 font-medium bg-white rounded-3xl border border-slate-200/80">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-saath-600"></div>
              <span>Loading designations from database...</span>
            </div>
          </div>
        ) : designationsError ? (
          <div className="py-12 text-center text-rose-600 font-medium bg-rose-50 rounded-3xl border border-rose-200">
            <p className="font-bold">Failed to load designations</p>
            <p className="text-xs text-rose-500 mt-1">{designationsError}</p>
          </div>
        ) : designations.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-medium bg-white rounded-3xl border border-slate-200/80 p-8">
            <Award className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-700">No designations found in database</p>
            <p className="text-xs text-slate-500 mt-1">Click "Add Designation" above to create your first designation record.</p>
          </div>
        ) : (
          <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b text-slate-500 font-extrabold uppercase">
                  <th className="py-3.5 px-4">Designation Title</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Hierarchy Level</th>
                  <th className="py-3.5 px-4">Employee Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {designations.map(d => {
                  const count = employees.filter(e => e.designationId === d.id || e.designationName === d.name).length;
                  return (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{d.name}</td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{d.departmentName}</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-slate-100 font-bold text-[10px] text-slate-700">{d.level}</span></td>
                      <td className="py-3 px-4 font-extrabold text-slate-900">{count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Add Department Modal */}
      {isAddDeptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Add Department</h3>

            {actionError && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {actionError}
              </div>
            )}

            <form onSubmit={handleAddDept} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Department Name *</label>
                <input type="text" required placeholder="e.g. Marketing" value={deptForm.name} onChange={e => setDeptForm({...deptForm, name: e.target.value})} className="w-full rounded-xl border p-2.5" />
              </div>
              <div>
                <label className="block font-bold mb-1">Department Code *</label>
                <input type="text" required placeholder="e.g. MKT" value={deptForm.code} onChange={e => setDeptForm({...deptForm, code: e.target.value})} className="w-full rounded-xl border p-2.5 uppercase" />
              </div>
              <div>
                <label className="block font-bold mb-1">Department Head</label>
                <select value={deptForm.headEmployeeId} onChange={e => setDeptForm({...deptForm, headEmployeeId: e.target.value})} className="w-full rounded-xl border p-2.5 bg-white">
                  <option value="">Select Employee</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.fullName} ({e.designationName})</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsAddDeptModal(false)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold disabled:opacity-50">
                  {isSubmitting ? 'Creating...' : 'Create Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Designation Modal */}
      {isAddDesigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Add Designation</h3>

            {actionError && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {actionError}
              </div>
            )}

            <form onSubmit={handleAddDesig} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Designation Title *</label>
                <input type="text" required placeholder="e.g. Lead Designer" value={desigForm.name} onChange={e => setDesigForm({...desigForm, name: e.target.value})} className="w-full rounded-xl border p-2.5" />
              </div>
              <div>
                <label className="block font-bold mb-1">Department</label>
                <select value={desigForm.departmentId} onChange={e => setDesigForm({...desigForm, departmentId: e.target.value})} className="w-full rounded-xl border p-2.5 bg-white">
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Hierarchy Level</label>
                <select value={desigForm.level} onChange={e => setDesigForm({...desigForm, level: e.target.value})} className="w-full rounded-xl border p-2.5 bg-white">
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsAddDesigModal(false)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold disabled:opacity-50">
                  {isSubmitting ? 'Creating...' : 'Create Designation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
