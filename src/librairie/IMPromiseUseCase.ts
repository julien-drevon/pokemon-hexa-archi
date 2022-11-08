export interface IMPromiseUseCase<TQuery, TReturn> {
  execute(query: TQuery): PromiseLike<TReturn>;
}
