
import { Sector } from './types';

export const SECTORS: Sector[] = [
  { id: 'all', name: '市场概览', icon: '📊' },
  { id: 'tech', name: '科技与AI', icon: '💻' },
  { id: 'energy', name: '新能源', icon: '🔋' },
  { id: 'finance', name: '金融地产', icon: '🏦' },
  { id: 'healthcare', name: '生物医疗', icon: '🏥' },
  { id: 'consumer', name: '消费白酒', icon: '🛒' },
  { id: 'semiconductor', name: '半导体', icon: '🔬' }
];

export const APP_THEME = {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
  background: '#0f172a',
  card: '#1e293b'
};
