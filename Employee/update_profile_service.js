const fs = require('fs');

let content = fs.readFileSync('src/services/employee/profile.service.ts', 'utf8');

content = content.replace(/throw new Error\('Not authenticated'\);/g, "throw new Error('Authentication required');");
content = content.replace(/throw new Error\('Profile not found'\);/g, `if (profileError?.code === 'PGRST116') {
      throw new Error('Employee profile is not linked to this account');
    }
    throw new Error('Unable to load profile. Please try again.');`);

content = content.replace(/if \(error\) {\n\s*throw error;\n\s*}/g, `if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Employee profile is not linked to this account');
      }
      console.error('Supabase error:', error);
      throw new Error('Unable to complete request. Please try again.');
    }`);

fs.writeFileSync('src/services/employee/profile.service.ts', content);
console.log("Updated!");
