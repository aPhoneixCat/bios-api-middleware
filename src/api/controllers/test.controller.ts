import { Get, Route } from "tsoa";

interface TestResponse {
  message: string
}


@Route("test")
export class TestController {
  //* Dependency injection
  constructor() { }

  @Get("/")
  public async test(): Promise<TestResponse> {
    return {
      message: "hello",
    };
  };

}