import User from '../models/User.js';

export const list = async (req, res, next) => {
  try {
    const items = await User.find().select('name email role').sort({ name: 1 });
    res.json({ items });
  } catch (error) {
    next(error);
  }
}
