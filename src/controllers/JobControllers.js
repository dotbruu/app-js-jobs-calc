const Job = require('../model/Job');
const JobUtils = require('../utils/jobUtils');
const Profile = require('../model/Profile');

module.exports = {
  async save(req, res) {
    try {
      await Job.create({ ...req.body, created_at: Date.now() });

      return res.redirect('/');
    } catch (err) {
      console.error('Save error in JobController', err);
      return res.redirect('/404');
    }
  },
  create(req, res) {
    return res.render('job');
  },
  async show(req, res) {
    const jobs = await Job.get();

    const jobId = req.params.id;

    const job = jobs.find(({ id }) => Number(id) === Number(jobId));

    if (!job) return res.redirect('/404');

    const profile = await Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile['value-hour']);

    return res.render('job-edit', { job });
  },

  async update(req, res) {
    try {
      const jobId = req.params.id;

      const updatedJob = {
        name: req.body.name,
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours'],
      };

      await Job.update(updatedJob, jobId);

      res.redirect('/job/' + jobId);
    } catch (err) {
      console.log('Update error in JobController', err);
      return res.redirect('/404');
    }
  },

  async delete(req, res) {
    try {
      const jobId = req.params.id;

      await Job.delete(jobId);

      return res.redirect('/');
    } catch (err) {
      console.log('Delete error in JobController', err);
      res.redirect('/404');
    }
  },
};
