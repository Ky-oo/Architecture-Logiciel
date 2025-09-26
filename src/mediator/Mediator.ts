import type { IMediator, IHandler } from "./IMediator.ts";

export class Mediator implements IMediator {
  private handlers: Map<string, IHandler<any, any>> = new Map();
  private middlewares: Array<(request: any) => Promise<void> | void> = [];

  register<TRequest, TResponse>(
    requestType: new (...args: any[]) => TRequest,
    handler: IHandler<TRequest, TResponse>
  ): void {
    this.handlers.set(requestType.name, handler);
  }

  use(middleware: (request: any) => Promise<void> | void): void {
    this.middlewares.push(middleware);
  }

  async send<TRequest, TResponse>(request: TRequest): Promise<TResponse> {
    for (const mw of this.middlewares) {
      await mw(request);
    }
    const handler = this.handlers.get(
      Object.getPrototypeOf(request).constructor.name
    );
    if (!handler)
      throw new Error("No handler registered for this request type");
    return await handler.handle(request);
  }
}
