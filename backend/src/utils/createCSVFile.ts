import { createObjectCsvWriter } from 'csv-writer';

export async function createCSVFile(data: any[], filePath: string) {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'id', title: 'Id' },
      { id: 'shortUrl', title: 'Short URL' },
      { id: 'isClicked', title: 'Is clicked' },
      { id: 'updatedAt', title: 'Clicked at' },
    ],
  });

  await csvWriter.writeRecords(data);
}
