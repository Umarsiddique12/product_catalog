const mongoose = require('mongoose');

const parseCursor = (cursor) => {
  if (!cursor) {
    return null;
  }

  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);

    if (!parsed.updatedAt || !parsed._id) {
      return null;
    }

    return {
      updatedAt: new Date(parsed.updatedAt),
      _id: new mongoose.Types.ObjectId(parsed._id)
    };
  } catch (error) {
    return null;
  }
};

const createCursor = (updatedAt, _id) => {
  const payload = {
    updatedAt: updatedAt.toISOString(),
    _id: _id.toString()
  };

  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

module.exports = {
  parseCursor,
  createCursor
};
