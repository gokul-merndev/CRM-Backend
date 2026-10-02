import { login } from '../services/authService.js';

export const loginUser = async function (req, res, next) {
  try {
    res.json(await login(req.body));
  } catch (error) {
    next(error);
  }
}

export const currentUser = function (req, res) {
  res.json({ user: req.user });
}
