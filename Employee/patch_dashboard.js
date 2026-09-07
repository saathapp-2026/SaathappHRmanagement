const fs = require('fs');

let content = fs.readFileSync('src/app/(portal)/dashboard/page.tsx', 'utf8');

// Add import
if (!content.includes('profileService')) {
  content = content.replace('import { AttendanceService } from "@/services/attendanceService";', 
    'import { AttendanceService } from "@/services/attendanceService";\nimport { profileService } from "@/services/employee/profile.service";');
}

// Add state
if (!content.includes('const [profileName, setProfileName]')) {
  content = content.replace('const [isLoading, setIsLoading] = useState(false);', 
    'const [isLoading, setIsLoading] = useState(false);\n  const [profileName, setProfileName] = useState("");');
}

// Add fetch inside useEffect
if (!content.includes('profileService.getEmployeeProfile()')) {
  content = content.replace('loadToday();\n  }, [loadToday]);', 
    `loadToday();
    
    async function fetchName() {
      try {
        const p = await profileService.getEmployeeProfile();
        setProfileName(p.full_name?.split(" ")[0] || "Employee");
      } catch (e) {}
    }
    fetchName();
  }, [loadToday]);`);
}

// Replace Anjali!
content = content.replace('Anjali! 👋', '{profileName || "Employee"}! 👋');

fs.writeFileSync('src/app/(portal)/dashboard/page.tsx', content);
console.log("Patched dashboard");
