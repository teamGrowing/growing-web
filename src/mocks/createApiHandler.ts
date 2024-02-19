import { DefaultBodyType, PathParams, delay, http, HttpResponse } from 'msw';
import { handlerInfoManager } from 'mocks/HandlerInfoManager';

export type NullableResponse<T> = T | null;

type ResponseData<TResponse> = {
  [status: number]: NullableResponse<TResponse>;
};

type RequestHandler<TParams, TRequest, TResponse> = (
  params: TParams,
  searchParams: TRequest
) => ResponseData<TResponse>;

type AfterRequest<TParams, TRequest> = (
  params: TParams,
  searchParams: TRequest
) => void;

export const createApiHandler = <
  TParams extends PathParams,
  TRequest extends DefaultBodyType,
  TResponse extends DefaultBodyType
>(
  path: string,
  method: keyof typeof http,
  handleRequest: RequestHandler<TParams, TRequest, TResponse>,
  postProcess?: AfterRequest<TParams, TRequest>
) => {
  return http[method]<TParams, TRequest, TResponse>(path, async (req) => {
    const params = req.params as TParams;
    const url = new URL(req.request.url);
    const searchParams = url.searchParams as unknown as TRequest;
    const responseData = handleRequest(params, searchParams);

    const handler = handlerInfoManager.getHandlerInfo(path, method);
    const delayTime = handler?.delayTime || 0;
    const responseStatus = handler?.status || 200;

    await delay(delayTime);

    if (responseStatus !== 400) {
      postProcess?.(params, searchParams);
    }
    return HttpResponse.json(responseData[responseStatus], {
      status: responseStatus,
    });
  });
};
