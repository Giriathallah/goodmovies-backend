import User from "./User.js";
import Watchlist from "./Watchlist.js";

// Associations
User.hasMany(Watchlist, { foreignKey: "userId", as: "watchlists" });
Watchlist.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Watchlist };
