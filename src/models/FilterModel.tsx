import { Expose} from 'class-transformer';

export class  FilterFormData {
    item_type?: string;
    marka?: string;
    model?: string;
    version?: string;
    price?: Range;
    year?: Range;
    km?: Range;
    colors?: string[]; // better enum
    location?: string;

    @Expose({ name: 'vehicleCaseType' }) // making opposite now because couldn't find a solution
    vehicle_case_type?: string; // better enum or dynamic like model
    
    @Expose({ name: 'fuelType' }) // making opposite now because couldn't find a solution
    fuel_type?: string[]; // better enum

    @Expose({ name: 'gearType' }) // making opposite now because couldn't find a solution
    gear_type?: string[]; // better enum

    @Expose({ name: 'horsePower' }) // making opposite now because couldn't find a solution
    horse_power?: Range;

    @Expose({ name: 'engineCapacity' }) // making opposite now because couldn't find a solution
    engine_capacity?: Range;

    @Expose({ name: 'producedCountry' }) // making opposite now because couldn't find a solution
    produced_country?: String; // better enum and in future it should be string enum array


    imported?: boolean;
    damaged?: boolean;
    @Expose({ name: 'isUsed' }) // making opposite now because couldn't find a solution
    is_used?: boolean;
    registered?: boolean; // should be added to catalog and filter services
    @Expose({ name: 'withPhoto' }) // making opposite now because couldn't find a solution
    with_photo?: boolean; // 
}

export interface Range {
    start?: number;
    end?: number;
}
