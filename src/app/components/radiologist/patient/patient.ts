export interface Patient {
  id?: number;
  code?: string;

  firstName?: string;
  lastName?: string;
  phoneNumber?: string;

  age?: number;
  gender?: string;
  date?: Date;
  typeOfXRay?: string;

  cost?: number;
  image?: string;
}
