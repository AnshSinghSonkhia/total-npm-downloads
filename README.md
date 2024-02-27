# total-npm-downloads
Track the total package downloads of any NPM package from its launch date to today's date.

<code><img height="30" src="https://img.shields.io/badge/NPM-111111?style=for-the-badge&logo=npm&logoColor=#c63635"></code>
<code><img height="30" src="https://img.shields.io/badge/JavaScript-111111?style=for-the-badge&logo=javascript&logoColor=F7DF1E"></code>


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
