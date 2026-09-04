export const mockNotifications = [
  {
    id: "notif-1",
    title: "Leave Approved",
    message: "Your annual leave request has been approved.",
    date: new Date().toISOString(),
    read: false,
  },
  {
    id: "notif-2",
    title: "System Update",
    message: "The HR portal will be undergoing maintenance this weekend.",
    date: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  }
];

export const mockAnnouncements = [
  {
    id: "ann-1",
    title: "Company Townhall",
    content: "Join us for the Q3 townhall meeting next Friday.",
    date: new Date(Date.now() - 172800000).toISOString(),
  }
];

export const mockEvents = [
  {
    id: "evt-1",
    title: "Team Lunch",
    date: new Date(Date.now() + 86400000).toISOString(),
  }
];
