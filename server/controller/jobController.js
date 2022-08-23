
module.exports = {
  create : async (req, res) => {
    res.send('create a job')
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