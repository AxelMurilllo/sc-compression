# Clash of Clans Data Extractor (Fork of Sc Compression)
This is a modified fork of sc-compression, tailored specifically for decompressing Clash of Clans game asset files for use in data projects, tooling, and analysis.
This version adds support for:

- Outputting decompressed files to a separate output/ directory instead of overwriting original files

- An interactive CLI tool to select a file or directory to decompress

- Cleaner project layout for integration into pipelines (e.g., JSON/SQL conversion)

This module is intended to compress and decompress Supercell assets.  
✨ Supported Signatures:


| signature | description | decompression | compression |
| --- | --- |:---:|:---:|
| `none` | non-compressed file | ✔️| ✔️|
| `lzma` | starts with bytes 0x5d0000 | ✔️| ✔️|
| `sc` | starts with "SC" | ✔️| ✔️|
| `sclz` | starts with "SC" and contains "SCLZ" | ✔️| ✔️|
| `sig` | starts with "Sig:" | ✔️| ✔️ 🚩 |
| `sc2` | starts with "SC" and contains "START" | ✔️| |
| `zstd` | contains 0x28b52ffd | ✔️| |


The module automatically infers the right signature when `decompress` is called.
## Install
`npm install sc-compression`
## API Reference
### `decompress(buffer)`
Decompress a file buffer.
- `buffer` <Buffer\> A compressed file that was read into a Node.js Buffer
- Returns: <Promise<Buffer\>\> A decompressed file buffer that can be written to disk

### `compress(buffer, signature)`
Compress a file buffer.
- `buffer` <Buffer\> A file that was read into a Node.js Buffer
- `signature` <string\> `'lzma'`, `'sc'`, `'sclz'` or `'sig'`. It is impossible to recompress an `sig` file with a valid hash, so attempting to load an `sig` file in an unpatched game client will crash.
- Returns: <Promise<Buffer\>\> A compressed file buffer that can be written to disk

### `readSignature(buffer)`
Read a compressed file signature.
- `buffer` <Buffer\> A compressed file that was read into a Node.js Buffer
- Returns: <string\> The file signature

## Example
```js
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { decompress } from 'sc-compression';

const inputPath = './assets/logic';
const outputPath = './output';
await mkdir(outputPath, { recursive: true });

const files = await readdir('inputPath');
for (const file of files) {
    const filepath = resolve(inputPath, file);
    const buffer = await readFile(inputPath);
    const decompressed = await decompress(buffer);
    await writeFile(resolve(outputPath, file + '.csv'), decompressed);
}
```
See tests for additional implementation examples.

## 🧪 Step-by-Step (For Non-Developers)

1. ✅ Install [Node.js](https://nodejs.org/en/)
2. ✅ Open a terminal and run:
   ```bash
   npm install -g sc-compression
   ```
3. ✅ Clone this repository or download `examples/decompress.mjs`
4. ✅ Run the script (within the same directory as decompress.mjs):
   ```bash
   node decompress.mjs
   ```
5. ✅ When prompted, paste the full path to the folder containing game files (e.g., `C:/Users/you/Desktop/resources/assets/logic`)
6. ✅ Check the `output/` folder for decompressed `.csv` files
  
## 🚀 Ideal Use Cases:

- Clash of Clans API and tooling extensions

- Game data analysis (buildings, upgrades, units)

- Exporting balance data to JSON, PostgreSQL, or spreadsheets

Thanks for making this tool! I was struggling to get game data!
