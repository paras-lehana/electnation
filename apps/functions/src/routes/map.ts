import { Router } from 'express';
import { z } from 'zod';
import { GoogleMapsClient } from '@yatra/core/google';

// Create a singleton instance or use dependency injection in a real app
const getMapsClient = () => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  return new GoogleMapsClient({ apiKey });
};

export const mapRouter = (): Router => {
  const r = Router();

  r.get('/map/nearest-facilities', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);

      if (isNaN(lat) || isNaN(lng)) {
        res.status(400).json({ error: { message: 'Invalid lat/lng parameters' } });
        return;
      }

      const client = getMapsClient();
      if (!process.env.GOOGLE_MAPS_API_KEY) {
         // Fallback dummy data if no key is present
         res.json({
            status: 'ok',
            booth: { lat: 28.612, lng: 77.21, name: 'Dummy Polling Booth', distanceMeters: 1200 },
            ero: { lat: 28.615, lng: 77.215, name: 'Dummy ERO Office', distanceMeters: 2500 }
         });
         return;
      }

      const origins = [`${lat},${lng}`];
      // In a real app, these would come from a database query of nearby booths
      const destinations = ['28.612,77.21', '28.615,77.215']; 

      const result = await client.distanceMatrix(origins, destinations);
      
      if (!result.ok) {
        res.status(500).json({ error: { message: result.error.message } });
        return;
      }

      res.json({
        status: 'ok',
        data: result.value,
      });
    } catch (error) {
      res.status(500).json({ error: { message: 'Internal server error' } });
    }
  });

  return r;
};
