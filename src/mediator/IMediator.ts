export interface IRequest<TResponse> {}
export interface ICommand<TResponse> {}
export interface IHandler<TRequest, TResponse> {
  handle(request: TRequest): Promise<TResponse>;
}

export interface IMediator {
  send<TRequest extends IRequest<TResponse> | ICommand<TResponse>, TResponse>(
    request: TRequest
  ): Promise<TResponse>;
  register<TRequest, TResponse>(
    requestType: new (...args: any[]) => TRequest,
    handler: IHandler<TRequest, TResponse>
  ): void;
}
