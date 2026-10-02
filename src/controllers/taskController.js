import * as tasks from '../services/taskService.js';

export const list = async function (req, res, next) {
  try {
    res.json({ items: await tasks.listTasks() });
  } catch (error) {
    next(error);
  }
}
export const create = async function (req, res, next) {
  try {
    res.status(201).json(await tasks.createTask(req.body, req.user.id));
  } catch (error) {
    next(error);
  }
}
export const get = async function (req, res, next) {
  try {
    res.json(await tasks.getTask(req.validatedParams.id));
  } catch (error) {
    next(error);
  }
}
export const updateStatus = async function (req, res, next) {
  try {
    res.json(await tasks.updateTaskStatus(req.validatedParams.id, req.body.status, req.user));
  } catch (error) {
    next(error);
  }
}
