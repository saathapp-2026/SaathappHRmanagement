 
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Download, UploadCloud, FileIcon, Loader2, Trash2, 
  RefreshCw, Eye, AlertCircle, CheckCircle2 
} from "lucide-react";
import { documentsService, EmployeeDocument } from "@/services/employee/documents.service";

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [documents, setDocuments] = useState<EmployeeDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('Onboarding');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [replacingDocId, setReplacingDocId] = useState<string | null>(null);

  const categories = ['All', 'Identity', 'Address', 'Education', 'Financial', 'Onboarding'];

    const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const data = await documentsService.getDocuments();
      setDocuments(data || []);
    } catch (error: any) {
       
      const err = error as unknown;
      console.error('Failed to load documents:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDocuments();
  }, []);

  
  const filteredDocs = activeCategory === 'All' 
    ? documents 
    : documents.filter(d => d.category === activeCategory);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await documentsService.uploadDocument(file, uploadCategory);
      await // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDocuments();
      alert("Document uploaded successfully.");
    } catch (error: any) {
       
      const err = error as unknown;
      alert("Upload failed: " + (err as Error).message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReplaceClick = (docId: string) => {
    setReplacingDocId(docId);
    if (replaceInputRef.current) {
      replaceInputRef.current.click();
    }
  };

  const handleReplaceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacingDocId) return;

    const docToReplace = documents.find(d => d.id === replacingDocId);
    if (!docToReplace) return;

    try {
      setIsUploading(true);
      await documentsService.replaceDocument(
        docToReplace.id,
        docToReplace.storage_path,
        file,
        docToReplace.category
      );
      await // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDocuments();
      alert("Document replaced successfully.");
    } catch (error: any) {
       
      const err = error as unknown;
      alert("Replacement failed: " + (err as Error).message);
    } finally {
      setIsUploading(false);
      setReplacingDocId(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const handleDelete = async (docId: string, storagePath: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await documentsService.deleteDocument(docId, storagePath);
      await // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDocuments();
    } catch (error: any) {
       
      const err = error as unknown;
      alert("Failed to delete document: " + (err as Error).message);
    }
  };

  const handleView = async (path: string, mimeType: string) => {
    try {
      const url = await documentsService.getSignedUrl(path, 60); // 1 minute
      if (mimeType.startsWith('image/') || mimeType === 'application/pdf') {
        window.open(url, '_blank');
      } else {
        alert("Preview not available for this file type.");
      }
    } catch (error: any) {
       
      const err = error as unknown;
      alert("Failed to get document URL: " + (err as Error).message);
    }
  };

  const handleDownload = async (path: string, name: string) => {
    try {
      const url = await documentsService.getSignedUrl(path, 60); // 1 min
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error: any) {
       
      const err = error as unknown;
      alert("Failed to download document: " + (err as Error).message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'uploaded':
        return <span className="text-[10px] font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Uploaded</span>;
      case 'pending_verification':
        return <span className="text-[10px] font-medium px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> Pending Verification</span>;
      case 'verified':
        return <span className="text-[10px] font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Verified</span>;
      case 'rejected':
      case 'replacement_required':
        return <span className="text-[10px] font-medium px-2 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Action Required</span>;
      default:
        return <span className="text-[10px] font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Document Vault</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and upload your official HR documents.</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="h-10 px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
          >
            {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="application/pdf,image/jpeg,image/png"
            onChange={handleFileChange}
          />
          <input 
            type="file" 
            ref={replaceInputRef} 
            className="hidden" 
            accept="application/pdf,image/jpeg,image/png"
            onChange={handleReplaceFileChange}
          />
          <Button className="gap-2" onClick={handleUploadClick} disabled={isUploading}>
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />} 
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2">
        {categories.map((cat, i) => (
          <Button 
            key={i} 
            variant={activeCategory === cat ? "default" : "outline"} 
            className="whitespace-nowrap"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-slate-400"/></div>
      ) : filteredDocs.length === 0 ? (
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
          {filteredDocs.map((doc) => {
            const canDelete = ['uploaded', 'replacement_required', 'rejected'].includes(doc.status);
            
            return (
              <Card key={doc.id} className="shadow-sm border-slate-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <FileIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                  
                  <h3 className="font-semibold text-slate-800 line-clamp-1 flex-1" title={doc.document_name}>
                    {doc.document_name}
                  </h3>
                  
                  <div className="text-xs text-slate-500 mt-1 space-y-1">
                    <p>{doc.category} • {(doc.file_size / 1024 / 1024).toFixed(2)} MB</p>
                    <p>Uploaded on {new Date(doc.created_at).toLocaleDateString()}</p>
                  </div>

                  {(doc.status === 'rejected' || doc.status === 'replacement_required') && doc.public_review_message && (
                    <div className="mt-3 p-3 bg-red-50 text-red-700 text-xs rounded-md border border-red-100">
                      <strong>Feedback:</strong> {doc.public_review_message}
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2 justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-1 px-2" onClick={() => handleView(doc.storage_path, doc.mime_type)}>
                        <Eye className="w-3.5 h-3.5"/> View
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 gap-1 px-2" onClick={() => handleDownload(doc.storage_path, doc.document_name)}>
                        <Download className="w-3.5 h-3.5"/>
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {canDelete && (
                        <>
                          <Button variant="outline" size="sm" className="h-8 gap-1 px-2 text-blue-600 hover:text-blue-700" onClick={() => handleReplaceClick(doc.id)}>
                            <RefreshCw className="w-3.5 h-3.5"/> Replace
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 gap-1 px-2 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(doc.id, doc.storage_path)}>
                            <Trash2 className="w-3.5 h-3.5"/>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
