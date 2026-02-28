export interface Item {
    id: string
    item_type: string
    title?: string
    description?: string
    color?: string
    photos?: string[]
    videoUrl?: string
    price?: number
    location?: string
    advertisementDates: AdvertisementDates
    isUsed?: boolean
    imported?: boolean
    damaged?: boolean
    year?: number
    km?: number
    marka?: string
    model?: string
    version?: string
    vehicleCaseType?: string
    fuelType?: string
    gearType?: string
    producedCountry?: string
    power?: number
    firstRegistrationDate?: string
    registrationNumber?: string
    vinNumber?: string
    doorCount?: number
  }
  
  export interface AdvertisementDates {
    endDate: string
    highlighToday?: boolean
  }
  