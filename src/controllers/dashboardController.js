import { getDashboard } from '../services/dashboardService.js';

export const summary = async function (req, res, next) {
  try {
    res.json(await getDashboard());
  } catch (error) {
    next(error);
  }
}
