import Lead from '../models/Lead.js';

const leadPopulate = [
  { path: 'assignedTo', select: 'name email' },
  { path: 'company', select: 'name industry location' }
];

export const listLeads = async ({ page = 1, limit = 10, search = '', status = '' }) => {
  const filter = { isDeleted: false };
  if (status) filter.status = status;
  if (search) filter.$or = [
    { name: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
    { phone: { $regex: search, $options: 'i' } }
  ];
  const [items, total] = await Promise.all([
    Lead.find(filter).populate(leadPopulate).sort({ updatedAt: -1 })
      .skip((page - 1) * limit).limit(limit),
    Lead.countDocuments(filter)
  ]);
  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}

export const createLead = async (data, userId) => {
  return Lead.create({ ...data, createdBy: userId });
}

export const getLead = async (id) => {
  const lead = await Lead.findOne({ _id: id, isDeleted: false }).populate(leadPopulate);
  if (!lead) {
    const error = new Error('Lead not found');
    error.status = 404;
    throw error;
  }
  return lead;
}

export async function updateLead(id, data) {
  const lead = await Lead.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    new: true, runValidators: true
  }).populate(leadPopulate);
  if (!lead) {
    const error = new Error('Lead not found');
    error.status = 404;
    throw error;
  }
  return lead;
}

export async function deleteLead(id) {
  const lead = await Lead.findOneAndUpdate({ _id: id, isDeleted: false }, {
    isDeleted: true, deletedAt: new Date()
  }, { new: true });
  if (!lead) {
    const error = new Error('Lead not found');
    error.status = 404;
    throw error;
  }
  return { message: 'Lead deleted' };
}
