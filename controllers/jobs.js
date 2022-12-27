const getAllJobs = async (req, res) => {
  res.send('Get All Job');
};
const getJob = async (req, res) => {
  res.send('Get a Job');
};
const createJob = async (req, res) => {
  res.json(req.user);
};
const updateJob = async (req, res) => {
  res.send('Update a Job');
};
const deleteJob = async (req, res) => {
  res.send('Delete a Job');
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
