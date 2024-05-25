import { Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { uniqueId } from 'src/utils/generator';
import { PrismaService } from './prisma.service';
import { createCSVFile } from './utils/createCSVFile';
import { Response } from 'express';
import { getUrlWithUuid } from './utils/getCurrentUrl';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async createUrl(body?: string[], file?: Express.Multer.File) {
    try {
      const urls = body || [];
      const fileName = `short_links_${uniqueId()}.csv`;

      if (file) {
        const campaign = await this.prisma.campaign.create({
          data: {
            uuid: uniqueId(),
            fileName: file.filename,
          },
        });
        const tempFilePath = `uploads/${file.filename}`;
        const fileUrls: string[] = [];

        await new Promise((resolve, reject) => {
          fs.createReadStream(tempFilePath)
            .pipe(csvParser())
            .on('data', (data) => {
              const test: string[] = Object.keys(data);
              const values: string[] = Object.values(data);
              fileUrls.push(...values, ...test);
            })
            .on('end', async () => {
              fs.unlinkSync(tempFilePath);
              const uniqueArray = Array.from(new Set(fileUrls));

              const createdUrls = await Promise.all(
                uniqueArray.map(async (_, index) => {
                  if (index % 2 === 0) {
                    const originalUrl = uniqueArray[index + 1];
                    const id = uniqueArray[index];
                    const uuid = uniqueId();

                    return await this.prisma.url.create({
                      data: {
                        uuid: uuid,
                        id,
                        shortUrl: getUrlWithUuid(uuid),
                        originalUrl,
                        isClicked: false,
                        campaignUuid: campaign.uuid,
                      },
                    });
                  }
                }),
              );

              resolve(createdUrls);
            })
            .on('error', reject);
        });
        const data = await this.prisma.url.findMany({
          where: {
            campaignUuid: campaign.uuid,
          },
          select: {
            id: true,
            shortUrl: true,
            isClicked: true,
            updatedAt: true,
          },
        });

        await createCSVFile(data, tempFilePath);

        return campaign.uuid;
      } else {
        const campaign = await this.prisma.campaign.create({
          data: {
            fileName: fileName,
            uuid: uniqueId(),
          },
        });
        await Promise.all(
          urls.map(async (url, i) => {
            const id = `id${i + 1}`;
            const uuid = uniqueId();
            return await this.prisma.url.create({
              data: {
                uuid: uuid,
                id,
                shortUrl: getUrlWithUuid(uuid),
                originalUrl: url,
                isClicked: false,
                campaignUuid: campaign.uuid,
              },
            });
          }),
        );
        fs.writeFileSync(`uploads/${fileName}`, urls.join('\n'));

        const data = await this.prisma.url.findMany({
          where: {
            campaignUuid: campaign.uuid,
          },
          select: {
            id: true,
            shortUrl: true,
            isClicked: true,
            updatedAt: true,
          },
        });

        await createCSVFile(data, `uploads/${fileName}`);

        return campaign.uuid;
      }
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while creating the URLs');
    }
  }

  async getAllCampaigns() {
    const campaigns = await this.prisma.campaign.findMany({
      select: {
        uuid: true,
        fileName: true,
      },
    });

    return campaigns;
  }

  async findAllUrls(uuid: string, res: Response) {
    const link = await this.prisma.url.findUnique({
      where: {
        uuid,
      },
    });
    if (link) {
      await this.prisma.url.update({
        where: {
          uuid,
        },
        data: {
          isClicked: true,
        },
      });
      return res.redirect(link.originalUrl);
    } else {
      return res.status(404).send('Short URL not found');
    }
  }

  async downloadFile(camp_uuid: string, res: Response) {
    const campaign = await this.prisma.campaign.findUnique({
      where: {
        uuid: camp_uuid,
      },
    });

    fs.unlinkSync(`uploads/${campaign.fileName}`);

    const data = await this.prisma.url.findMany({
      where: {
        campaignUuid: campaign.uuid,
      },
      select: {
        id: true,
        shortUrl: true,
        isClicked: true,
        updatedAt: true,
      },
    });

    await createCSVFile(data, `uploads/${campaign.fileName}`);

    await res.download(
      `uploads/${campaign.fileName}`,
      campaign.fileName,
      (err) => {
        if (err) {
          throw new Error('An error occurred while downloading the file');
        }
      },
    );
  }
}
