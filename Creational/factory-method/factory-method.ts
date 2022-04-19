// The creator class declares the factory method that must
// return an object of a product class. The creator's subclasses
// usually provide the implementation of this method.
abstract class LoggerFactory {
  abstract createLogger(): ILogger;
  // The creator may also provide some default implementation
  // of the factory method.
}

// Concrete creators override the factory method to change the
// resulting product's type.
class ProductionLoggerFactory extends LoggerFactory {
  createLogger() {
    return new ProductionLogger();
  }
}

class DevelopmentLoggerFactory extends LoggerFactory {
  createLogger() {
    return new DevelopmentLogger();
  }
}

/* NOTE! A code below is "Simple Factory", not Factory Method pattern:
class LoggerFactory {
  public static createLogger(): ILogger {
    if (environment === "production") {
      return new ProductionLogger();
    } else {
      return new DevelopmentLogger();
    }
  }
}
*/


// The product interface declares the operations that all
// concrete products must implement.
interface ILogger {
  info(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  error(message: string): void;
}

// Concrete products provide various implementations of the
// product interface.
class ProductionLogger implements ILogger {
  info(): void {}
  warn(message: string): void {
    console.warn(message);
  }
  debug(): void {}
  error(message: string): void {
    console.error(message);
  }
}

class DevelopmentLogger implements ILogger {
  info(message: string): void {
    console.info(message);
  }
  warn(message: string): void {
    console.warn(message);
  }
  debug(message: string): void {
    console.debug(message);
  }
  error(message: string): void {
    console.error(message);
  }
}


/* CLIENT CODE */
class Application {
  factory : LoggerFactory;

  constructor(environment : string) {
    // The application picks a creator's type depending on the
    // current configuration or environment settings.
    if (environment === "production") {
      this.factory = new ProductionLoggerFactory();
    } else {
      this.factory = new DevelopmentLoggerFactory();
    }

    this.doThings();
  }

  // The client code works with an instance of a concrete
  // creator, albeit through its base interface. As long as
  // the client keeps working with the creator via the base
  // interface, you can pass it any creator's subclass.
  doThings(): void {
    const logger : ILogger = this.factory.createLogger();
    logger.debug("Debug message");
    logger.warn("Warn message");
    logger.info("Info message");
    logger.error("Error message");
  }
}

const app = new Application("production");
