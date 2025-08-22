export interface BidType {
  id: number;
  name: string;
  score: number;
}

interface IBid {
  id: number;
  bidTypeIds: number[];
  isRed: boolean | undefined;
}

export interface Bid extends IBid {
  name: string;
  score: string;
}

export interface SilentBid {
  id: number;
  name: string;
  score: number;
}

export const BID_TYPES: BidType[] = [
  { id: 1, name: "Parti", score: 1 },
  { id: 2, name: "40-100", score: 4 },
  { id: 3, name: "Négy ász", score: 4 },
  { id: 4, name: "Ulti", score: 4 },
  { id: 5, name: "Betli", score: 5 },
  { id: 6, name: "Durchmars", score: 6 },
  { id: 7, name: "Színnélküli durchmars", score: 6 },
  { id: 8, name: "20-100", score: 8 },
  { id: 9, name: "Rebetli", score: 10 },
  { id: 10, name: "Terített durchmars", score: 12 },
  { id: 11, name: "Redurchmars (szín nélküli)", score: 12 },
  { id: 12, name: "Terített betli", score: 20 },
  { id: 13, name: "Terített színnélküli durchmars", score: 24 },
];

const BIDS_DEFAULT: IBid[] = [
  { id: 1, bidTypeIds: [1], isRed: false }, // passz
  { id: 2, bidTypeIds: [1], isRed: true }, // piros passz
  { id: 3, bidTypeIds: [2], isRed: false }, // 40-100
  { id: 4, bidTypeIds: [3, 1], isRed: false }, // négy ász + parti
  { id: 5, bidTypeIds: [4, 1], isRed: false }, // ulti + parti
  { id: 6, bidTypeIds: [5], isRed: undefined }, // betli
  { id: 7, bidTypeIds: [6], isRed: false }, // színes durchmars
  { id: 8, bidTypeIds: [7], isRed: undefined }, // színnélküli durchmars
  { id: 9, bidTypeIds: [2, 3], isRed: false }, // 40-100 4 ász
  { id: 10, bidTypeIds: [2, 4], isRed: false }, // 40-100 ulti
  { id: 11, bidTypeIds: [2], isRed: true }, // piros 40-100
  { id: 12, bidTypeIds: [8], isRed: false }, // 20-100
  { id: 13, bidTypeIds: [4, 3, 1], isRed: false }, // ulti négy ász + parti
  { id: 14, bidTypeIds: [3, 1], isRed: true }, // piros négy ász + parti
  { id: 15, bidTypeIds: [4, 1], isRed: true }, // piros ulti + parti
  { id: 16, bidTypeIds: [2, 6], isRed: false }, // 40-100 durchmars
  { id: 17, bidTypeIds: [4, 6], isRed: false }, // ulti durchmars
  { id: 18, bidTypeIds: [9], isRed: undefined }, // rebetli
  { id: 19, bidTypeIds: [2, 4, 3], isRed: false }, // 40-100 ulti négy ász
  { id: 20, bidTypeIds: [8, 3], isRed: false }, // 20-100 négy ász
  { id: 21, bidTypeIds: [8, 4], isRed: false }, // 20-100 ulti
  { id: 22, bidTypeIds: [6], isRed: true }, // piros durchmars
  { id: 23, bidTypeIds: [9], isRed: false }, // színes terített durchmars
  { id: 24, bidTypeIds: [8], isRed: undefined }, // színnélküli redurchmars
  { id: 25, bidTypeIds: [2, 4, 6], isRed: false }, // 40-100 ulti durchmars
  { id: 26, bidTypeIds: [8, 6], isRed: false }, // 20-100 durchmars
  { id: 27, bidTypeIds: [8, 4, 3], isRed: false }, // 20-100 ulti négy ász
  { id: 28, bidTypeIds: [2, 10], isRed: false }, // 40-100 terített durchmars
  { id: 29, bidTypeIds: [4, 10], isRed: false }, // ulti terített durchmars
  { id: 30, bidTypeIds: [2, 3], isRed: true }, // piros 40-100 négy ász
  { id: 31, bidTypeIds: [2, 4], isRed: true }, // piros 40-100 ulti
  { id: 32, bidTypeIds: [2], isRed: true }, // piros 20-100
  { id: 33, bidTypeIds: [4, 3], isRed: true }, // piros ulti négy ász
  { id: 34, bidTypeIds: [8, 4, 6], isRed: false }, // 20-100 ulti durchmars
  { id: 35, bidTypeIds: [2, 4, 10], isRed: false }, // 40-100 ulti terített durchmars
  { id: 36, bidTypeIds: [8, 10], isRed: false }, // 20-100 terített durchmars
  { id: 37, bidTypeIds: [2, 6], isRed: true }, // piros 40-100 durchmars
  { id: 38, bidTypeIds: [4, 6], isRed: true }, // piros ulti durchmars
  { id: 39, bidTypeIds: [10], isRed: false }, // terített betli
  { id: 40, bidTypeIds: [8, 4, 10], isRed: false }, // 20-100 ulti terített durchmars
  { id: 41, bidTypeIds: [2, 4, 3], isRed: true }, // piros 40-100 ulti négy ász
  { id: 42, bidTypeIds: [8, 3], isRed: true }, // piros 20-100 négy ász
  { id: 43, bidTypeIds: [8, 4], isRed: true }, // piros 20-100 ulti
  { id: 44, bidTypeIds: [10], isRed: true }, // piros terített durchmars
  { id: 45, bidTypeIds: [13], isRed: undefined }, // színnélküli terített durchmars
  { id: 46, bidTypeIds: [2, 4, 6], isRed: true }, // piros 40-100 ulti durchmars
  { id: 47, bidTypeIds: [8, 6], isRed: true }, // piros 20-100 durchmars
  { id: 48, bidTypeIds: [8, 4, 3], isRed: true }, // piros 20-100 ulti négy ász
  { id: 49, bidTypeIds: [3, 10], isRed: true }, // piros 20-100 terített durchmars
  { id: 50, bidTypeIds: [4, 10], isRed: true }, // piros ulti terített durchmars
  { id: 51, bidTypeIds: [8, 4, 6], isRed: true }, // piros 20-100 ulti durchmars
  { id: 52, bidTypeIds: [3, 4, 10], isRed: true }, // piros 40-100 ulti terített durchmars
  { id: 53, bidTypeIds: [8, 10], isRed: true }, // piros 20-100 terített durchmars
  { id: 54, bidTypeIds: [8, 4, 10], isRed: true }, // piros 20-100 ulti terített durchmars
];

