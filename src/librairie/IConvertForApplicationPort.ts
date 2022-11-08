export interface IConvertForApplicationPort<Tin, Tout> {
  convert(data: Tin): Tout;
}
