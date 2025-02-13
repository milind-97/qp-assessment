import { createParamDecorator, ExecutionContext } from "@nestjs/common";
// import { Currentuser } from './current-user.decorator';

export const Currentuser = createParamDecorator(
  (
    data: never, ctx: ExecutionContext
  )=>{
    const request = ctx.switchToHttp().getRequest()
    return request.currentUser
  }
)