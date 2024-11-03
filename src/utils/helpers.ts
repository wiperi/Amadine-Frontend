import { message } from 'antd';
import { AxiosError } from 'axios';

export async function catchAxiosError(fn: (...args: any[]) => unknown) {
  try {
    await fn();
  } catch (error) {
    if (error instanceof AxiosError) {
      message.error(error.response?.data?.error || 'Internal server error');
    }
    if (error instanceof Error) {
      message.error(error.message);
    } else {
      message.error('An unknown error occurred');
    }
  }
}
