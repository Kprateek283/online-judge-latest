import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dirCodes = path.join(__dirname, 'testCases');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (content) => {
    const Id = uuid();
    const fileName = `${Id}.json`;
    const filePath = path.join(dirCodes, fileName);
    const contentString = JSON.stringify(content); // Convert object to string
    fs.writeFileSync(filePath, contentString);
    return filePath;
};

export default generateFile;