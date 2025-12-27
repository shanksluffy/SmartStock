
import React from 'react';
import { SectorInsight } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface InsightDashboardProps {
  insight: SectorInsight;
  isLoading: boolean;
}

// Mock chart data for visual appeal
const mockChartData = [
  { name: 'Mon', val: 4000 },
  { name: 'Tue', val: 3000 },
  { name: 'Wed', val: 2000 },
  { name: 'Thu', val: 2780 },
  { name: 'Fri', val: 1890 },
  { name: 'Sat', val: 2390 },
  { name: 'Sun', val: 3490 },
];

const InsightDashboard: React.FC<InsightDashboardProps> = ({ insight, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-slate-800 rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="h-64 bg-slate-800 rounded-2xl"></div>
            <div className="h-64 bg-slate-800 rounded-2xl"></div>
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-slate-800 rounded-2xl"></div>
            <div className="h-48 bg-slate-800 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const trendColor = insight.trend === 'bullish' ? 'text-emerald-400' : insight.trend === 'bearish' ? 'text-rose-400' : 'text-blue-400';
  const trendBg = insight.trend === 'bullish' ? 'bg-emerald-500/10 border-emerald-500/20' : insight.trend === 'bearish' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-blue-500/10 border-blue-500/20';

  return (
    <div className="space-y-8 pb-12">
      {/* Header Summary */}
      <section className={`p-6 md:p-8 rounded-3xl border ${trendBg} backdrop-blur-sm`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Sector Intelligence</span>
            <h2 className="text-3xl md:text-4xl font-bold">{insight.sector}</h2>
          </div>
          <div className={`px-4 py-2 rounded-xl border ${trendBg} flex items-center space-x-2`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${insight.trend === 'bullish' ? 'bg-emerald-400' : insight.trend === 'bearish' ? 'bg-rose-400' : 'bg-blue-400'}`}></span>
            <span className={`text-sm font-bold capitalize ${trendColor}`}>{insight.trend} Trend</span>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg max-w-3xl">
          {insight.summary}
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: News and Chart */}
        <div className="lg:col-span-2 space-y-8">
          {/* Market Overview Chart (Purely Visual) */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">板块热度指数</h3>
              <select className="bg-slate-800 border-none rounded-lg text-xs p-2 focus:ring-0">
                <option>过去7天</option>
                <option>过去30天</option>
              </select>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* News Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">核心资讯</h3>
              <span className="text-slate-500 text-xs">实时更新中</span>
            </div>
            <div className="space-y-4">
              {insight.news.map((item, idx) => (
                <div key={idx} className="bg-slate-900/40 hover:bg-slate-800/50 transition-all border border-slate-800/50 p-6 rounded-2xl group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-blue-500 uppercase px-2 py-0.5 bg-blue-500/10 rounded-md">{item.source}</span>
                    <span className="text-xs text-slate-500">{item.timestamp}</span>
                  </div>
                  <h4 className="text-lg font-semibold group-hover:text-blue-400 transition-colors mb-3 leading-snug">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  </h4>
                  <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="mt-4 flex items-center text-xs text-slate-500 hover:text-blue-400 transition-colors">
                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                     阅读详情
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Leaders and Funds */}
        <div className="space-y-8">
          {/* Leading Companies */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50">
              <h3 className="font-bold text-xl flex items-center">
                <span className="mr-2 text-yellow-500">🐉</span> 行业领头羊
              </h3>
            </div>
            <div className="divide-y divide-slate-800">
              {insight.leaders.map((leader, idx) => (
                <div key={idx} className="p-6 hover:bg-slate-800/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-blue-400">{leader.symbol}</span>
                    {leader.marketCap && <span className="text-[10px] text-slate-500">{leader.marketCap}</span>}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{leader.name}</h4>
                  <p className="text-xs text-slate-400 italic">“{leader.reason}”</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Funds */}
          <section className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold text-xl mb-6 flex items-center">
              <span className="mr-2 text-emerald-500">📊</span> 精选基金
            </h3>
            <div className="space-y-4">
              {insight.funds.map((fund, idx) => (
                <div key={idx} className="bg-slate-800/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-100">{fund.name}</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-mono">{fund.code}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {fund.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Grounding Sources */}
          {insight.groundingSources && insight.groundingSources.length > 0 && (
            <section className="bg-slate-900/40 rounded-2xl p-4 border border-slate-800">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">AI 数据引用</h4>
              <ul className="space-y-2">
                {insight.groundingSources.slice(0, 4).map((source, i) => (
                  <li key={i}>
                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-400 hover:text-blue-400 transition-colors block truncate">
                      • {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightDashboard;
