/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { createSurveyDto, updateSurveyDto, extractUrlDto } from './dto';

@Injectable()
export class SurveyService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  getAllSurveys(userId: number) {
    return this.prisma.form.findMany({
      where: {
        createdBy: userId,
      },
    });
  }

  getSurveyById(userId: number, surveyId: number) {
    return this.prisma.form.findFirst({
      where: {
        id: surveyId,
        createdBy: userId,
      },
    });
  }

  async createSurvey(userId: number, dto: createSurveyDto) {
    const user = this.prisma.surveyor.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ForbiddenException();
    }
    const form = await this.prisma.form.create({
      data: {
        createdBy: userId,
        title: dto.title,
      },
    });

    return { id: form.id };
  }

  async updateSurveyById(dto: updateSurveyDto) {
    const form = await this.prisma.form.update({
      where: {
        id: parseInt(dto.formId),
      },
      data: {
        title: dto.title,
      },
    });
    return form;
  }

  async deleteSurveyById(userId: number, surveyId: number) {
    const form = await this.prisma.form.findUnique({
      where: {
        id: surveyId,
      },
    });

    // check if user owns the bookmark
    if (!form || form.createdBy !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.form.delete({
      where: {
        id: surveyId,
      },
    });
  }

  async extractCss(dto: extractUrlDto) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const extractCss = require('get-css');
    const data = await extractCss(dto.url);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const extractor = require('css-color-extractor');
    const options = {
      colorFormat: 'hexString',
    };
    const extractedColors = extractor.fromCss(data.css, options);

    // Color Sorting
    const distances = [];
    for (let i = 0; i < extractedColors.length; i++) {
      distances[i] = [];
      for (let j = 0; j < i; j++)
        distances.push([
          extractedColors[i],
          extractedColors[j],
          this.colorDistance(extractedColors[i], extractedColors[j]),
        ]);
    }
    distances.sort(function (a, b) {
      return a[2] - b[2];
    });

    // Put each color into separate cluster initially
    const colorToCluster = {};
    for (let i = 0; i < extractedColors.length; i++)
      colorToCluster[extractedColors[i]] = [extractedColors[i]];

    // Merge clusters, starting with lowest distances
    let lastCluster;
    for (let i = 0; i < distances.length; i++) {
      const color1 = distances[i][0];
      const color2 = distances[i][1];
      const cluster1 = colorToCluster[color1];
      const cluster2 = colorToCluster[color2];
      if (!cluster1 || !cluster2 || cluster1 == cluster2) continue;

      // Make sure color1 is at the end of its cluster and
      // color2 at the beginning.
      if (color1 != cluster1[cluster1.length - 1]) cluster1.reverse();
      if (color2 != cluster2[0]) cluster2.reverse();

      // Merge cluster2 into cluster1
      cluster1.push(...cluster2);
      delete colorToCluster[color1];
      delete colorToCluster[color2];
      colorToCluster[cluster1[0]] = cluster1;
      colorToCluster[cluster1[cluster1.length - 1]] = cluster1;
      lastCluster = cluster1;
    }

    // By now all colors should be in one cluster
    // return lastCluster;
    return { colors: lastCluster };
  }

  colorDistance(color1, color2) {
    // This is actually the square of the distance but
    // this doesn't matter for sorting.
    let result = 0;
    for (let i = 0; i < color1.length; i++)
      result += (color1[i] - color2[i]) * (color1[i] - color2[i]);
    return result;
  }

  // sortColors(colors) {
  //   // Calculate distance between each color
  //   const distances = [];
  //   for (let i = 0; i < colors.length; i++) {
  //     distances[i] = [];
  //     for (let j = 0; j < i; j++)
  //       distances.push([
  //         colors[i],
  //         colors[j],
  //         this.colorDistance(colors[i], colors[j]),
  //       ]);
  //   }
  //   distances.sort(function (a, b) {
  //     return a[2] - b[2];
  //   });

  //   // Put each color into separate cluster initially
  //   const colorToCluster = {};
  //   for (let i = 0; i < colors.length; i++)
  //     colorToCluster[colors[i]] = [colors[i]];

  //   // Merge clusters, starting with lowest distances
  //   let lastCluster;
  //   for (let i = 0; i < distances.length; i++) {
  //     const color1 = distances[i][0];
  //     const color2 = distances[i][1];
  //     const cluster1 = colorToCluster[color1];
  //     const cluster2 = colorToCluster[color2];
  //     if (!cluster1 || !cluster2 || cluster1 == cluster2) continue;

  //     // Make sure color1 is at the end of its cluster and
  //     // color2 at the beginning.
  //     if (color1 != cluster1[cluster1.length - 1]) cluster1.reverse();
  //     if (color2 != cluster2[0]) cluster2.reverse();

  //     // Merge cluster2 into cluster1
  //     cluster1.push.apply(cluster1, cluster2);
  //     delete colorToCluster[color1];
  //     delete colorToCluster[color2];
  //     colorToCluster[cluster1[0]] = cluster1;
  //     colorToCluster[cluster1[cluster1.length - 1]] = cluster1;
  //     lastCluster = cluster1;
  //   }

  //   // By now all colors should be in one cluster
  //   return lastCluster;
  // }
}
