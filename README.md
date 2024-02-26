# total-npm-downloads

Track the total package downloads of any NPM package from its launch date to today's date.

# Installation

```shell
npm i total-npm-downloads
```

# Usage

### Replace the `package-name-to-check` to the NPM package name, you want know total downloads of.

```js
import getStats from 'total-npm-downloads';

async function getTotalDownloads(packageName) {
  try {
    const data = await getStats(packageName);
    console.log(`Total downloads of "${packageName}" package:`, data.downloads);
  } catch (error) {
    console.log('Error:', error);
  }
}

const packageName = 'package-name-to-check';
getTotalDownloads(packageName);
```

### Example usage:

```js
import getStats from 'total-npm-downloads';

async function getTotalDownloads(packageName) {
  try {
    const data = await getStats(packageName);
    console.log(`Total downloads of "${packageName}" package:`, data.downloads);
  } catch (error) {
    console.log('Error:', error);
  }
}

const packageName = 'uuid';
getTotalDownloads(packageName);

console.log(getTotalDownloads(packageName));
```