export interface IPump {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  createdAt: string;
  updatedAt: string;
  // PumpFuel? :      PumpFuel?
  // nozzle   :       Nozzle[]
}
