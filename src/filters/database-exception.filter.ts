import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message = 'Oops Something went wrong!';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      // duplicate exception
      case 11000:
        const keys = Object.keys((exception as any)?.keyPattern ?? {});
        const key = keys.length ? keys[0] : '';
        message = key ? `${key} already exist` : 'Oops Something went wrong!';
        status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
