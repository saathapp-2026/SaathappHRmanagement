import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import { Search, Filter, Users, MapPin, Calendar, Briefcase, Eye } from 'lucide-react';

export const TeamMembersPage = () => {
  const navigate = useNavigate();
  const { teamMembers } = useHR();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [designationFilter, setDesignationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Filter logic
  const filteredMembers = teamMembers.filter(m => {
    const matchesSearch = m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.designationName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || m.todayStatus === statusFilter;
    const matchesLocation = locationFilter === 'All' || m.workLocation === locationFilter;
    const matchesDesignation = designationFilter === 'All' || m.designationName === designationFilter;
    const matchesType = typeFilter === 'All' || m.employmentType === typeFilter;

    return matchesSearch && matchesStatus && matchesLocation && matchesDesignation && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Members Directory</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Employees in your authorized reporting hierarchy ({teamMembers.length} Total)
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID or designation..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-saath-500 bg-slate-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="All">All Attendance Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="On Leave">On Leave</option>
              <option value="Absent">Absent</option>
            </select>

            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="All">All Locations</option>
              <option value="Bengaluru Tech Hub">Bengaluru Tech Hub</option>
              <option value="Head Office - Mumbai">Head Office - Mumbai</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="All">All Employment Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-4 py-4">Employee ID</th>
                <th className="px-4 py-4">Designation</th>
                <th className="px-4 py-4">Department</th>
                <th className="px-4 py-4">Work Location</th>
                <th className="px-4 py-4">Joining Date</th>
                <th className="px-4 py-4">Today's Status</th>
                <th className="px-4 py-4">Employment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No team members found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-200" />
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{m.fullName}</p>
                          <p className="text-[10px] text-slate-400">{m.officialEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-700">{m.employeeId}</td>
                    <td className="px-4 py-3.5 text-slate-800 font-bold">{m.designationName}</td>
                    <td className="px-4 py-3.5 text-slate-600">{m.departmentName}</td>
                    <td className="px-4 py-3.5 text-slate-600">{m.workLocation}</td>
                    <td className="px-4 py-3.5 text-slate-500">{m.joiningDate}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        m.todayStatus === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                        m.todayStatus === 'Late' ? 'bg-orange-100 text-orange-800' :
                        m.todayStatus === 'On Leave' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {m.todayStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{m.employmentType}</td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => navigate(`/team/${m.id}`)}
                        className="px-3 py-1.5 rounded-xl bg-saath-50 text-saath-700 hover:bg-saath-100 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" /> View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
