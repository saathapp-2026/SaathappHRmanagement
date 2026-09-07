import { supabase } from '@/lib/supabase/client';

export type DocumentStatus = 'uploaded' | 'pending_verification' | 'verified' | 'rejected' | 'replacement_required' | 'expired';

export interface EmployeeDocument {
  id: string;
  employee_id: string;
  category: string;
  document_name: string;
  storage_path: string;
  mime_type: string;
  file_size: number;
  status: DocumentStatus;
  public_review_message: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export const documentsService = {
  async getDocuments() {
    const { data, error } = await supabase
      .from('employee_documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as EmployeeDocument[];
  },

  async uploadDocument(
    file: File,
    category: string,
    onProgress?: (progress: number) => void
  ) {
    // Basic validation
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit.');
    }
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only PDF, JPEG, and PNG are allowed.');
    }

    // Get current employee
    const { data: profileData, error: profileError } = await supabase
      .from('employee_profiles')
      .select('id')
      .single();

    if (profileError || !profileData) throw new Error('Could not fetch employee profile');
    const employeeId = profileData.id;

    // sanitize filename and generate uuid for path
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const fileUuid = crypto.randomUUID();
    const filePath = `employees/${employeeId}/${category}/${fileUuid}-${sanitizedFilename}`;

    // Note: Upload progress is not supported natively by supabase-js v2 standard upload, 
    // unless using resumable uploads, but we'll try to use standard upload for now
    // We can simulate progress or use XHR if required, but standard is `supabase.storage.from(...).upload(...)`
    
    // As of supabase-js, standard upload doesn&apos;t support progress events. 
    if (onProgress) onProgress(50); 
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('employee-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;
    if (onProgress) onProgress(100);

    // Insert record in employee_documents table
    const { data: docData, error: docError } = await supabase
      .from('employee_documents')
      .insert({
        employee_id: employeeId,
        category,
        document_name: file.name,
        storage_path: uploadData.path,
        mime_type: file.type,
        file_size: file.size,
        status: 'uploaded',
      })
      .select()
      .single();

    if (docError) {
      // rollback storage upload if DB insert fails
      await supabase.storage.from('employee-documents').remove([uploadData.path]);
      throw docError;
    }

    return docData as EmployeeDocument;
  },

  async deleteDocument(documentId: string, storagePath: string) {
    const { error: dbError } = await supabase
      .from('employee_documents')
      .delete()
      .eq('id', documentId);

    if (dbError) throw dbError;

    const { error: storageError } = await supabase.storage
      .from('employee-documents')
      .remove([storagePath]);
      
    if (storageError) throw storageError;
  },

  async replaceDocument(
    documentId: string,
    oldStoragePath: string,
    file: File,
    category: string,
    onProgress?: (progress: number) => void
  ) {
    // Similar to upload, but we update the existing record
    if (file.size > 10 * 1024 * 1024) throw new Error('File size exceeds 10MB limit.');
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type.');

    const { data: profileData, error: profileError } = await supabase
      .from('employee_profiles')
      .select('id')
      .single();

    if (profileError || !profileData) throw new Error('Could not fetch employee profile');
    const employeeId = profileData.id;

    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const fileUuid = crypto.randomUUID();
    const filePath = `employees/${employeeId}/${category}/${fileUuid}-${sanitizedFilename}`;

    if (onProgress) onProgress(50);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('employee-documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    if (onProgress) onProgress(100);

    const { data: docData, error: docError } = await supabase
      .from('employee_documents')
      .update({
        document_name: file.name,
        storage_path: uploadData.path,
        mime_type: file.type,
        file_size: file.size,
        status: 'uploaded', // resubmit changes status back to uploaded
      })
      .eq('id', documentId)
      .select()
      .single();

    if (docError) {
      await supabase.storage.from('employee-documents').remove([uploadData.path]);
      throw docError;
    }

    // Clean up old file
    await supabase.storage.from('employee-documents').remove([oldStoragePath]);

    return docData as EmployeeDocument;
  },

  async getSignedUrl(path: string, expiresIn: number = 60) {
    const { data, error } = await supabase.storage
      .from('employee-documents')
      .createSignedUrl(path, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  }
};
