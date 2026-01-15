export interface ISale {
  id: number;
  user_id: number;
  pump_fuel_id: number;
  price_per: string; // returned as string
  nozzle_id: number;
  liter_sold: string; // returned as string
  total_price_calc: string; // returned as string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  User: User | null;
  Nozzle: Nozzle | null;
  PumpFuel: PumpFuel | null;
  customerName: string | null;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: "ATTENDANT" | "ADMIN" | "MANAGER";
  createdAt: string;
  updatedAt: string;
}

export interface Nozzle {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  pumpId: number;
}

export interface PumpFuel {
  id: number;
  pumpId: number;
  fuelId: number;
  volume: string; // returned as string
  createdAt: string;
  updatedAt: string;
  fuel: Fuel | null;
  pump: Pump | null;
}

export interface Fuel {
  id: number;
  name: string;
  fuelType: "PMS" | "AGO" | "DPK";
  fuelVolume: number;
  volumeLeft: number | null;
  unit: "LITRE";
  price_per: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pump {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