export const SILENT_BIDS: SilentBid[] = [
  { id: 1, name: "100", score: 2 },
  { id: 2, name: "Négy Ász", score: 2 },
  { id: 3, name: "Ulti", score: 2 },
  { id: 4, name: "Durchmars", score: 3 },
];

const decorateBid = (bid: IBid): Bid => {
  const BID_TYPE_ORDER = [
    "20-100",
    "40-100",
    "Ulti",
    "Négy ász",
    "Durchmars",
    "Parti",
    "Terített durchmars",
  ];
  const bidTypes = bid.bidTypeIds.map((id) => {
    const bidType = BID_TYPES.find((bt) => bt.id === id);
    if (!bidType) {
      console.warn("Invalid bid type ID:", id);
      return null;
    }
    return bidType;
  });

  const sortedBidTypes = bidTypes.sort((a, b) => {
    const aIndex = BID_TYPE_ORDER.indexOf(a?.name!);
    const bIndex = BID_TYPE_ORDER.indexOf(b?.name!);
    return aIndex - bIndex;
  });

  const bidTypeNames = sortedBidTypes.map((bt) => bt?.name!);
  const customName = bid.isRed
    ? `Piros ${bidTypeNames.join(" - ")}`
    : bidTypeNames.join(" - ");

  // Calculate score based on bid types as a string (e.g., "4 + 2")
  const score = bid.bidTypeIds.reduce((total, id) => {
    const bidType = BID_TYPES.find((bt) => bt.id === id);
    return total + (bidType ? bidType.score : 0);
  }, 0);

  return {
    id: bid.id,
    bidTypeIds: bid.bidTypeIds,
    isRed: bid.isRed,
    name: customName,
    score: score.toString(), // Convert score to string for consistency
  };
};

export const BIDS: Bid[] = BIDS_DEFAULT.map(decorateBid);
export function getBidScore(Bid: Bid): number {
  return Bid.bidTypeIds.reduce((total, id) => {
    const bidType = BID_TYPES.find((bt) => bt.id === id);
    return total + (bidType ? bidType.score : 0);
  }, 0);
}
