exports.adminEndpoint = (req, res) => {
  res.send('Admin access granted!');
};

exports.viewerEndpoint = (req, res) => {
  res.send('Viewer access granted!');
};
