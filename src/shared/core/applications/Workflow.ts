export interface Workflow<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IResponse>;
}
