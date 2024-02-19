import {
  DefaultBodyType,
  PathParams,
  delay,
  http,
  HttpResponse,
  StrictRequest,
} from 'msw';
import { handlerInfoManager } from 'mocks/HandlerInfoManager';

export type NullableResponse<T> = T | null;

type ResponseData<TResponse> = {
  [status: number]: NullableResponse<TResponse>;
};

type RequestHandler<TParams, TRequest, TResponse> = (
  params: TParams,
  request: TRequest
) => ResponseData<TResponse>;

type AfterRequest<TParams, TRequest> = (
  params: TParams,
  request: TRequest
) => void;

export const createApiHandler = <
  TParams extends PathParams,
  TRequest extends DefaultBodyType,
  TResponse extends DefaultBodyType
>(
  path: string,
  method: keyof typeof http,
  handleRequest: RequestHandler<TParams, StrictRequest<TRequest>, TResponse>,
  postProcess?: AfterRequest<TParams, StrictRequest<TRequest>>
) => {
  return http[method]<TParams, TRequest, TResponse>(
    path,
    async ({ params, request }) => {
      const responseData = handleRequest(params, request);

      const handler = handlerInfoManager.getHandlerInfo(path, method);
      const delayTime = handler?.delayTime || 0;
      const responseStatus = handler?.status || 200;

      await delay(delayTime);

      if (responseStatus !== 400) {
        postProcess?.(params, request);
      }

      return HttpResponse.json(responseData[responseStatus], {
        status: responseStatus,
      });
    }
  );
};
export const getSearchParams = (originUrl: string) => {
  const url = new URL(originUrl);
  return url.searchParams;
};
