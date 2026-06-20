import { HttpContext, HttpContextToken } from "@angular/common/http";

export const SKIP_SPINNER = new HttpContextToken<boolean>(() => false);
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

export function NoSpinner(context = new HttpContext): HttpContext {
    return context.set(SKIP_SPINNER, true);
}

export function NoAuth(context = new HttpContext) : HttpContext {
    return context.set(SKIP_AUTH, true);
}
