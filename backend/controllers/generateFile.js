import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ensureDirExists = async (dir) => {
  try {
    await fs.stat(dir);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dir, { recursive: true });
    } else {
      throw error;
    }
  }
};

const generateFile = async (content, basename, extension, directory) => {
  const filename = `${basename}${extension}`;
  const filepath = join(directory, filename);
  await ensureDirExists(directory);
  await fs.writeFile(filepath, content);
  return filepath;
};

export default generateFile;
