import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";
import config from "@payload-config";

export const GET = (request: Request) => REST_GET(request, config);
export const POST = (request: Request) => REST_POST(request, config);
export const DELETE = (request: Request) => REST_DELETE(request, config);
export const PATCH = (request: Request) => REST_PATCH(request, config);
export const PUT = (request: Request) => REST_PUT(request, config);
export const OPTIONS = (request: Request) => REST_OPTIONS(request, config);
