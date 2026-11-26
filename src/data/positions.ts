// Open positions on the Positions page. Edit this list to match what the team needs.
// To add a role, copy one { ... } block. To close a role, delete its block.

export const positionsHeadline = 'Help us explore the twilight zone';

export const positionsIntro =
  "We're looking for motivated students who want to build something real. No ocean experience needed.";

// ---------------------------------------------------------------- Applications (Airtable)
// Applications go to the "Talosaur Applications" base in Airtable (table: Applications).
// Every Apply button opens the Airtable form in a new tab; a role's own button picks that role.
// To change the questions, edit the form in Airtable; nothing here needs to change.
// If you ever make a new form, paste its two IDs from its address here:
//   https://airtable.com/appeAulkTEyW03SIt/pagqKMsrYv13r4iei/form
//                        ^ base               ^ form page
export const airtableForm = {
  base: 'appeAulkTEyW03SIt',
  page: 'pagqKMsrYv13r4iei',
};

// The role names on the site and the "Role" choices in Airtable must match exactly, so an Apply button
// can pick the role for the applicant. When you add or rename a role below, add or rename the same
// choice in the Role field in Airtable. (No-break spaces in titles are turned into plain spaces.)
// Example: applicationFormUrl('Mechanical Engineer') ->
//   https://airtable.com/.../form?prefill_Role=Mechanical%20Engineer
export function applicationFormUrl(role?: string): string {
  const base = `https://airtable.com/${airtableForm.base}/${airtableForm.page}/form`;
  return role ? `${base}?prefill_Role=${encodeURIComponent(role.replace(/\u00a0/g, ' '))}` : base;
}

// How joining works: the four steps on the Positions page.
// New copy (not from the Content doc): check it matches how the team really recruits, and edit freely.
export const joinSteps = [
  { title: 'Apply', text: 'Fill in the short application form. No ocean experience needed.' },
  { title: 'Hear back', text: 'We read every application and reply by email to set up a quick chat.' },
  { title: 'Meet the crew', text: 'Talk about what you would like to build, and see where Turtle is up to.' },
  { title: 'Start building', text: 'Pick up a first task with the people in your area and join the next build day.' },
];

export const positions = [
  {
    title: 'Embedded Software Engineer',
    whatYoullDo: 'Write microcontroller code for motor control, sensors and safety systems',
    skills: 'C/C++, Arduino or ESP32',
  },
  {
    title: 'Computer\u00a0Vision\u00a0/\u00a0ML Engineer', // no-break spaces: "Computer Vision / ML" stays on one line
    whatYoullDo: 'Help the robot spot and track marine animals in video',
    skills: 'Python, PyTorch, OpenCV',
  },
  {
    title: 'Mechanical Engineer',
    whatYoullDo: 'Design and test the frame, mounts and waterproof parts',
    skills: 'CAD (SolidWorks, Fusion), 3D printing',
  },
  {
    title: 'Marine Biology Researcher',
    whatYoullDo: 'Help us choose study sites and identify what we film',
    skills: 'Marine biology or ecology coursework',
  },
  {
    title: 'Business Development',
    whatYoullDo: 'Talk to potential users and research the market',
    skills: 'Interest in startups, good communication',
  },
  {
    title: 'Web and Media',
    whatYoullDo: 'Keep the website updated, edit build videos and photos',
    skills: 'Web basics, video editing',
  },
];
