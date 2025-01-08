import fs from 'fs';
import path from 'path';

const filePath = 'data/data.json';
const dir = path.dirname(filePath);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });  // Cria a pasta, incluindo subpastas
}

export const updateJson = (data: any) => {
  
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
          console.error('An errer as occorred while tryng to save json File:', err);
        } else {
          console.log('Json file suscessfully saved!');
        }
      });
}