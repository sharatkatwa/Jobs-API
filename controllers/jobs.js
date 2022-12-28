const Job = require('../models/Job');
const StatusCodes = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({
    status: 'success',
    count: jobs.length,
    jobs,
  });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ status: 'success', job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ status: 'success', job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === '' || position === '' || !position || !company) {
    throw new BadRequestError('company and position cannot be empty');
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ status: 'success', job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const deletedJob = await Job.findByIdAndDelete({ _id: jobId });

  if (!deletedJob) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.NO_CONTENT).json({ status: 'deleted' });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
