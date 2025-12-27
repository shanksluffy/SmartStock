
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import InsightDashboard from './components/InsightDashboard';
import { geminiService } from './services/geminiService';
import { Sector, SectorInsight } from './types';
import { SECTORS } from './constants';

const App: React.FC = () => {
  const [activeSector, setActiveSector] = useState<Sector>(SECTORS[0]);
  const [insight, setInsight] = useState<SectorInsight | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(async (sector: Sector) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await geminiService.getSectorInsight(sector.name);
      setInsight(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch insights. Please check your API key.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsight(activeSector);
  }, [activeSector, fetchInsight]);

  const handleSelectSector = (sector: Sector) => {
    setActiveSector(sector);
  };

  return (
    <Layout activeSectorId={activeSector.id} onSelectSector={handleSelectSector}>
      {error ? (
        <div className="mt-20 text-center">
          <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-3xl max-w-lg mx-auto">
            <div className="text-rose-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-rose-400 mb-2">获取信息失败</h3>
            <p className="text-slate-400 mb-6">{error}</p>
            <button 
              onClick={() => fetchInsight(activeSector)}
              className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-colors font-medium"
            >
              重试
            </button>
          </div>
        </div>
      ) : (
        <InsightDashboard 
          insight={insight as SectorInsight} 
          isLoading={isLoading} 
        />
      )}
      
      {/* Floating Refresh Button */}
      <button 
        onClick={() => fetchInsight(activeSector)}
        disabled={isLoading}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50 z-50`}
      >
        <svg className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </Layout>
  );
};

export default App;
