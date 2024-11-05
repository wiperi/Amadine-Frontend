import { message } from 'antd';
import { AxiosError } from 'axios';

export async function catchAxiosError(fn: (...args: any[]) => unknown) {
  try {
    await fn();
  } catch (error) {
    if (error instanceof AxiosError) {
      return message.error(error.response?.data?.error || 'Internal server error');
    }
    if (error instanceof Error) {
      return message.error(error.message);
    }
    
    return message.error('An unknown error occurred');
  }
}
