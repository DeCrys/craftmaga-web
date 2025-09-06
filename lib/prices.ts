
// cesty podle tvé struktury: /lib/prices.ts
export const PRICE_MAP: Record<
  string,
  { name: string; amountCZK: number; description?: string; rank: string }
> = {
  '6414884': { name: 'VIP Rank',  amountCZK: 70,  description: 'VIP Knight Rank',  rank: 'vip' },
  '6824767': { name: 'LEGEND Rank',    amountCZK: 90,  description: 'VIP Lord Rank',    rank: 'legend' },
  '6824769': { name: 'ULTRA Rank', amountCZK: 110, description: 'VIP Paladin Rank', rank: 'ultra' },
  '6824773': { name: 'GOD Rank',    amountCZK: 130, description: 'VIP Duke Rank',    rank: 'god' },
  '6824777': { name: 'IMMORTAL Rank',    amountCZK: 170, description: 'VIP King Rank',    rank: 'immortal' },
}

