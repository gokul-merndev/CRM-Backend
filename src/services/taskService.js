import Task from '../models/Task.js';
import Lead from '../models/Lead.js';
import User from '../models/User.js';

const populateTask = [
  { path: 'lead', select: 'name status', match: { isDeleted: false } },
  { path: 'assignedTo', select: 'name email' },
  { path: 'createdBy', select: 'name email' }
];

export const listTasks = async () => {
  const items = await Task.find().populate(populateTask).sort({ dueDate: 1 });
  return items.filter((task) => task.lead);
}

export const getTask = async (id) => {
  const task = await Task.findById(id).populate(populateTask);
  if (!task || !task.lead) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }
  return task;
}

export const createTask = async (data, userId) => {
  const [lead, assignee] = await Promise.all([
    Lead.findOne({ _id: data.lead, isDeleted: false }),
    User.findById(data.assignedTo)
  ]);
  if (!lead) {
    const error = new Error('Active lead not found');
    error.status = 404;
    throw error;
  }
  if (!assignee) {
    const error = new Error('Assigned user not found');
    error.status = 404;
    throw error;
  }
  return Task.create({ ...data, createdBy: userId });
}

export const updateTaskStatus = async (id, status, user) => {
  const task = await Task.findById(id);
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }
  if (task.assignedTo.toString() !== user.id) {
    const error = new Error('Only the assigned user can update this task status');
    error.status = 403;
    throw error;
  }
  task.status = status;
  await task.save();
  return Task.findById(id).populate(populateTask);
}
