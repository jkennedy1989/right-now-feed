import { FilterColor } from '@/types';

export const FILTER_COLORS: Record<string, FilterColor> = {
  all: {
    bg: 'bg-white',
    marker: '#6b7280',
    text: 'text-gray-900',
    border: 'border-gray-400',
  },
  breakfast: {
    bg: 'bg-amber-100',
    marker: '#f59e0b',
    text: 'text-amber-800',
    border: 'border-amber-300',
  },
  coffee: {
    bg: 'bg-orange-100',
    marker: '#d97706',
    text: 'text-orange-800',
    border: 'border-orange-300',
  },
  reservations: {
    bg: 'bg-red-100',
    marker: '#E00707',
    text: 'text-red-800',
    border: 'border-red-300',
  },
  deals: {
    bg: 'bg-emerald-100',
    marker: '#10b981',
    text: 'text-emerald-800',
    border: 'border-emerald-300',
  },
  trending: {
    bg: 'bg-rose-100',
    marker: '#e11d48',
    text: 'text-rose-800',
    border: 'border-rose-300',
  },
  patio: {
    bg: 'bg-sky-100',
    marker: '#0ea5e9',
    text: 'text-sky-800',
    border: 'border-sky-300',
  },
  'cozy-indoor': {
    bg: 'bg-indigo-100',
    marker: '#6366f1',
    text: 'text-indigo-800',
    border: 'border-indigo-300',
  },
  neighborhood: {
    bg: 'bg-teal-100',
    marker: '#14b8a6',
    text: 'text-teal-800',
    border: 'border-teal-300',
  },
  cuisine: {
    bg: 'bg-pink-100',
    marker: '#ec4899',
    text: 'text-pink-800',
    border: 'border-pink-300',
  },
  'late-night': {
    bg: 'bg-purple-100',
    marker: '#9333ea',
    text: 'text-purple-800',
    border: 'border-purple-300',
  },
  dinner: {
    bg: 'bg-violet-100',
    marker: '#8b5cf6',
    text: 'text-violet-800',
    border: 'border-violet-300',
  },
  lunch: {
    bg: 'bg-lime-100',
    marker: '#84cc16',
    text: 'text-lime-800',
    border: 'border-lime-300',
  },
  michelin: {
    bg: 'bg-red-100',
    marker: '#dc2626',
    text: 'text-red-800',
    border: 'border-red-300',
  },
  default: {
    bg: 'bg-gray-100',
    marker: '#6b7280',
    text: 'text-gray-800',
    border: 'border-gray-300',
  },
};

export function getFilterColor(category: string): FilterColor {
  return FILTER_COLORS[category] || FILTER_COLORS.default;
}
