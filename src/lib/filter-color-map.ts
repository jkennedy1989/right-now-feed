import { FilterColor } from '@/types';

export const FILTER_COLORS: Record<string, FilterColor> = {
  'open-now': {
    bg: 'bg-green-100',
    marker: '#22c55e',
    text: 'text-green-800',
    border: 'border-green-300',
  },
  'quick-bites': {
    bg: 'bg-orange-100',
    marker: '#f97316',
    text: 'text-orange-800',
    border: 'border-orange-300',
  },
  coffee: {
    bg: 'bg-amber-100',
    marker: '#d97706',
    text: 'text-amber-800',
    border: 'border-amber-300',
  },
  patio: {
    bg: 'bg-sky-100',
    marker: '#0ea5e9',
    text: 'text-sky-800',
    border: 'border-sky-300',
  },
  trending: {
    bg: 'bg-rose-100',
    marker: '#e11d48',
    text: 'text-rose-800',
    border: 'border-rose-300',
  },
  'late-night': {
    bg: 'bg-purple-100',
    marker: '#9333ea',
    text: 'text-purple-800',
    border: 'border-purple-300',
  },
  deals: {
    bg: 'bg-yellow-100',
    marker: '#eab308',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
  },
  'cozy-indoor': {
    bg: 'bg-indigo-100',
    marker: '#6366f1',
    text: 'text-indigo-800',
    border: 'border-indigo-300',
  },
  breakfast: {
    bg: 'bg-amber-100',
    marker: '#f59e0b',
    text: 'text-amber-800',
    border: 'border-amber-300',
  },
  lunch: {
    bg: 'bg-emerald-100',
    marker: '#10b981',
    text: 'text-emerald-800',
    border: 'border-emerald-300',
  },
  dinner: {
    bg: 'bg-violet-100',
    marker: '#8b5cf6',
    text: 'text-violet-800',
    border: 'border-violet-300',
  },
  reservations: {
    bg: 'bg-blue-100',
    marker: '#3b82f6',
    text: 'text-blue-800',
    border: 'border-blue-300',
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
