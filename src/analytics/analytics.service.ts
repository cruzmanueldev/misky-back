import { Injectable } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { ConfigService } from '@nestjs/config';


const dayjs = require('dayjs');
require('dayjs/locale/es');
dayjs.locale('es');


@Injectable()
export class AnalyticsService {

  constructor(private configService: ConfigService) {}
  
  private analytics = new BetaAnalyticsDataClient({
    keyFilename: 'config/google/google-key.json',
  });

  async getNewUsersToday() {

    const propertyId = `properties/${this.configService.get('GOOGLE_ANALYTICS_ID')}`;

    const [response] = await this.analytics.runReport({
      property: propertyId,
      dateRanges: [{ startDate: '5daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'newUsers' },
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    const results =
      response.rows?.map((row) => {
        const dateStr = row.dimensionValues?.[0]?.value;
        const date = dayjs(dateStr, 'YYYYMMDD');

        return {
          date: date.format('dddd, DD MMMM'),
          newUsers: Number(row.metricValues?.[0]?.value ?? 0),
          activeUsers: Number(row.metricValues?.[1]?.value ?? 0),
          pageViews: Number(row.metricValues?.[2]?.value ?? 0),
        };
      }) ?? [];

    const totals = {
      totalNewUsers: results.reduce((sum, r) => sum + r.newUsers, 0),
      totalActiveUsers: results.reduce((sum, r) => sum + r.activeUsers, 0),
      totalPageViews: results.reduce((sum, r) => sum + r.pageViews, 0),
    };

    return { totals, days: results };
  }
}
