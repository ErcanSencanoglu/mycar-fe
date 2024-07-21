export interface BrandModel {
    // id: string;
    name: string;
    models: Model[];
}
   
export interface Model {
    //id: string;
    name: string;
    versions: Version[];
}
   
export interface Version {
    //id: string;
    name: string;
}
   
