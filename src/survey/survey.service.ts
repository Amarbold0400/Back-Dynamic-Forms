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
        surveyorId: userId,
      },
      include: {
        questions: true,
        results: true,
      },
    });
  }

  // getSurveyById(userId: number, surveyId: number) {
  getSurveyById(surveyId: number) {
    return this.prisma.form.findFirst({
      where: {
        id: surveyId,
        // surveyorId: userId,
      },
      include: {
        questions: true,
        results: true,
        css: true,
      },
    });
  }

  async createSurvey(userId: number) {
    const form = await this.prisma.form.create({
      data: {
        title: 'Untitled',
        surveyorId: userId,
        questions: {
          create: {
            type: 'TextInput',
            text: 'Enter label here...',
            order: 1,
          },
        },
      },
      include: {
        surveyor: true,
        questions: true,
      },
    });
    await this.prisma.style.create({
      data: {
        formId: form.id,
        themeButtonBackground: '#000000',
        themeButtonBorderColor: '#000000',
        themeButtonColor: '#FFFFFF',
        themeFormGroupBackgroundColor: '#404040',
        themeFormGroupBackgroundHoverColor: '#969696',
        themeFormGroupBorderColor: '#808080',
        themeFormGroupBorderHoverColor: '#969696',
        themeFormGroupBorderStyle: 'solid',
        themeFormGroupBorderWidth: 'thin',
        themeGlobalBackgroundColor: 'black',
        themeGlobalFontColor: '#777777',
        themeGlobalFontFamily: 'Arial',
        themeGlobalFontSize: '16',
        themeGlobalLinkColor: '#206C92',
        themeHelpTextColor: '#cccccc',
        themeHelpTextFontSize: '12',
        themeHelpTextMarginTop: '10',
        themeInputBorderColor: '#dcdfe6',
        themeInputBorderRadius: '4',
        themeInputFocusBorderColor: '#000000',
        themeInputHoverBorderColor: '#c0c4cc',
        themeInputShadowColor: '#9D9D9D',
        themeLabelFontSize: '16',
        themeLabelFontWeight: '500',
        themeLabelMarginBottom: '10px',
        themePrimaryColor: '#FFFFFF',
      },
    });
    return form;
  }

  async updateSurveyById(dto: updateSurveyDto, userId: number) {
    // Attempt 3
    await this.prisma.style.upsert({
      where: {
        formId: dto.formId,
      },
      update: {
        themeButtonBackground: dto.css.themeButtonBackground,
        themeButtonBorderColor: dto.css.themeButtonBorderColor,
        themeButtonColor: dto.css.themeButtonColor,
        themeFormGroupBackgroundColor: dto.css.themeFormGroupBackgroundColor,
        themeFormGroupBackgroundHoverColor:
          dto.css.themeFormGroupBackgroundHoverColor,
        themeFormGroupBorderColor: dto.css.themeFormGroupBorderColor,
        themeFormGroupBorderHoverColor: dto.css.themeFormGroupBorderHoverColor,
        themeFormGroupBorderStyle: dto.css.themeFormGroupBorderStyle,
        themeFormGroupBorderWidth: dto.css.themeFormGroupBorderWidth,
        themeGlobalBackgroundColor: dto.css.themeGlobalBackgroundColor,
        themeGlobalFontColor: dto.css.themeGlobalFontColor,
        themeGlobalFontFamily: dto.css.themeGlobalFontFamily,
        themeGlobalFontSize: dto.css.themeGlobalFontSize,
        themeGlobalLinkColor: dto.css.themeGlobalLinkColor,
        themeHelpTextColor: dto.css.themeHelpTextColor,
        themeHelpTextFontSize: dto.css.themeHelpTextFontSize,
        themeHelpTextMarginTop: dto.css.themeHelpTextMarginTop,
        themeInputBorderColor: dto.css.themeInputBorderColor,
        themeInputBorderRadius: dto.css.themeInputBorderRadius,
        themeInputFocusBorderColor: dto.css.themeInputFocusBorderColor,
        themeInputHoverBorderColor: dto.css.themeInputHoverBorderColor,
        themeInputShadowColor: dto.css.themeInputShadowColor,
        themeLabelFontSize: dto.css.themeLabelFontSize,
        themeLabelFontWeight: dto.css.themeLabelFontWeight,
        themeLabelMarginBottom: dto.css.themeLabelMarginBottom,
        themePrimaryColor: dto.css.themePrimaryColor,
      },
      create: {
        formId: dto.formId,
        themeButtonBackground: dto.css.themeButtonBackground,
        themeButtonBorderColor: dto.css.themeButtonBorderColor,
        themeButtonColor: dto.css.themeButtonColor,
        themeFormGroupBackgroundColor: dto.css.themeFormGroupBackgroundColor,
        themeFormGroupBackgroundHoverColor:
          dto.css.themeFormGroupBackgroundHoverColor,
        themeFormGroupBorderColor: dto.css.themeFormGroupBorderColor,
        themeFormGroupBorderHoverColor: dto.css.themeFormGroupBorderHoverColor,
        themeFormGroupBorderStyle: dto.css.themeFormGroupBorderStyle,
        themeFormGroupBorderWidth: dto.css.themeFormGroupBorderWidth,
        themeGlobalBackgroundColor: dto.css.themeGlobalBackgroundColor,
        themeGlobalFontColor: dto.css.themeGlobalFontColor,
        themeGlobalFontFamily: dto.css.themeGlobalFontFamily,
        themeGlobalFontSize: dto.css.themeGlobalFontSize,
        themeGlobalLinkColor: dto.css.themeGlobalLinkColor,
        themeHelpTextColor: dto.css.themeHelpTextColor,
        themeHelpTextFontSize: dto.css.themeHelpTextFontSize,
        themeHelpTextMarginTop: dto.css.themeHelpTextMarginTop,
        themeInputBorderColor: dto.css.themeInputBorderColor,
        themeInputBorderRadius: dto.css.themeInputBorderRadius,
        themeInputFocusBorderColor: dto.css.themeInputFocusBorderColor,
        themeInputHoverBorderColor: dto.css.themeInputHoverBorderColor,
        themeInputShadowColor: dto.css.themeInputShadowColor,
        themeLabelFontSize: dto.css.themeLabelFontSize,
        themeLabelFontWeight: dto.css.themeLabelFontWeight,
        themeLabelMarginBottom: dto.css.themeLabelMarginBottom,
        themePrimaryColor: dto.css.themePrimaryColor,
      },
    });
    let question = await this.prisma.question.findFirst({
      where: {
        formId: dto.formId,
      },
    });
    const update = await this.prisma.form.update({
      where: {
        id: dto.formId,
      },
      data: {
        title: dto.title,
        questions: {
          deleteMany: {},
          createMany: {
            data: [...dto.questions],
          },
        },
      },
      include: {
        questions: true,
        css: true,
      },
    });

    console.log(update);
    return update;
  }

  async deleteSurveyById(userId: number, surveyId: number) {
    // const form = await this.prisma.form.findUnique({
    //   where: {
    //     id: surveyId,
    //   },
    // });

    // check if user owns the bookmark
    // if (!form || form.surveyorId !== userId)
    //   throw new ForbiddenException('Access to resources denied');

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

    return { colors: lastCluster };
  }

  colorDistance(color1, color2) {
    let result = 0;
    for (let i = 0; i < color1.length; i++)
      result += (color1[i] - color2[i]) * (color1[i] - color2[i]);
    return result;
  }
}
