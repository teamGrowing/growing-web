import { handlers } from 'mocks/handlers';

type StatusType = 200 | 400;

const DEFAULT_STATUS: StatusType = 200;
const DEFAULT_DELAY = 1000;

interface HandlerInfo {
  status: StatusType;
  delayTime: number;
}

interface HandlerInfoList {
  [path: string]: {
    [method: string]: HandlerInfo;
  };
}

class HandlerInfoManager {
  private handlerInfos: HandlerInfoList = {};

  public setHandlerInfo({
    path,
    method,
    code,
    time,
  }: {
    path: string;
    method: string;
    code: StatusType;
    time: number;
  }): void {
    if (!this.handlerInfos[path]) {
      this.handlerInfos[path] = {};
    }

    this.handlerInfos[path][method] = { status: code, delayTime: time };
  }

  public getHandlerInfos(): HandlerInfoList {
    return this.handlerInfos;
  }

  public getHandlerInfo(path: string, method: string): HandlerInfo | undefined {
    return this.handlerInfos[path]?.[method];
  }

  public initHandlerInfo(): void {
    this.handlerInfos = handlers.reduce<HandlerInfoList>((acc, handler) => {
      const { path, method } = handler.info;

      if (!acc[path.toString()]) acc[path.toString()] = {};

      acc[path.toString()][method.toString().toLowerCase()] = {
        status: DEFAULT_STATUS,
        delayTime: DEFAULT_DELAY,
      };

      return acc;
    }, {});
  }
}

export const handlerInfoManager = new HandlerInfoManager();