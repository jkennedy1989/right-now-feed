import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

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

function slugify(name: string, neighborhood: string): string {
  return `${name}-${neighborhood}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseSheet(filePath: string, city: 'la' | 'sf' | 'toronto'): CuratedBusiness[] {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet);

  return rows.map((row) => {
    const name = row['Restaurant Name']?.trim() || '';
    const neighborhood = row['Neighborhood']?.trim() || '';
    const michelinRaw = row['Michelin / Bib Status']?.trim() || '';
    const isMichelin = michelinRaw.toLowerCase().includes('michelin') ||
      michelinRaw.toLowerCase().includes('bib gourmand') ||
      michelinRaw === 'Recommended';

    return {
      id: slugify(name, neighborhood),
      name,
      neighborhood,
      cuisine: row['Cuisine']?.trim() || '',
      category: row['Type/Category']?.trim() || '',
      buzzFactor: row['Source / Buzz Factor']?.trim() || '',
      michelinStatus: isMichelin ? michelinRaw : null,
      hook: row['Signature Dish / Vibe']?.trim() || '',
      address: row['Address / Cross Streets']?.trim() || '',
      city,
      location: { lat: 0, lng: 0 },
    };
  });
}

const files: { path: string; city: 'la' | 'sf' | 'toronto' }[] = [
  { path: path.resolve(__dirname, '../../Downloads/LA_County_500_Fresh_Trendy_Restaurants_2026.xlsx'), city: 'la' },
  { path: path.resolve(__dirname, '../../Downloads/SF_County_500_Fresh_Trendy_Restaurants_2026.xlsx'), city: 'sf' },
  { path: path.resolve(__dirname, '../../Downloads/Toronto_500_Fresh_Trendy_Restaurants_2026.xlsx'), city: 'toronto' },
];

const outputDir = path.resolve(__dirname, '../src/data');

for (const file of files) {
  console.log(`Processing ${file.city}...`);
  const businesses = parseSheet(file.path, file.city);
  const outputPath = path.join(outputDir, `${file.city}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(businesses, null, 2));
  console.log(`  Written ${businesses.length} businesses to ${outputPath}`);
}

console.log('Done! Run geocode-batch.ts next to add coordinates.');
