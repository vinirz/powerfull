import LogsRepository from '../../repositories/LogsRepository';

class Logger {
  constructor(component) {
    this.component = component;
  }

  error({ log, description, isCritical = false }) {
    const message = `[ERROR] ${log} >> ${description}`;
    console.error(message);
    if (isCritical) {
      this.#saveLog('ERROR', message, description);
    }
  }

  warning({ log, description }) {
    const message = `[WARNING] ${log} >> ${description}`;
    console.warn(message);
  }

  info({ log, description }) {
    const message = `[INFO] ${log} >> ${description}`;
    console.info(message);
  }

  success({ log, description }) {
    const message = `[SUCCESS] ${log} >> ${description}`;
    console.log(message);
  }

  async #saveLog(type, message, description) {
    await LogsRepository.createLog({
      component: this.component,
      description,
      message,
      type,
    });
  }
}

export default Logger;
