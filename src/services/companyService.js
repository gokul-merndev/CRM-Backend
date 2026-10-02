import Company from '../models/Company.js';
import Lead from '../models/Lead.js';

export const listCompanies = async ({ page = 1, limit = 100, search = '' }) => {
  const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
  const [items, total] = await Promise.all([
    Company.find(filter).sort({ name: 1 }).skip((page - 1) * limit).limit(limit),
    Company.countDocuments(filter)
  ]);
  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}

export const createCompany = async (data, userId) => {
  return Company.create({ ...data, createdBy: userId });
}

export const getCompany = async (id) => {
  const company = await Company.findById(id);
  if (!company) {
    const error = new Error('Company not found');
    error.status = 404;
    throw error;
  }
  const leads = await Lead.find({ company: id, isDeleted: false })
    .populate('assignedTo', 'name email').sort({ updatedAt: -1 });
  return { company, leads };
}
