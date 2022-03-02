class Logger {
  controllerName: string;
  
  constructor(controllerName: string) {
    this.controllerName = controllerName;
  }

  /**
   * error
   */
  public error(message: string) {
    console.error(`${this.controllerName} : ${message}`)
  }

  public info(message: string) {
    console.info(`${this.controllerName} : ${message}`)
  }

  /**
   * object
   */
  public object(message: object) {
    console.log(this.controllerName + " <======>");
    console.table(message);
  }
}

export default Logger;