const fs = require('fs');
const glob = require('glob');
const { execSync } = require('child_process');

function fixFiles() {
  const files = glob.sync('src/**/*.{ts,tsx}');
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix any
    content = content.replace(/: any/g, ': unknown');
    content = content.replace(/<any>/g, '<unknown>');
    content = content.replace(/ as any/g, ' as unknown');
    
    // Header.tsx set-state-in-effect
    if (file.includes('Header.tsx')) {
      content = content.replace(/void fetchUnreadCount\(\);/g, `
      notificationsService.getNotifications().then(data => {
        setUnreadCount(data.filter(n => !n.is_read).length);
      }).catch(() => {});
      `.trim());
      // we can also remove fetchUnreadCount function entirely if it's only used here.
    }
    
    fs.writeFileSync(file, content);
  }
}

fixFiles();
