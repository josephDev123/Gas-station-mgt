export interface PumpFuelResponse {
  msg: string;
  data: {
    PumpFuelData: PumpFuelItem[];
    totalCount: number;
    page: number;
  };
}

export interface PumpFuelItem {
  id: number;
  pumpId: number;
  fuelId: number;
  volume: number;
  createdAt: string;
  updatedAt: string;
  pump: Pump;
  fuel: Fuel;
}

export interface Pump {
  id: number;
  name: string;
  status: PumpStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Fuel {
  id: number;
  name: string;
  fuelType: FuelType;
  fuelVolume: number;
  volumeLeft: number | null;
  unit: FuelUnit;
  price_per: number;
  createdAt: string;
  updatedAt: string;
}

type PumpStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";
type FuelUnit = "LITRE" | "GALLON";
type FuelType = "PMS" | "GASOLINE" | "DIESEL" | "LPG";
