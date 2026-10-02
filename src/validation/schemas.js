import Joi from 'joi';

const objectId = Joi.string().hex().length(24);
const envelope = (body = Joi.object().default({}), query = Joi.object().default({}), params = Joi.object().default({})) =>
  Joi.object({ body, query, params });

export const loginSchema = envelope(Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required()
}).required());

const leadFields = {
  name: Joi.string().trim().min(2).max(100),
  email: Joi.string().email({ tlds: { allow: false } }).allow(''),
  phone: Joi.string().trim().max(30).allow(''),
  status: Joi.string().valid('New', 'Contacted', 'Qualified', 'Lost'),
  assignedTo: objectId.allow(null, ''),
  company: objectId.allow(null, '')
};
export const createLeadSchema = envelope(Joi.object({
  name: leadFields.name.required(), email: leadFields.email,
  phone: leadFields.phone, status: leadFields.status,
  assignedTo: leadFields.assignedTo, company: leadFields.company
}).required());
export const updateLeadSchema = envelope(Joi.object(leadFields).min(1).required(), Joi.object().default({}), Joi.object({ id: objectId.required() }).required());
export const leadListSchema = envelope(Joi.object().default({}), Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow('').default(''),
  status: Joi.string().valid('New', 'Contacted', 'Qualified', 'Lost').allow('')
}).default({}), Joi.object().default({}));
export const idSchema = envelope(Joi.object().default({}), Joi.object().default({}), Joi.object({ id: objectId.required() }).required());

export const companySchema = envelope(Joi.object({
  name: Joi.string().trim().min(2).max(120).required(),
  industry: Joi.string().trim().max(100).allow('').default(''),
  location: Joi.string().trim().max(120).allow('').default(''),
  website: Joi.string().uri().allow('').default('')
}).required());
export const companyListSchema = envelope(Joi.object().default({}), Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(100),
  search: Joi.string().allow('').default('')
}).default({}), Joi.object().default({}));
export const taskSchema = envelope(Joi.object({
  title: Joi.string().trim().min(2).max(160).required(),
  description: Joi.string().trim().max(1000).allow('').default(''),
  lead: objectId.required(),
  assignedTo: objectId.required(),
  dueDate: Joi.date().iso().required()
}).required());
export const taskStatusSchema = envelope(Joi.object({
  status: Joi.string().valid('Pending', 'In Progress', 'Completed').required()
}).required(), Joi.object().default({}), Joi.object({ id: objectId.required() }).required());
