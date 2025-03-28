/* eslint-disable no-console */
import { readdir, readFile, writeFile, lstat, mkdir } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import readline from 'node:readline';
import { decompress } from 'sc-compression';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const outputDir = resolve('./output');

rl.question('Enter a file path or directory to decompress:\n> ', async (anyPath) => {
  try {
    await mkdir(outputDir, { recursive: true });
    const stat = await lstat(anyPath);

    if (stat.isFile()) {
      const filepath = resolve(anyPath);
      const buffer = await readFile(filepath);
      const decompressed = await decompress(buffer);
      const outputFile = resolve(outputDir, basename(filepath) + '.csv');
      await writeFile(outputFile, decompressed);
      console.log(`Successfully Decompressed to: ${outputFile}`);
    } else {
      const files = await readdir(anyPath);
      console.log(`Decompressing ${files.length} files from: ${anyPath}`);
      for (const file of files) {
        const filepath = resolve(anyPath, file);
        const buffer = await readFile(filepath);
        const decompressed = await decompress(buffer);
        const outputFile = resolve(outputDir, file + '.csv');
        await writeFile(outputFile, decompressed);
        console.log(`Successfully Saved: ${outputFile}`);
      }
    }
  } catch (error) {
    console.error('Error during decompression:', error.message);
  } finally {
    rl.close();
    process.exit(0);
  }
});
