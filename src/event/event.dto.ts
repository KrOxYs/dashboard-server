export class CreateEventDto {
  constructor(
    public readonly name: string,
    public readonly dateCreated: Date,
    public readonly status: string,
    public readonly emailHr: string,
    public readonly emailVendor: string,
    public readonly ProposedDate: Array<any>,
    public readonly confirmedDate: any,
    public readonly postalCode: string,
    public readonly address: string,
    public readonly remarks: string,
  ) {}
}
