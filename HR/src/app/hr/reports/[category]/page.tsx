'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Download, Bookmark, Filter, ChevronRight, 
  CheckCircle, AlertCircle, Users, Clock, Calendar, Briefcase, FileText
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  mockHeadcountTable, 
  mockAttendanceTable, 
  mockLateArrivals, 
  mockLeaveTable, 
  mockPayrollReadiness 
} from '@/data/hr/reports';

export default function ReportDetailPage() {
  const params = useParams();
  const category = (params.category as string) || '';
  
  const [dateFilter, setDateFilter] = useState('This Month');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getReportDetails = (cat: string) => {
    switch (cat) {
      case 'headcount': return { title: 'Headcount Report', desc: 'Active, probation, and notice period counts by department.' };
      case 'attendance': return { title: 'Attendance Analytics', desc: 'Analyze workforce attendance, absenteeism and punctuality.' };
      case 'leave': return { title: 'Leave Report', desc: 'Leave distribution, balances and pending requests.' };
      case 'movement': return { title: 'Employee Movement', desc: 'Joiners, exits, and turnover rates.' };
      case 'probation': return { title: 'Probation Analytics', desc: 'Status of probation reviews and confirmations.' };
      case 'offboarding': return { title: 'Offboarding Analytics', desc: 'Exit reasons and clearance progress.' };
      case 'documents': return { title: 'Document Compliance', desc: 'Verified, pending, and expired documents tracking.' };
      case 'concerns': return { title: 'Concerns & Help', desc: 'SLA tracking and resolution metrics.' };
      case 'payroll': return { title: 'Payroll Readiness', desc: 'Attendance locking and data completeness.' };
      default: return { title: 'Report', desc: '' };
    }
  };

  const details = getReportDetails(category);

  // Simple Bar component for fake charts
  const Bar = ({ width, color, label, val }: any) => (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-24 text-xs text-gray-500 truncate">{label}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden flex items-center">
        <div className={`h-full ${color}`} style={{ width: `${width}%` }}></div>
      </div>
      <div className="w-12 text-xs font-medium text-right">{val}</div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center">
          <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
          {toastMessage}
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/hr/reports" className="hover:text-indigo-600 transition-colors">Reports</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{details.title}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{details.title}</h1>
          <p className="text-gray-500 mt-1">{details.desc}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => triggerToast('Report view saved.')}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Save View
          </button>
          <button 
            onClick={() => triggerToast('Report exported successfully.')}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Global Filters */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
          <select 
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
          <select 
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
          >
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Operations</option>
            <option>Marketing</option>
            <option>Finance</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Reset Filters</button>
        </div>
      </div>

      <div className="text-xs text-gray-500 flex items-center justify-between border-b border-gray-100 pb-4">
        <span>Filters: {dateFilter} • {deptFilter} • All Locations</span>
        <span>Last Updated: {new Date().toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'})} • Demo data</span>
      </div>

      {/* Dynamic Content Based on Category */}
      
      {category === 'headcount' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Employees</p><p className="text-2xl font-bold mt-1">248</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Active</p><p className="text-2xl font-bold mt-1 text-green-600">236</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">On Probation</p><p className="text-2xl font-bold mt-1 text-amber-600">24</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Notice Period</p><p className="text-2xl font-bold mt-1 text-red-600">6</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Contract / Intern</p><p className="text-2xl font-bold mt-1 text-purple-600">12</p></CardContent></Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Headcount Trend (Last 6 Months)</div>
              <CardContent className="p-6">
                <div className="h-48 flex items-end justify-between gap-2 text-xs text-gray-500 pb-6 relative">
                  {/* Fake bars */}
                  {[221, 227, 233, 239, 244, 248].map((v, i) => (
                    <div key={i} className="w-full flex flex-col items-center gap-2 group">
                      <div className="w-full bg-indigo-100 hover:bg-indigo-600 rounded-t-sm transition-colors relative" style={{ height: `${(v/250)*100}%` }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white px-2 py-1 rounded text-[10px] transition-opacity">
                          {v}
                        </div>
                      </div>
                      <span className="absolute bottom-0">{['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][i]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Department Distribution</div>
              <CardContent className="p-6">
                <Bar label="Engineering" val="92" width={80} color="bg-blue-500" />
                <Bar label="Operations" val="54" width={45} color="bg-indigo-500" />
                <Bar label="Marketing" val="31" width={25} color="bg-purple-500" />
                <Bar label="Finance" val="24" width={20} color="bg-amber-500" />
                <Bar label="HR" val="18" width={15} color="bg-rose-500" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Department Breakdown</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Active</th>
                    <th className="px-4 py-3">On Probation</th>
                    <th className="px-4 py-3">Notice Period</th>
                    <th className="px-4 py-3">New Joiners</th>
                    <th className="px-4 py-3">Exits</th>
                    <th className="px-4 py-3">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockHeadcountTable.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">{row.department}</td>
                      <td className="px-4 py-3">{row.total}</td>
                      <td className="px-4 py-3 text-green-600">{row.active}</td>
                      <td className="px-4 py-3 text-amber-600">{row.onProbation}</td>
                      <td className="px-4 py-3 text-red-600">{row.noticePeriod}</td>
                      <td className="px-4 py-3 text-blue-600">{row.newJoiners}</td>
                      <td className="px-4 py-3 text-gray-500">{row.exits}</td>
                      <td className="px-4 py-3 font-medium">{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {category === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="col-span-2"><CardContent className="p-4"><p className="text-xs text-gray-500">Attendance Rate</p><p className="text-2xl font-bold mt-1 text-green-600">94.6%</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Present Days</p><p className="text-2xl font-bold mt-1">4,128</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Absent Days</p><p className="text-2xl font-bold mt-1 text-red-600">124</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Late Arrivals</p><p className="text-2xl font-bold mt-1 text-amber-600">89</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Half Days</p><p className="text-2xl font-bold mt-1 text-purple-600">34</p></CardContent></Card>
          </div>

          <Card>
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Attendance by Department</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Present %</th>
                    <th className="px-4 py-3">Absent %</th>
                    <th className="px-4 py-3">Late Arrivals</th>
                    <th className="px-4 py-3">Half Days</th>
                    <th className="px-4 py-3">Avg Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockAttendanceTable.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">{row.department}</td>
                      <td className="px-4 py-3 text-green-600 font-medium">{row.presentPct}%</td>
                      <td className="px-4 py-3 text-red-600 font-medium">{row.absentPct}%</td>
                      <td className="px-4 py-3 text-amber-600">{row.late}</td>
                      <td className="px-4 py-3 text-purple-600">{row.halfDay}</td>
                      <td className="px-4 py-3 text-gray-500">{row.avgHours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900 flex justify-between items-center">
              <span>Frequent Late Arrivals</span>
              <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded">Needs Review</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-4 py-3">Employee</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Late Days</th>
                    <th className="px-4 py-3">Avg Delay</th>
                    <th className="px-4 py-3">Last Late</th>
                    <th className="px-4 py-3">Attendance %</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockLateArrivals.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{row.employee}</div>
                        <div className="text-xs text-gray-500">{row.employeeId}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{row.department}</td>
                      <td className="px-4 py-3 text-amber-600 font-bold">{row.lateDays}</td>
                      <td className="px-4 py-3 text-red-600">{row.avgDelay}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(row.lastLate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-medium">{row.attendancePct}</td>
                      <td className="px-4 py-3">
                        <Link href={`/hr/attendance/${row.employeeId}`} className="text-indigo-600 hover:text-indigo-800 font-medium">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {category === 'leave' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Leave Requests</p><p className="text-2xl font-bold mt-1">86</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Approved</p><p className="text-2xl font-bold mt-1 text-green-600">72</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Pending</p><p className="text-2xl font-bold mt-1 text-amber-600">9</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Rejected</p><p className="text-2xl font-bold mt-1 text-red-600">5</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Leave Days Taken</p><p className="text-2xl font-bold mt-1">168</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Employees on Leave</p><p className="text-2xl font-bold mt-1 text-purple-600">18</p></CardContent></Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Leave Type Distribution</div>
              <CardContent className="p-6">
                <Bar label="Casual Leave" val="62 days" width={75} color="bg-blue-500" />
                <Bar label="Sick Leave" val="44 days" width={55} color="bg-red-400" />
                <Bar label="Earned Leave" val="38 days" width={45} color="bg-emerald-500" />
                <Bar label="Comp Off" val="12 days" width={20} color="bg-purple-400" />
                <Bar label="Unpaid Leave" val="12 days" width={20} color="bg-gray-400" />
              </CardContent>
            </Card>
            
            <Card>
              <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">High Leave Overlap (Conflict Warning)</div>
              <CardContent className="p-6 space-y-4">
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-amber-900 text-sm">Engineering - 12 Sep 2026</p>
                    <p className="text-xs text-amber-700 mt-0.5">6 employees away</p>
                  </div>
                  <Link href="/hr/leave" className="text-xs bg-white border border-amber-200 px-3 py-1 rounded hover:bg-amber-100 font-medium text-amber-800">View Details</Link>
                </div>
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-amber-900 text-sm">Operations - 15 Sep 2026</p>
                    <p className="text-xs text-amber-700 mt-0.5">4 employees away</p>
                  </div>
                  <Link href="/hr/leave" className="text-xs bg-white border border-amber-200 px-3 py-1 rounded hover:bg-amber-100 font-medium text-amber-800">View Details</Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Leave by Department</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Employees</th>
                    <th className="px-4 py-3">Total Leave Days</th>
                    <th className="px-4 py-3">Avg / Employee</th>
                    <th className="px-4 py-3">Pending Requests</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockLeaveTable.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">{row.department}</td>
                      <td className="px-4 py-3">{row.employees}</td>
                      <td className="px-4 py-3 text-purple-600 font-bold">{row.leaveDays}</td>
                      <td className="px-4 py-3 text-gray-700">{row.avgPerEmployee}</td>
                      <td className="px-4 py-3 text-amber-600 font-medium">{row.pendingRequests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {category === 'payroll' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3 text-blue-800">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Payroll Readiness View</p>
              <p>This report tracks the completeness of attendance and profile inputs required for payroll processing. It does not calculate salary data.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Employees</p><p className="text-2xl font-bold mt-1">248</p></CardContent></Card>
            <Card className="col-span-2"><CardContent className="p-4"><p className="text-xs text-gray-500">Attendance Locked</p><p className="text-2xl font-bold mt-1 text-green-600">231</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Attendance Pending</p><p className="text-2xl font-bold mt-1 text-amber-600">17</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">LWP Days (Total)</p><p className="text-2xl font-bold mt-1 text-red-600">12</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Missing Salary Data</p><p className="text-2xl font-bold mt-1 text-red-600">4</p></CardContent></Card>
          </div>

          <Card>
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Payroll Readiness Checks</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-4 py-3">Employee</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Attendance Status</th>
                    <th className="px-4 py-3">LWP Days</th>
                    <th className="px-4 py-3">Salary Record</th>
                    <th className="px-4 py-3">Readiness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockPayrollReadiness.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{row.employee}</div>
                        <div className="text-xs text-gray-500">{row.employeeId}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{row.department}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${row.attendanceStatus === 'Locked' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          {row.attendanceStatus}
                        </span>
                      </td>
                      <td className={`px-4 py-3 font-bold ${row.lwpDays > 0 ? 'text-red-600' : 'text-gray-400'}`}>{row.lwpDays}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${row.salaryRecord === 'Available' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                          {row.salaryRecord}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${row.payrollReadiness === 'Ready' ? 'text-green-600' : row.payrollReadiness === 'Needs Review' ? 'text-amber-600' : 'text-red-600'}`}>
                          {row.payrollReadiness}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {['movement', 'probation', 'offboarding', 'documents', 'concerns'].includes(category) && (
        <div className="bg-gray-50 border border-gray-200 p-12 text-center rounded-xl">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">{details.title} Mock</h3>
          <p className="text-sm text-gray-500 mb-4">This section demonstrates the standard report pattern.</p>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100">
            View All Reports
          </button>
        </div>
      )}
    </div>
  );
}
