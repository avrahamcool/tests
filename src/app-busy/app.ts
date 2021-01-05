import { busyTracking } from "resources/decorators/busy-tracking";
import { cache } from "resources/decorators/cache";

export class App {
  prop = 1;

  @busyTracking()
  public defaultWork(): Promise<string> {
    this.prop++;
    return new Promise<string>(resolve => {
      setTimeout(() => {
        resolve("defaultWork Done");
      }, 1000);
    });
  }

  @busyTracking("defaultWork_isBusy")
  public async workOtherBoolean(): Promise<string> {
    try {
      this.prop++;
      const x = await this.defaultWork();
      this.prop++;
      const _ = console.log("workOtherBoolean:", x);
      this.prop++;
    }
    catch (ex) {
      console.log(ex);
    }
    return "DONE 2";
  }

  // @busyTracking("shit")
  // public dontWork(): Promise<string>
  // {
  //   return new Promise<string>(resolve => {
  //     setTimeout(() => {
  //       resolve("");
  //     }, 1000);
  //   });
  // }

  //@cache()
  public someFunc()
  {
    return fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then(response => response.json());
  }

  x = 0;
  cacheTest()
  {
    const todo = (this.x++%3)+1;
    console.log(todo);
    this.someFunc()
    .then(x => console.log(x));
  }
}
