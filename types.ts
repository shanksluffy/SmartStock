
export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  timestamp: string;
}

export interface StockLeader {
  symbol: string;
  name: string;
  reason: string;
  marketCap?: string;
}

export interface FundRecommendation {
  name: string;
  code: string;
  description: string;
}

export interface SectorInsight {
  sector: string;
  trend: string;
  summary: string;
  news: NewsItem[];
  leaders: StockLeader[];
  funds: FundRecommendation[];
  groundingSources: Array<{title: string, uri: string}>;
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
}
