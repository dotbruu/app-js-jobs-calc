const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/jobUtils');

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let jobTotalHours = 0;

    const updateJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);

      const status = remaining <= 0 ? 'done' : 'progress';

      statusCount[status] += 1;

      status === 'progress'
        ? (jobTotalHours += Number(job['daily-hours']))
        : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile['value-hour']),
      };
    });

    const freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render('index', {
      jobs: updateJobs,
      profile,
      statusCount,
      freeHours,
    });
  },
};
