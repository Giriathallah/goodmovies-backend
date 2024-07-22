import Watchlist from "../models/Watchlist.js";

const WatchlistController = {
  create: async (req, res) => {
    const {
      movie_id,
      movie_name,
      movie_poster_url,
      year,
      vote_average,
      userId,
    } = req.body;

    try {
      const watchlist = await Watchlist.create({
        movie_id,
        movie_name,
        movie_poster_url,
        year,
        vote_average,
        userId,
      });
      res.status(201).json(watchlist);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const watchlists = await Watchlist.findAll({ where: { userId } });
      res.status(200).json(watchlists);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteList: async (req, res) => {
    const { userId, movie_id } = req.body;

    try {
      const watchlist = await Watchlist.findOne({
        where: { userId, movie_id },
      });
      if (!watchlist) {
        return res.status(404).json({ message: "Watchlist entry not found" });
      }

      await watchlist.destroy();
      res.status(200).json({ message: "Watchlist entry deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default WatchlistController;
