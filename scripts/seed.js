import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import connectDB from '../src/config/dbConnection.js';
import User from '../src/models/User.js';
import Company from '../src/models/Company.js';
import Lead from '../src/models/Lead.js';
import Task from '../src/models/Task.js';

await connectDB();
try {
  const password = await bcrypt.hash('crm12345', 10);
  const [admin, member] = await Promise.all([
    User.findOneAndUpdate({ email: 'admin@minicrm.local' }, {
      name: 'Alex Morgan', email: 'admin@minicrm.local', password, role: 'admin'
    }, { upsert: true, new: true, setDefaultsOnInsert: true }),
    User.findOneAndUpdate({ email: 'jordan@minicrm.local' }, {
      name: 'Jordan Lee', email: 'jordan@minicrm.local', password, role: 'user'
    }, { upsert: true, new: true, setDefaultsOnInsert: true })
  ]);
  let company = await Company.findOne({ name: 'Northstar Studio' });
  if (!company) company = await Company.create({
    name: 'Northstar Studio', industry: 'Design', location: 'Chennai', createdBy: admin.id
  });
  let lead = await Lead.findOne({ email: 'ravi@example.com' });
  if (!lead) lead = await Lead.create({
    name: 'Ravi Kumar', email: 'ravi@example.com', phone: '+91 98765 43210',
    status: 'Qualified', assignedTo: member.id, company: company.id, createdBy: admin.id
  });
  const existingTask = await Task.findOne({ title: 'Introductory call', lead: lead.id });
  if (!existingTask) await Task.create({
    title: 'Introductory call', description: 'Discuss current requirements.',
    lead: lead.id, assignedTo: member.id, createdBy: admin.id,
    dueDate: new Date(Date.now() + 86400000)
  });
  console.log('Seed complete. Admin: admin@minicrm.local / crm12345');
  console.log('Assigned user: jordan@minicrm.local / crm12345');
} finally {
  await mongoose.disconnect();
}
