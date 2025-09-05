// cesty podle tvé struktury: /lib/prices.ts
export const PRICE_MAP: Record<
  string,
  { name: string; amountCZK: number; description?: string; rank: string }
> = {
  '6414884': { name: 'Knight Rank',  amountCZK: 70,  description: 'VIP Knight Rank',  rank: 'knight' },
  '6824767': { name: 'Lord Rank',    amountCZK: 90,  description: 'VIP Lord Rank',    rank: 'lord' },
  '6824769': { name: 'Paladin Rank', amountCZK: 110, description: 'VIP Paladin Rank', rank: 'paladin' },
  '6824773': { name: 'Duke Rank',    amountCZK: 130, description: 'VIP Duke Rank',    rank: 'duke' },
  '6824777': { name: 'King Rank',    amountCZK: 170, description: 'VIP King Rank',    rank: 'king' },
}
