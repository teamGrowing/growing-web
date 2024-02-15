import { DefaultBodyType, PathParams, delay, http, HttpResponse } from 'msw';
import { handlerInfoManager } from 'mocks/HandlerInfoManager';

export type NullableResponse<T> = T | null;

type ResponseData<TResponse> = {
  [status: number]: NullableResponse<TResponse>;
};

type RequestHandler<TParams, TResponse> = (
  params: TParams
) => ResponseData<TResponse>;

export const createApiHandler = <
  TParams extends PathParams,
  TRequest extends DefaultBodyType,
  TResponse extends DefaultBodyType
>(
  path: string,
  method: keyof typeof http,
  handleRequest: RequestHandler<TParams, TResponse>
) => {
  return http[method]<TParams, TRequest, TResponse>(path, async (req) => {
    const params = req.params as TParams;
    const responseData = handleRequest(params);

    const handler = handlerInfoManager.getHandlerInfo(path, method);
    const delayTime = handler?.delayTime || 0;
    const responseStatus = handler?.status || 200;

    await delay(delayTime);
    return HttpResponse.json(responseData[responseStatus], {
      status: responseStatus,
    });
  });
};
