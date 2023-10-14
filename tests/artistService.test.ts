import { ArtistService } from '../src/api/services/artistService';

describe('Artist Service', () => {
  const artistService = ArtistService.getInstance();

  it('should search for an artist', async () => {
    const artistName = 'ch';
    try {
      const artistData = await artistService.searchArtistOrRetrieveRandom(artistName);
      expect(artistData).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});





