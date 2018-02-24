export class SampleModel {
  // remember to construct them as public so other components can do
  // e.g. sampleModel.firstName
  constructor(
    public firstName: string,
    public lastName: string
  ) { }
}
