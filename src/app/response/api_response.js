export default function(req, res, next) {
  if (!res.finished) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    if (!req.route) {
      res.status(404);
      res.json({ success: false, message: 'Route not found.' });
    } else {
      let json = { success: true };

      if (req.results) {
        json.results = req.results;
      }

      if (req.opts_return) {
        json = Object.assign(json, req.opts_return);
      }

      if (req.return) {
        if (Array.isArray(req.return)) json.items = req.return;
        else json.item = req.return;
      }

      res.status(req.status || 200);
      res.json(json);
    }
  }

  return next();
}
