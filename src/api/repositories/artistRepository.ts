import axios from 'axios';
import { LAST_FM_API_URL } from '../../utils/constants/constants';

export class ArtistRepository {
  private static instance: ArtistRepository;

  static getInstance() {
    if (!ArtistRepository.instance) {
      ArtistRepository.instance = new ArtistRepository();
    }
    return ArtistRepository.instance;
  }

  getArtistByName = async (artist: string, limit: string = "30", page: string = "1") => {
    try {
      const response = await axios.get(LAST_FM_API_URL, {
        params: {
          method: 'artist.search',
          artist,
          limit,
          page,
          api_key: process.env.API_KEY,
          format: 'json',
        },
      });
      return response.data;
    } catch (error:any) {
      throw new Error('Failed to get artist by name: ' + error.message);
    }
  }
  
}
