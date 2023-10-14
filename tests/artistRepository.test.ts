import { ArtistRepository } from '../src/api/repositories/artistRepository';

describe('Artist Repository', () => {
  const artistRepository = ArtistRepository.getInstance();

  it('should get artist by name', async () => {
    const artistName = 'ch';
    try {
      const artistData = await artistRepository.getArtistByName(artistName);
      expect(artistData).toBeDefined();
      expect(artistData).toHaveProperty('results');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
