export const paginate = (limit) => {
  return function(req, res, next) {
    req.limit = parseInt(limit, 10) || 20;
    req.page = parseInt(req.query.page, 10) || 1;
    req.offset = (req.page - 1) * req.limit;

    req.opts_return = {
      limit: req.limit,
      page: req.page,
      offset: req.offset,
    };

    return next();
  };
};
