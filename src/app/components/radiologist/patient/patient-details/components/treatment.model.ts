export class Treatment {
  constructor(
    public id: number,
    public cost: number,
    public imageURl: string,
    public imageName: string,
    public dateOfCreate: Date,
    public typeOfXRayImage: string
  ) {}
}
