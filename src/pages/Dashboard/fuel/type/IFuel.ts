export type IFuel = {
  id: number;
  name: string;
  fuelType: "DIESEL" | "GASOLINE" | "PMS" | "LPG";
  fuelVolume: string;
  volumeLeft: string;
  unit: "LITRE" | "GALLON";
  price_per: number;
  createdAt: Date;
  updatedAt: Date;
};
