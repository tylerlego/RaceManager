namespace RaceSignup {
  export type RaceSignupParams = {
    firstName: string;
    lastName: string;
    desiredClass: CarClass;
    desiredCar: GTPModel | LMP2Model | GT3Model;
  }

  export type RaceSignupFormParams = {
    firstName: string;
    lastName: string;
    desiredClass: CarClass | '';
    desiredCar: GTPModel | LMP2Model | GT3Model | '';
  }

  export enum GTPModel {
    PORSCHE = 'Porsche 963 LMDH',
    CADILLAC = 'Cadillac V-Series.R',
    ACURA = 'Acura ARX-06 LMDH',
    BMW = 'BMW M-Hybrid V8',
  }
  
  export enum LMP2Model {
    DALARA = 'Dallara P217',
  }
  
  export enum GT3Model {
    FERARRI = 'Ferrari 296 GT3',
    MERCEDES = 'Mercedes-AMG GT3',
    PORSCHE = 'Porsche 911 GT3 R',
    AUDI = 'Audi R8 LMS GT3',
    BMW = 'BMW M4 GT3',
  }
  
  export enum CarClass {
    GT3 = 'GT3',
    LMP2 = 'LMP2',
    GTP = 'GTP'
  }
}

export { RaceSignup };