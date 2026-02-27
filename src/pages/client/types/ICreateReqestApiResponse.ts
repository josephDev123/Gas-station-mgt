export interface CreateRequestDemoResponse {
  message: string;
  data: RequestDemo;
}

export interface RequestDemo {
  id: number;
  fullName: string;
  email: string;
  companyName: string;
  message: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}
