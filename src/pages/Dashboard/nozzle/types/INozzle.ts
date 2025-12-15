export type Pump = {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type Nozzle = {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  pumpId: number | null;
  pump?: Pump | null;
};

export type INozzleResponse = Nozzle[];
