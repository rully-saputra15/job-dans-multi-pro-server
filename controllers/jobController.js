const axios = require("axios");

class JobController {
  static async getAll(req, res, next) {
    try {
      const { description, location, full_time, page } = req.query;
      const condition = [];

      if (description) condition.push(`description=${description}`);
      if (location) condition.push(`location=${location}`);
      if (full_time) condition.push(`full_time=${full_time}`);
      if (page) condition.push(`page=${page}`);

      const { data } = await axios.get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?${condition.join(
          "&"
        )}`
      );

      res.status(200).json({
        statusCode: 200,
        message: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getJobById(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios.get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
      );
      res.status(200).json({
        statusCode: 200,
        message: data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = JobController;
