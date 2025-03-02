import { ErrorCode, ErrorMessage } from "../../constants/errorCode";

export interface CommonResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: ErrorMessage;
  errorCode?: ErrorCode;
}
