export const errorApi = (err) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  return { status: 500, message: 'An internal error occured.' };
};

export const formatResponse = (res) => {
  return { status: 400, message: res };
};

export const itemNotFound = () => {
  return { status: 404, message: 'Resource not found.' };
};
