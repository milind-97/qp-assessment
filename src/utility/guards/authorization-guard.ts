import {  CanActivate, ExecutionContext, UnauthorizedException, mixin } from "@nestjs/common";

export const AuthorizeGuard = (allowedRoles: string[])=>{
class RolesGuardMixin implements CanActivate{
  canActivate(context: ExecutionContext): boolean{
    const request = context.switchToHttp().getRequest()
    // console.log(allowedRoles,'========')
    const result = request?.currentUser?.role.map((role:string)=> allowedRoles.includes(role)).find((val:boolean)=>val===true)
    if(result) return true
    throw new UnauthorizedException('Sorry, you are not authorize')
  }
}
const guard = mixin(RolesGuardMixin)
return guard
}

