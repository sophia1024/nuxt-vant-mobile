// Authentication related constants and types

export interface AuthLoginResponse {
  access_token: string
  expires_in: number
  hasRegister: boolean
  age: number
}

export interface UserInfo {
  userId: string
  userName: string
  nickName: string
  email: string
  phonenumber: string
  firstName: string
  lastName: string
  career: string
  country: string
  birthDate: string
  avatar: string
  backImg: string
  hasValid: boolean
}

export interface UserBalance {
  balance: string
  background: string
  avatar: string
  userName: string
  nickName: string
  hasFollow: boolean
  hasShippingAddress: boolean
}

export interface UserStatistics {
  works: {
    hasOpen: boolean
    totalCount: number
    dynamicCount: number
    longCount: number
    reelsCount: number
  }
  followers: {
    hasOpen: boolean
    totalCount: number
  }
  following: {
    hasOpen: boolean
    totalCount: number
  }
  getLikes: {
    hasOpen: boolean
    totalCount: number
  }
  ownerPointFlow: {
    hasOpen: boolean
    totalCount: number
  }
  reviews: {
    hasOpen: boolean
    totalCount: number
    evaluateCount: number
    replyCount: number
  }
  reservation: {
    hasOpen: boolean
    totalCount: number
    reservedCount: number
    expireCount: number
    awardsCount: number
  }
  collection: {
    hasOpen: boolean
    totalCount: number
    productCollectionCount: number
    storeCollectionCount: number
    activityCollectionCount: number
  }
  sharing: {
    hasOpen: boolean
    totalCount: number
    storeSharedCount: number
    productSharedCount: number
  }
  like: {
    hasOpen: boolean
    totalCount: number
    likesProductNum: number
    likesEvaluateNum: number
  }
  report: {
    hasOpen: boolean
    totalCount: number
    accepted: number
    accepting: number
  }
  afterSale: {
    hasOpen: boolean
    totalCount: number
  }
  prize: {
    hasOpen: boolean
    totalCount: number
  }
}

export interface PointsRule {
  pointsRuleId: string
  ruleCode: string
  ruleName: string
  pointsValue: number
  maxTimes: number | null
  timesPerDay: number
  maxPointsValue: number
  operate: number
  enable: boolean
  remainderTimesPerDay: number
  ruleCategory: string
  ruleCategoryDesc: string
}

// Country codes for registration
export const COUNTRY_CODES = [
  { code: 'GBR', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'USA', name: 'United States', flag: '🇺🇸' },
  { code: 'CHN', name: 'China', flag: '🇨🇳' },
  { code: 'JPN', name: 'Japan', flag: '🇯🇵' },
  { code: 'DEU', name: 'Germany', flag: '🇩🇪' },
  { code: 'FRA', name: 'France', flag: '🇫🇷' },
  { code: 'ITA', name: 'Italy', flag: '🇮🇹' },
  { code: 'ESP', name: 'Spain', flag: '🇪🇸' },
  { code: 'CAN', name: 'Canada', flag: '🇨🇦' },
  { code: 'AUS', name: 'Australia', flag: '🇦🇺' },
] as const

export const DEFAULT_COUNTRY = COUNTRY_CODES[0] // GBR

// Age ranges for registration
export const AGE_RANGES = [
  { value: 18, label: '18' },
  { value: 21, label: '21' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 35, label: '35' },
  { value: 40, label: '40' },
  { value: 45, label: '45' },
  { value: 50, label: '50+' },
] as const

// Mock user data - 完全按照API返回格式
export const MOCK_USER_INFO: UserInfo = {
  userId: '1811717715434524672',
  userName: '1029051qef4',
  nickName: '102BHmmJ',
  email: '1029051@gmail.com',
  phonenumber: '5154514524154',
  firstName: 'sdgsdfas',
  lastName: 'gfdsgsdfa',
  career: 'asdfgsdfas',
  country: 'United Kingdom',
  birthDate: '1966-10-01 00:00:00',
  avatar: '',
  backImg: '',
  hasValid: false,
}

export const MOCK_USER_BALANCE: UserBalance = {
  balance: '153',
  background: '',
  avatar: '',
  userName: '1029051qef4',
  nickName: '102BHmmJ',
  hasFollow: false,
  hasShippingAddress: false,
}

export const MOCK_USER_STATISTICS: UserStatistics = {
  works: {
    hasOpen: true,
    totalCount: 12,
    dynamicCount: 2,
    longCount: 1,
    reelsCount: 9,
  },
  followers: {
    hasOpen: true,
    totalCount: 0,
  },
  following: {
    hasOpen: true,
    totalCount: 0,
  },
  getLikes: {
    hasOpen: true,
    totalCount: 0,
  },
  ownerPointFlow: {
    hasOpen: true,
    totalCount: 25,
  },
  reviews: {
    hasOpen: true,
    totalCount: 3,
    evaluateCount: 3,
    replyCount: 0,
  },
  reservation: {
    hasOpen: true,
    totalCount: 6,
    reservedCount: 0,
    expireCount: 3,
    awardsCount: 3,
  },
  collection: {
    hasOpen: true,
    totalCount: 1,
    productCollectionCount: 0,
    storeCollectionCount: 0,
    activityCollectionCount: 1,
  },
  sharing: {
    hasOpen: true,
    totalCount: 0,
    storeSharedCount: 0,
    productSharedCount: 0,
  },
  like: {
    hasOpen: true,
    totalCount: 0,
    likesProductNum: 0,
    likesEvaluateNum: 0,
  },
  report: {
    hasOpen: true,
    totalCount: 0,
    accepted: 0,
    accepting: 0,
  },
  afterSale: {
    hasOpen: true,
    totalCount: 0,
  },
  prize: {
    hasOpen: true,
    totalCount: 3,
  },
}
