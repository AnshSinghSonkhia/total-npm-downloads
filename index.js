process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;  // remove before pushing to production

import path from 'path';
import fetch from 'node-fetch';
import flatcache from 'flat-cache';

async function getStats(pkg) {
  if (!pkg) {
    throw new Error('No package name specified');
  }

  // Assuming you have access to the package publish date
  // You need to replace 'publishDate' with the actual publish date of the package
  const publishDate = '2008-01-01'; // Example publish date
  const today = getDateRange();
  const timeframe = `${publishDate}:${today}`;

  let cache = flatcache.load('npm-downloads', path.resolve('./cache'));
  let key = getCacheKey(pkg, timeframe); // Include timeframe in cache key
  let cachedData = cache.getKey(key);
  if (cachedData) {
    return cachedData;
  }

  // console.log(`Fetching new npm download count for ${timeframe}...`);
  try {
    let res = await fetch(`https://api.npmjs.org/downloads/point/${timeframe}/${pkg}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    let json = await res.json();
    let newData = { downloads: json.downloads };
    cache.setKey(key, newData);
    cache.save();
    return newData;
  } catch (e) {
    console.log('Failed to fetch data:', e.message); // Log the actual error message
    return { downloads: 0 };
  }
}

function getCacheKey(pkg, timeframe) {
  let date = new Date();
  return `${pkg}-${timeframe}-${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

// async function run() {
//     try {
//       const data = await getStats({
//         pkg: 'multer',
//       });
//       console.log('Total downloads of "multer" package since publish date:', data.downloads);
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   }

function pad(num) {
  return `${num < 10 ? '0' : ''}${num}`;
}

function getDateRange(daysOffset) {
  let date = new Date();
  if (daysOffset) {
    date.setTime(date.getTime() + daysOffset * 1000 * 60 * 60 * 24);
  }
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

//run();

export default getStats;
