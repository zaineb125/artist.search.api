import { NextFunction, Request, Response } from "express";
import { ArtistService } from "../services/artistService";
import fs from "fs"
import { AppError } from "../../utils/errors/appError";

export class ArtistController {
  private artistServices: ArtistService;

  constructor() {
    this.artistServices = ArtistService.getInstance();
  }

  searchArtist = async (req: Request, res: Response, next: NextFunction) => {
    const { artist , limit , page} = req.query;

    if (!artist) {
      return next(new AppError("Artist name is required", 400));
    }

    try {
      const artistData = await this.artistServices.searchArtistOrRetrieveRandom(
        artist as string,
        limit as string , 
        page as string
      );
      return res.status(200).json(artistData);
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
  };

  downloadArtistsCsvFile = async (req: Request, res: Response, next: NextFunction) => {
    const { artist ,limit , page  } = req.query;

    if (!artist) {
      return next(new AppError("Artist name is required", 400));
    }

    const file_name = req.query.filename || "artists.csv";
    const csvExtensionFileName =
      file_name + (file_name.toString().endsWith(".csv") ? "" : ".csv");
    
    try {
      const response = await this.artistServices.downloadArtistsDataAsCsv(
        artist as string,
        csvExtensionFileName,
        limit as string , 
        page as string,
      );

    res.download(response, (err) => {
      if (err) {
        console.error("Failed to download the CSV file:", err);
        return next(new AppError("Failed to download the CSV file", 500));
      }
      fs.unlink(response, (error:any) => {
        if (error) {
          console.error("Failed to delete the CSV file:", error);
        } else {
          console.log("CSV file has been deleted");
        }
      });
    });
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
  };

  generateArtistNamesJsonFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.artistServices.generateRandomArtistNamesInJSON();
      return res.status(200).json(response);
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
  };
}