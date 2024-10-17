import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthRepository from '../../repositories/AuthRepository';
import Logger from '../LoggerService';

const logger = new Logger('AuthService');

class AuthService {
  async createAccount({ name, email, password }) {
    try {
      const emptyFields = this.#validateEmptyFields(
        ['name', 'email', 'password'],
        {
          name,
          email,
          password,
        }
      );

      if (emptyFields) {
        return this.#formatResponse({
          error: 'Por favor, preencha todos os campos',
        });
      }

      const isValidEmail = this.#validateEmail(email);
      const isValidPassword = this.#validatePassword(password);

      if (!isValidEmail) {
        return this.#formatResponse({
          error: 'Por favor, insira um email valido',
        });
      }

      if (!isValidPassword) {
        return this.#formatResponse({
          error:
            'Sua senha deve ter pelo menos 8 caracteres. E deve conter letras maiusculas, minúsculas, e numeros',
        });
      }

      const createdUser = await AuthRepository.createAccount(
        email,
        password,
        name
      );

      if (createdUser.error) {
        logger.error({
          log: 'Erro ao criar conta',
          description: createdUser.error.message,
        });

        return this.#formatResponse(createdUser);
      }

      await AsyncStorage.setItem('session', JSON.stringify(createdUser.data));

      return this.#formatResponse(createdUser);
    } catch (error) {
      logger.error({
        log: 'Erro inesperado ao criar conta',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao criar conta. Tente novamente',
      });
    }
  }

  async login({ email, password }) {
    try {
      const emptyFields = this.#validateEmptyFields(['email', 'password'], {
        email,
        password,
      });

      if (emptyFields) {
        return this.#formatResponse({
          error: 'Por favor, preencha todos os campos',
        });
      }

      const login = await AuthRepository.login(email, password);

      if (login.error) {
        logger.error({
          log: 'Erro ao realizar login',
          description: login.error,
        });

        return this.#formatResponse(login);
      }

      await AsyncStorage.setItem('session', JSON.stringify(login.data));

      delete login.data.expires_at;
      delete login.data.expires_in;
      delete login.data.token_type;
      delete login.data.refresh_token;

      return this.#formatResponse({
        data: {
          id: login.data.user.id,
          email: login.data.user.email,
          name: login.data.user.user_metadata.name,
        },
      });
    } catch (error) {
      logger.error({
        log: 'Erro inesperado ao realizar login',
        description: error.message,
        isCritical: true,
      });

      return this.#formatResponse({
        error: 'Erro inesperado ao realizar login. Tente novamente',
      });
    }
  }

  async logout() {
    await AuthRepository.logout();
    await AsyncStorage.removeItem('session');
  }

  async retrieveSession() {
    try {
      const user = await AsyncStorage.getItem('session');

      if (!user) {
        return null;
      }

      let { session } = JSON.parse(user);

      delete session.expires_at;
      delete session.expires_in;
      delete session.token_type;
      delete session.refresh_token;

      return {
        ...session,
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata.name,
      };
    } catch (error) {
      logger.error({
        log: 'Erro inesperado ao recuperar sessão do usuario',
        description: error.message,
        isCritical: true,
      });

      return null;
    }
  }

  #formatResponse(response) {
    const responseObject = {
      data: null,
      error: null,
    };

    if (response.error) {
      responseObject.error = response.error;
    }

    if (response.data) {
      responseObject.data = response.data;
    }

    return responseObject;
  }

  #validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const formatedEmail = String(email.trim().toLowerCase());
    if (re.test(formatedEmail)) {
      return formatedEmail;
    }

    return false;
  }

  #validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (re.test(password)) {
      return true;
    }

    return false;
  }

  #validateEmptyFields(requiredFields, data) {
    for (const field of requiredFields) {
      if (!data[field]) {
        return field;
      }
    }
  }
}

export default new AuthService();
