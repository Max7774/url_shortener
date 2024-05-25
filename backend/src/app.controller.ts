import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(200)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file?: Express.Multer.File,
    @Body() body?: string[],
  ) {
    return await this.appService.createUrl(body, file);
  }

  @Get('get-campaigns')
  async getAllCampaigns() {
    return await this.appService.getAllCampaigns();
  }

  @HttpCode(200)
  @Get(':uuid')
  async findAll(@Param('uuid') uuid: string, @Res() res: Response) {
    return await this.appService.findAllUrls(uuid, res);
  }

  @Get('get-file/:camp_uuid')
  async serveFile(
    @Param('camp_uuid') camp_uuid: string,
    @Res() res: Response,
  ): Promise<any> {
    return await this.appService.downloadFile(camp_uuid, res);
  }
}
