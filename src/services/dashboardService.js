import Lead from '../models/Lead.js';
import Task from '../models/Task.js';

export const getDashboard = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const [totalLeads, qualifiedLeads, tasksDueToday, completedTasks] = await Promise.all([
    Lead.countDocuments({ isDeleted: false }),
    Lead.countDocuments({ isDeleted: false, status: 'Qualified' }),
    Task.countDocuments({ dueDate: { $gte: start, $lt: end }, status: { $ne: 'Completed' } }),
    Task.countDocuments({ status: 'Completed' })
  ]);
  return { totalLeads, qualifiedLeads, tasksDueToday, completedTasks };
}
