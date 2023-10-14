import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import { ArtistRepository } from '../repositories/artistRepository';
import { Artist } from "../models/artistModel";
import { AppError } from "../../utils/errors/appError";
import { OUTPUT_PATH } from "../../utils/constants/constants";

export class ArtistService {
  private artistRepository: ArtistRepository;
  private static instance: ArtistService;

  private constructor () {
    this.artistRepository = ArtistRepository.getInstance();
  }

  static getInstance () {
    if (!ArtistService.instance) {
      ArtistService.instance = new ArtistService();
    }
    return ArtistService.instance;
  }

  // Main function to search for an artist, with a fallback mechanism
  searchArtistOrRetrieveRandom = async (artistName: string, limit: string = "30", page: string = "1") => {
    try {
      let artistData = await this.retrieveArtistByName(artistName, limit, page);

      // Fallback mechanism if artist not found
      if (!artistData.results.artistmatches.artist.length) {
        const randomArtistName = await this.getRandomArtistNameFromJSONFile();
        artistData= await this.retrieveArtistByName(randomArtistName, limit, page);
      }

      return artistData.results.artistmatches.artist;
    } catch (error: any) {
      throw new AppError("Failed to search artist with fallback", 500);
    }
  }

  // Function to get a random artist name from a JSON file
  getRandomArtistNameFromJSONFile = async () => {
    try {

      if (!fs.existsSync(OUTPUT_PATH)) {
        const res =await this.generateRandomArtistNamesInJSON();
      }

      const artistNamesJSON = fs.readFileSync(OUTPUT_PATH);
      const artistNames = JSON.parse(artistNamesJSON.toString());

      const randomIndex = Math.floor(Math.random() * artistNames.length);
      const randomArtistName = artistNames[randomIndex];

      return randomArtistName;
    } catch (error: any) {
      throw new AppError("Failed to get random artist name from JSON file", 500);
    }
  }

  // Function to get an artist by name
  retrieveArtistByName=async (artistName: string, limit: string = "30", page: string = "1")=> {
    try {
      return await this.artistRepository.getArtistByName(artistName, limit, page);
    } catch (error: any) {
      throw new AppError("Failed to get artist by name", 500);
    }
  }

  // Function to download artists' data in CSV format
  downloadArtistsDataAsCsv= async(artistName: string, filename: string, limit: string = "30", page: string = "1")=> {
    try {
      const artistData = await this.searchArtistOrRetrieveRandom(artistName, limit, page);
      
      const records = artistData.map((artist: any) => {
        const artistInstance = new Artist(artist.name, artist.mbid, artist.url, artist.image);
        return artistInstance.convertToArtistDto();
      });
      
      const csvWriter = createObjectCsvWriter({
        path: filename,
        header: [
          { id: "name", title: "Name" },
          { id: "mbid", title: "MBID" },
          { id: "url", title: "URL" },
          { id: "image_small", title: "Image_Small" },
          { id: "image", title: "Image" },
        ],
      });
      
      await csvWriter.writeRecords(records);
      
      return filename;
    } catch (error: any) {
      throw new AppError("Failed to download artists CSV", 500);
    }
  }

 // Function to generate random artist names and store them in a JSON file
  generateRandomArtistNamesInJSON = async () => {
    // Define the alphabet and the number of requests to make
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const numberOfRequests = 3;
    let artistNames = new Set<string>();

    try {
      // Iterate over a set number of requests to retrieve artist names
      for (let i = 0; i < numberOfRequests; i++) {
        // Select a random letter from the alphabet
        const randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        // Retrieve artist data based on the random letter
        const artistData = await this.retrieveArtistByName(randomLetter);

        // Extract and store the artist names from the retrieved data
        const names = artistData.results.artistmatches.artist.map((artist: any) => artist.name);
        names.forEach((name: string) => artistNames.add(name));
      }
      // Convert the set of artist names to JSON and write it to a file
      const jsonContent = JSON.stringify(Array.from(artistNames));
      fs.writeFileSync(OUTPUT_PATH, jsonContent);

      return { message: "Data written to JSON file" };
    } catch (error) {
      // Throw an error if any issue occurs during the process
      throw new AppError("Internal server error", 500);
    }
};

}