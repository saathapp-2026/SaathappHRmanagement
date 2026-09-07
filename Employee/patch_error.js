const fs = require('fs');
let content = fs.readFileSync('src/services/employee/profile.service.ts', 'utf8');

content = content.replace(/throw new Error\('Unable to complete request. Please try again.'\);/g, 
  "throw new Error(`Unable to complete request. Please try again. (${error.code}: ${error.message})`);");

content = content.replace(/throw new Error\('Unable to load profile. Please try again.'\);/g, 
  "throw new Error(`Unable to load profile. Please try again. (${profileError?.code || 'unknown'}: ${profileError?.message || 'unknown'})`);");

fs.writeFileSync('src/services/employee/profile.service.ts', content);
console.log("Patched errors");
