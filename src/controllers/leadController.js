import * as leads from '../services/leadService.js';

export const list = async function (req, res, next) {
  try {
    res.json(await leads.listLeads(req.validatedQuery));
  } catch (error) {
    next(error);
  }
}
export const create = async function (req, res, next) {
  try {
    res.status(201).json(await leads.createLead(req.body, req.user.id));
  } catch (error) {
    next(error);
  }
}
export const get = async function (req, res, next) {
  try {
    res.json(await leads.getLead(req.validatedParams.id));
  } catch (error) {
    next(error);
  }
}
export const update = async function (req, res, next) {
  try {
    res.json(await leads.updateLead(req.validatedParams.id, req.body));
  } catch (error) {
    next(error);
  }
}
export const remove = async function (req, res, next) {
  try {
    res.json(await leads.deleteLead(req.validatedParams.id));
  } catch (error) {
    next(error);
  }
}
