const Jobs = require('../db/Jobs');

module.exports = {
  create : async (req, res) => {
    const {position, company, jobLocation, description} = req.body;
    if (!position || !company || !jobLocation || !description) {
      throw Error('Please provide all values')
    }
    req.body.createdBy = req.user.userId;
    const job = await Jobs.create(req.body)
    res.status(201).json({job})
  },

   getAll : async (req, res) => {
    res.send('get all jobs')
  },

   update : async (req, res) => {
    res.send('update a job')
  },

   remove : async (req, res) => {
    res.send('delete a job')
  },

   showStats : async (req, res) => {
    res.send('show stats')
  }
}