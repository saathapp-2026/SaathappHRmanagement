const fs = require('fs');
const file = 'src/app/(portal)/complete-profile/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /setFatalError\(e\.message \|\| "An unexpected error occurred\."\);/,
  `console.error("Profile load error:", err);
        const technicalError = e.message || "An unexpected error occurred.";
        setFatalError(
          process.env.NODE_ENV === 'development' 
            ? \`Unable to load your employee profile. Please try again or contact HR if the problem continues. [Dev Error: \${technicalError}]\`
            : "Unable to load your employee profile. Please try again or contact HR if the problem continues."
        );`
);

content = content.replace(
  /setError\(e\.message \|\| "An unexpected error occurred\."\);/,
  `console.error("Profile submit error:", err);
      const technicalError = e.message || "An unexpected error occurred.";
      setError(
        process.env.NODE_ENV === 'development' 
          ? \`Submission failed. [Dev Error: \${technicalError}]\`
          : "Submission failed. Please try again or contact HR."
      );`
);

fs.writeFileSync(file, content);
