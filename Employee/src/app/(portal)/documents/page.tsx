"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, UploadCloud, FileSpreadsheet, FileIcon, Loader2 } from "lucide-react";

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('All Documents');
  const [isUploading, setIsUploading] = useState(false);

  const documents = [
    { name: "Offer Letter.pdf", category: "Onboarding", date: "15 Aug 2026", size: "1.2 MB", type: "pdf" },
    { name: "August_2026_Payslip.pdf", category: "Payroll", date: "31 Aug 2026", size: "450 KB", type: "pdf" },
    { name: "Company_Handbook.pdf", category: "Policies", date: "1 Jan 2026", size: "3.5 MB", type: "pdf" },
  ];

  const filteredDocs = activeCategory === 'All Documents' 
    ? documents 
    : documents.filter(d => d.category === activeCategory);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert("Document uploaded successfully (mock).");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Document Vault</h1>
          <p className="text-slate-500 text-sm mt-1">Access your payslips, policies, and upload HR documents.</p>
        </div>
        <Button className="gap-2" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />} 
          {isUploading ? "Uploading..." : "Upload Document"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['All Documents', 'Payroll', 'Policies', 'Onboarding'].map((cat, i) => (
          <Button 
            key={i} 
            variant={activeCategory === cat ? "default" : "outline"} 
            className="w-full justify-start h-12"
            onClick={() => setActiveCategory(cat)}
          >
            <FileIcon className="w-4 h-4 mr-2" /> {cat}
          </Button>
        ))}
      </div>

      {filteredDocs.length === 0 ? (
        <Card className="shadow-sm border-slate-100 text-center py-20 mt-6">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">No Documents Found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">There are no documents in this category.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredDocs.map((doc, i) => (
            <Card key={i} className="shadow-sm border-slate-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-[10px] font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{doc.category}</span>
                </div>
                <h3 className="font-semibold text-slate-800 line-clamp-1" title={doc.name}>{doc.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{doc.size} • Uploaded on {doc.date}</p>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 -ml-2 h-8" onClick={() => alert(`Opening ${doc.name}`)}>View</Button>
                  <Button variant="ghost" size="sm" className="text-xs text-slate-600 -mr-2 h-8 gap-1" onClick={() => alert(`Downloading ${doc.name}`)}><Download className="w-3.5 h-3.5"/> Download</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
