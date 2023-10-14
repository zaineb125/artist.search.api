import express from "express";
import { ArtistController } from "../controllers/artistController";

const artistRoutes = express.Router();

let artistController = new ArtistController();

artistRoutes.route("/search").get(artistController.searchArtist);
artistRoutes.route("/generateJson").get(artistController.generateArtistNamesJsonFile);
artistRoutes.route("/csvDownload").get(artistController.downloadArtistsCsvFile);

export { artistRoutes };
