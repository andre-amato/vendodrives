export interface CarDetails {
  _id: string;
  title: string;
  price: number;
  zipCode: string;
  photo?: string;
}

export interface CarFormDetails {
  title: string;
  price: string;
  zipCode: string;
  photo?: File | null;
}
