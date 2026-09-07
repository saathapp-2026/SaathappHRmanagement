import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { BarChart3, Download, FileSpreadsheet, FileText, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const ReportsPage = () => {
  const { employees, dailyAttendance, leaveRequests, departments } = useHR();

  const [activeReport, setActiveReport] = useState('daily');
  const [selectedDept, setSelectedDept] = useState('All');

  // Report Datasets
  const getDailyAttendanceData = () => {
    return dailyAttendance.map(a => ({
      'Employee ID': a.employeeId,
      'Employee Name': a.employeeName,
      'Department': a.departmentName,
      'Date': a.date,
      'Check In': a.checkIn,
      'Check Out': a.checkOut,
      'Working Hours': a.duration,
      'Status': a.status
    }));
  };

  const getMonthlyAttendanceData = () => {
    return employees.map(e => {
      const records = dailyAttendance.filter(a => a.employeeId === e.id);
      const present = records.filter(a => a.status === 'Present').length;
      const late = records.filter(a => a.status === 'Late').length;
      const absent = records.filter(a => a.status === 'Absent').length;
      const leave = records.filter(a => a.status === 'On Leave').length;
      return {
        'Employee ID': e.id,
        'Employee Name': e.fullName,
        'Department': e.departmentName,
        'Working Days': 22,
        'Present Days': present + late,
        'Absent Days': absent,
        'Leave Days': leave,
        'Attendance %': `${Math.round(((present + late) / 22) * 100)}%`
      };
    });
  };

  const getLeaveReportData = () => {
    return leaveRequests.map(r => ({
      'Request ID': r.id,
      'Employee ID': r.employeeId,
      'Employee Name': r.employeeName,
      'Department': r.departmentName,
      'Leave Type': r.leaveTypeName,
      'Start Date': r.startDate,
      'End Date': r.endDate,
      'Days Count': r.daysCount,
      'Status': r.status
    }));
  };

  const getCurrentReportData = () => {
    if (activeReport === 'daily') return getDailyAttendanceData();
    if (activeReport === 'monthly') return getMonthlyAttendanceData();
    return getLeaveReportData();
  };

  // Real File Export Functions
  const exportToExcel = () => {
    const data = getCurrentReportData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HR Report');
    XLSX.writeFile(workbook, `Saath_HR_${activeReport}_Report.xlsx`);
  };

  const exportToCSV = () => {
    const data = getCurrentReportData();
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Saath_HR_${activeReport}_Report.csv`;
    link.click();
  };

  const exportToPDF = () => {
    const data = getCurrentReportData();
    if (data.length === 0) return;
    const doc = new jsPDF();
    doc.text(`Saath HR ${activeReport.toUpperCase()} Report`, 14, 15);
    const headers = [Object.keys(data[0])];
    const rows = data.map(obj => Object.values(obj));
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 20,
      styles: { fontSize: 8 }
    });
    doc.save(`Saath_HR_${activeReport}_Report.pdf`);
  };

  const data = getCurrentReportData();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            HR Analytics & Report Exports
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Generate and export real downloadable reports in Excel, CSV, and PDF formats.
          </p>
        </div>

        {/* Real Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportToExcel}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="h-4 w-4" /> Export Excel (.xlsx)
          </button>
          <button
            onClick={exportToCSV}
            className="px-3.5 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-md shadow-saath-600/30 transition-all flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5"
          >
            <FileText className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveReport('daily')}
          className={`py-3 px-4 text-xs font-bold border-b-2 ${activeReport === 'daily' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'}`}
        >
          Daily Attendance Report
        </button>
        <button
          onClick={() => setActiveReport('monthly')}
          className={`py-3 px-4 text-xs font-bold border-b-2 ${activeReport === 'monthly' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'}`}
        >
          Monthly Attendance Summary
        </button>
        <button
          onClick={() => setActiveReport('leave')}
          className={`py-3 px-4 text-xs font-bold border-b-2 ${activeReport === 'leave' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'}`}
        >
          Leave Application Report
        </button>
      </div>

      {/* Preview Table */}
      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Report Data Preview ({data.length} records)</span>
          <span className="text-[11px] font-semibold text-slate-400">Click any export button above to download full file</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-extrabold uppercase">
                {data.length > 0 && Object.keys(data[0]).map(key => (
                  <th key={key} className="py-3 px-4">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="py-3 px-4 font-medium text-slate-800">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
