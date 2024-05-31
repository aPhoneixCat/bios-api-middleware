import { fluentProvide } from "inversify-binding-decorators";
import { interfaces } from "inversify";

// If you rely on controller state (for example, because you're using this.setHeaders inherited by Controller),
// you need to inject a new Controller for every request. Instead of @provideSingleton, 
// please make sure to use @fluentProvide directly (which is the default way to fluentProvide(identifier).inTransientScope()).

export const provideSingleton = function <T>(
  identifier: interfaces.ServiceIdentifier<T>
) {
  return fluentProvide(identifier).inSingletonScope().done();
};