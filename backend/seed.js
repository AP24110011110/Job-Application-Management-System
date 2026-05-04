import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Job from "./models/Job.js";
import Application from "./models/Application.js";
import Candidate from "./models/Candidate.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/talentflow";

// ── Name pools ────────────────────────────────────────────────────────────────
const firstNames = [
  "James","Mary","Robert","Patricia","John","Jennifer","Michael","Linda",
  "David","Elizabeth","William","Barbara","Richard","Susan","Joseph","Jessica",
  "Thomas","Sarah","Charles","Karen","Christopher","Lisa","Daniel","Nancy",
  "Matthew","Betty","Anthony","Margaret","Mark","Sandra","Emily","Brian",
  "Ashley","Kevin","Amanda","Joshua","Melissa","Ryan","Stephanie","Andrew",
  "Rebecca","Justin","Sharon","Brandon","Laura","Samuel","Cynthia","Benjamin",
  "Kathleen","Eric"
];
const lastNames = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis",
  "Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson",
  "Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson",
  "White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker",
  "Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores"
];

function rndName() {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

const COMPANIES = ["Google", "NovaWorks", "FinEdge Labs", "CloudNest", "MarketPulse", "Stripe", "Figma", "Meta"];

const RECRUITERS = [
  { email: "recruiter1@company.com", name: "Sarah Johnson",    role: "Recruiter", company: "Google"      },
  { email: "recruiter2@company.com", name: "Michael Davis",    role: "Recruiter", company: "NovaWorks"   },
  { email: "recruiter3@company.com", name: "Emily Rodriguez",  role: "Recruiter", company: "FinEdge Labs"},
  { email: "recruiter4@company.com", name: "James Wilson",     role: "Recruiter", company: "CloudNest"   },
  { email: "recruiter5@company.com", name: "Linda Martinez",   role: "Recruiter", company: "MarketPulse" },
];

const MANAGERS = [
  { email: "manager1@company.com",   name: "Robert Anderson",  role: "Hiring Manager", company: "Google" },
  { email: "manager2@company.com",   name: "Patricia Thompson",role: "Hiring Manager", company: "NovaWorks" },
  { email: "manager3@company.com",   name: "William Harris",   role: "Hiring Manager", company: "FinEdge Labs" },
  { email: "manager4@company.com",   name: "Barbara Clark",    role: "Hiring Manager", company: "CloudNest" },
  { email: "manager5@company.com",   name: "Richard Lewis",    role: "Hiring Manager", company: "MarketPulse" },
];

const ADMIN = { email: "admin@company.com", name: "System Admin", role: "Admin", company: "JAMS" };

async function upsertUser({ email, name, role, company }) {
  const existing = await User.findOne({ email, role });
  if (existing) {
    console.log(`  ↳ Exists: ${email} (${role})`);
    if (!existing.company) {
      existing.company = company;
      await existing.save();
    }
    return existing;
  }
  const user = new User({ name, email, password: "123456", role, company });
  await user.save();
  console.log(`  ✅ Created: ${email} (${role}) at ${company}`);
  return user;
}

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB:", MONGODB_URI);

    // Clear existing jobs and apps to rebuild with company data
    await Job.deleteMany({});
    await Application.deleteMany({});
    console.log("🗑️ Cleared existing Jobs and Applications for fresh seeding with companies.");

    // ── 1. Upsert staff accounts ────────────────────────────────────────────
    console.log("── Recruiters ──");
    const recruiterDocs = [];
    for (const r of RECRUITERS) recruiterDocs.push(await upsertUser(r));

    console.log("\n── Hiring Managers ──");
    const managerDocs = [];
    for (const m of MANAGERS) managerDocs.push(await upsertUser(m));

    console.log("\n── Admin ──");
    const adminDoc = await upsertUser(ADMIN);

    const staffAll = [...recruiterDocs, ...managerDocs, adminDoc];
    console.log(`\n✅ Staff total: ${staffAll.length} accounts in 'users' collection.`);

    // ── 2. Candidates ──────────────────────────────────────────────────────
    const TARGET = 340;
    const existingCandidateCount = await User.countDocuments({ role: "Candidate" });
    let candidateUsers = await User.find({ role: "Candidate" });
    
    if (existingCandidateCount < TARGET) {
      const toCreate = TARGET - existingCandidateCount;
      console.log(`\n── Candidates ── Creating ${toCreate} more…`);
      for (let i = 0; i < toCreate; i++) {
        const name  = rndName();
        const email = `candidate_${Date.now()}_${i}@example.com`;
        const cu = new User({ name, email, password: "123456", role: "Candidate" });
        await cu.save();
        await new Candidate({ name, email, phone: "+1234567890", location: "Remote", yearsExperience: Math.floor(Math.random() * 10) + 1, source: "Careers page" }).save();
        candidateUsers.push(cu);
      }
    }
    console.log(`✅ Total Candidates: ${candidateUsers.length}`);

    // ── 3. Jobs ─────────────────────────────────────────────────────────────
    console.log("\n── Jobs ──");
    const jobTitles = [
      "Senior Frontend Engineer","Backend Developer","Product Manager",
      "UI/UX Designer","DevOps Engineer","Data Scientist",
      "Marketing Manager","Sales Representative","HR Specialist",
      "Customer Support Lead","QA Automation Engineer","Full Stack Developer"
    ];
    
    const jobs = [];
    for (let i = 0; i < jobTitles.length; i++) {
      const owner = recruiterDocs[i % recruiterDocs.length];
      const job = await Job.create({
        title: jobTitles[i],
        description: `We are looking for a highly skilled ${jobTitles[i]} at ${owner.company}.`,
        department: ["Engineering","Product","Design","Marketing","Sales","HR"][i % 6],
        location: ["Bengaluru", "Remote", "Mumbai", "Hyderabad"][i % 4],
        status: "Published",
        approvalStatus: "Approved",
        company: owner.company,
        owner: owner._id,
        employmentType: "Full-time",
        skills: ["JavaScript", "Node.js", "React"].slice(0, Math.floor(Math.random() * 3) + 1)
      });
      jobs.push(job);
    }
    console.log(`✅ Created ${jobs.length} jobs with company data.`);

    // ── 4. Applications ────────────────────────────────────────────────────
    console.log("\n── Applications ──");
    const statusPool = [
      ...Array(15).fill("Applied"),
      ...Array(45).fill("Interview"),
      ...Array(280).fill("Rejected"),
    ];
    
    for (let i = 0; i < TARGET; i++) {
      const cu = candidateUsers[i];
      const job = jobs[Math.floor(Math.random() * jobs.length)];
      const status = statusPool[i % statusPool.length];
      await Application.create({ candidateUser: cu._id, job: job._id, status, notes: [] });
    }
    console.log(`✅ Created ${TARGET} applications.`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seedDatabase();
