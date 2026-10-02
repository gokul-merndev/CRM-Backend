import * as companies from '../services/companyService.js';

export const list = async function (req, res, next) {
  try {
    res.json(await companies.listCompanies(req.validatedQuery));
  } catch (error) {
    next(error);
  }
}
export const create = async function (req, res, next) {
  try {
    res.status(201).json(await companies.createCompany(req.body, req.user.id));
  } catch (error) {
    next(error);
  }
}
export const get = async function (req, res, next) {
  try {
    res.json(await companies.getCompany(req.validatedParams.id));
  } catch (error) {
    next(error);
  }
}
