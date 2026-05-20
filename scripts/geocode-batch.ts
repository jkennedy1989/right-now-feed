import * as fs from 'fs';
import * as path from 'path';

const API_KEY = 'AIzaSyAFmLX-Y8zUAsm0ONHWigvnYrRQIi8rvmg';
const BATCH_SIZE = 10;
const DELAY_MS = 200;

interface CuratedBusiness {
  id: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  category: string;
  buzzFactor: string;
  michelinStatus: string | null;
  hook: string;
  address: string;
  city: 'la' | 'sf' | 'toronto';
  location: { lat: number; lng: number };
}

const CITY_SUFFIX: Record<string, string> = {
  la: ', Los Angeles, CA',
  sf: ', San Francisco, CA',
  toronto: ', Toronto, ON, Canada',
};

async function geocodeAddress(address: string, city: string): Promise<{ lat: number; lng: number } | null> {
  const fullAddress = address + CITY_SUFFIX[city];
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === 'OK' && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    }
    return null;
  } catch {
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function processCity(cityFile: string) {
  const filePath = path.resolve(__dirname, '../src/data', cityFile);
  const businesses: CuratedBusiness[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const city = cityFile.replace('.json', '');

  let geocoded = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < businesses.length; i += BATCH_SIZE) {
    const batch = businesses.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (biz) => {
      if (biz.location.lat !== 0 && biz.location.lng !== 0) {
        skipped++;
        return;
      }
      const coords = await geocodeAddress(biz.address, city);
      if (coords) {
        biz.location = coords;
        geocoded++;
      } else {
        failed++;
        console.warn(`  Failed: ${biz.name} @ ${biz.address}`);
      }
    });

    await Promise.all(promises);
    await sleep(DELAY_MS);

    if ((i + BATCH_SIZE) % 100 === 0 || i + BATCH_SIZE >= businesses.length) {
      console.log(`  ${city}: ${i + BATCH_SIZE}/${businesses.length} processed (${geocoded} geocoded, ${skipped} skipped, ${failed} failed)`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(businesses, null, 2));
  console.log(`  ${city}: Complete. ${geocoded} geocoded, ${failed} failed, ${skipped} skipped.\n`);
}

async function main() {
  console.log('Geocoding all cities...\n');
  for (const city of ['la.json', 'sf.json', 'toronto.json']) {
    console.log(`Processing ${city}...`);
    await processCity(city);
  }
  console.log('All done!');
}

main();
