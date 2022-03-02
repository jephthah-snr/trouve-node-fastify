interface RoutePrefix {
  [key: string]: string;
}

const baseRoute = '/api/v1';

const rooutePrefix: RoutePrefix = {
  authRouteV1: `${baseRoute}/auth`,
};

export default rooutePrefix;
