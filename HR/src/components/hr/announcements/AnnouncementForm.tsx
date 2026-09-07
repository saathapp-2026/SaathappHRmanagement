import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AnnouncementAudienceSelector } from './AnnouncementAudienceSelector';
import { Announcement, AnnouncementCategory, AnnouncementPriority } from '@/data/hr/announcements';

interface AnnouncementFormProps {
  initialData?: Partial<Announcement>;
  isEdit?: boolean;
}

export function AnnouncementForm({ initialData, isEdit }: AnnouncementFormProps) {
  const router = useRouter();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState<AnnouncementCategory>(initialData?.category || 'General');
  const [priority, setPriority] = useState<AnnouncementPriority>(initialData?.priority || 'Normal');
  
  const [audience, setAudience] = useState(initialData?.audience || { type: 'Everyone' });
  
  const [isScheduled, setIsScheduled] = useState(initialData?.status === 'Scheduled');
  const [publishDate, setPublishDate] = useState(
    initialData?.publishDate ? new Date(initialData.publishDate).toISOString().slice(0, 10) : ''
  );
  const [publishTime, setPublishTime] = useState(
    initialData?.publishDate ? new Date(initialData.publishDate).toISOString().slice(11, 16) : ''
  );

  const [hasExpiry, setHasExpiry] = useState(!!initialData?.expiryDate);
  const [expiryDate, setExpiryDate] = useState(
    initialData?.expiryDate ? new Date(initialData.expiryDate).toISOString().slice(0, 10) : ''
  );
  const [expiryTime, setExpiryTime] = useState(
    initialData?.expiryDate ? new Date(initialData.expiryDate).toISOString().slice(11, 16) : ''
  );

  const [requireAcknowledgement, setRequireAcknowledgement] = useState(initialData?.requireAcknowledgement || false);
  const [pinAnnouncement, setPinAnnouncement] = useState(initialData?.pinAnnouncement || false);

  const isPublished = initialData?.status === 'Published';
  
  const handleSaveDraft = () => {
    // Mock save
    alert('Announcement saved as draft.');
    router.push('/hr/announcements');
  };

  const handlePublish = () => {
    // Basic validation
    if (!title || !description) {
      alert('Title and description are required.');
      return;
    }
    
    if (isScheduled && (!publishDate || !publishTime)) {
      alert('Publish date and time are required for scheduled announcements.');
      return;
    }

    if (hasExpiry && (!expiryDate || !expiryTime)) {
      alert('Expiry date and time are required if expiry is enabled.');
      return;
    }

    if (isScheduled) {
      alert(`Announcement scheduled for ${publishDate} at ${publishTime}.`);
    } else {
      if (confirm('Publish Announcement?\n\nTarget Audience: ' + audience.type)) {
        alert('Announcement published successfully.');
      } else {
        return;
      }
    }
    router.push('/hr/announcements');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-4 bg-card p-6 rounded-lg border shadow-sm">
          <div>
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="Enter announcement title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                />
                <div className="text-xs text-muted-foreground text-right">{title.length}/120</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Message <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter announcement message..." 
                  className="min-h-[200px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category <span className="text-red-500">*</span></Label>
                  <Select value={category} onValueChange={(val: any) => setCategory(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Policy">Policy</SelectItem>
                      <SelectItem value="Holiday">Holiday</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Payroll">Payroll</SelectItem>
                      <SelectItem value="Benefits">Benefits</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="HR Update">HR Update</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Priority <span className="text-red-500">*</span></Label>
                  <Select value={priority} onValueChange={(val: any) => setPriority(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Important">Important</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  {priority === 'Urgent' && (
                    <p className="text-xs text-orange-600 mt-1">Urgent announcements should be reserved for time-sensitive employee communications.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-sm">
           <h2 className="text-lg font-semibold mb-4">Audience</h2>
           <AnnouncementAudienceSelector 
              audience={audience as any} 
              onChange={setAudience as any} 
              isLocked={isPublished}
           />
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-sm">
           <h2 className="text-lg font-semibold mb-4">Publishing & Expiry</h2>
           
           <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
                  <Label htmlFor="schedule">Schedule for Later</Label>
                </div>
                
                {isScheduled && (
                  <div className="grid grid-cols-2 gap-4 pl-6 border-l-2 ml-2">
                    <div className="space-y-2">
                      <Label>Publish Date</Label>
                      <Input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Publish Time</Label>
                      <Input type="time" value={publishTime} onChange={(e) => setPublishTime(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Switch id="expiry" checked={hasExpiry} onCheckedChange={setHasExpiry} />
                  <Label htmlFor="expiry">Set Expiry Date</Label>
                </div>
                
                {hasExpiry && (
                  <div className="grid grid-cols-2 gap-4 pl-6 border-l-2 ml-2">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Time</Label>
                      <Input type="time" value={expiryTime} onChange={(e) => setExpiryTime(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Settings</h2>
          
          <div className="flex items-start space-x-2">
            <Switch id="ack" checked={requireAcknowledgement} onCheckedChange={setRequireAcknowledgement} />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="ack">Require Acknowledgement</Label>
              <p className="text-sm text-muted-foreground">Employees must explicitly acknowledge reading this announcement.</p>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Switch id="pin" checked={pinAnnouncement} onCheckedChange={setPinAnnouncement} />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="pin">Pin Announcement</Label>
              <p className="text-sm text-muted-foreground">Pinned announcements appear prominently in employee communications.</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Attachments</h2>
          <div className="border-2 border-dashed rounded-md p-6 text-center text-muted-foreground">
            <p className="text-sm">Drag and drop files here or click to browse.</p>
            <p className="text-xs mt-1">Supported formats: PDF, DOC, DOCX, PNG, JPG (Max 5MB)</p>
            <Button variant="outline" size="sm" className="mt-4">Upload File</Button>
          </div>
          {initialData?.attachments && initialData.attachments.length > 0 && (
             <div className="space-y-2 mt-4">
                {initialData.attachments.map(att => (
                   <div key={att.id} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span className="truncate pr-2">{att.fileName}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-destructive">Remove</Button>
                   </div>
                ))}
             </div>
          )}
        </div>

        <div className="bg-muted p-4 rounded-lg border space-y-4">
           <h3 className="font-medium">Summary</h3>
           <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">{initialData?.status || 'Draft'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Audience:</span>
                <span className="font-medium">{audience.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Priority:</span>
                <span className="font-medium">{priority}</span>
              </div>
           </div>
           
           <div className="pt-4 space-y-2 flex flex-col">
              <Button onClick={handlePublish} className="w-full">
                {isScheduled ? 'Schedule Announcement' : (isEdit && isPublished ? 'Save Changes' : 'Publish Announcement')}
              </Button>
              {(!isEdit || (isEdit && initialData?.status === 'Draft')) && (
                 <Button variant="outline" onClick={handleSaveDraft} className="w-full">Save Draft</Button>
              )}
              <Button variant="ghost" onClick={() => router.push('/hr/announcements')} className="w-full">Cancel</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
