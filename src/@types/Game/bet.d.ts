export interface BetVm {
    timeframe: number
    betId: number
    userAddress: string
    betType: number
    currency: string
    amount: number
    potentialReward: number
    roundId: number
    lockPrice: number
    lockedAt: string
    points: number[]
    lineColorGreen: boolean
}
