// Example with email service
import { makeDummyUser } from '../collaborators';
import { User } from '../types/user';

/**
 * Example of Email Service
 * @module EmailService
 * */
class EmailService {
  /**
   * Example of send email method
   * @param {Object} to - email to send email.
   * @param {Object} message - email message.
   * @return {void}
   * */
  public async sendEmail(to: string, message: string): Promise<void> {
    // a lot of complicated things
    console.log(to.split(''));
    console.log(message.split(''));
    console.log(1 + 3);
  }
}

/**
 * Example of Email Service
 * @module EmailService
 * */
class EmailServiceSpy implements Partial<EmailServiceSpy> {
  /**
   * Example of send email method
   * @param {Object} to - email to send email.
   * @param {Object} message - email message.
   * @return {void}
   * */
  public async sendEmail(to: string, message: string): Promise<void> {}
}

/**
 * Example of User Controller
 * @module UserController
 * */
class UserController {
  public emailService: EmailService;

  /**
   * Constructor of UserController
   * */
  constructor() {
    this.emailService = new EmailService();
  }

  /**
   * Method to create a Generic
   * @param {Object} user - user to register.
   * @return {Object}
   * */
  public async registerUser(user: User): Promise<User> {
    if (!user.email) throw new Error('Email is required!');
    if (!user.name) throw new Error('Name is required!');

    await this.emailService.sendEmail(user.email, user.name);

    return user;
  }
}

const makeSut = () => {
  const emailService = new EmailServiceSpy();
  const sut = new UserController();
  sut.emailService = emailService;

  return { sut, emailService };
};

describe('UserController', () => {
  it('should register a user', async () => {
    const { sut, emailService } = makeSut();
    const user = makeDummyUser();

    jest.spyOn(emailService, 'sendEmail');

    const result = await sut.registerUser(user);

    expect(result).toBeDefined();
    expect(emailService.sendEmail).toHaveBeenCalledTimes(1);
    expect(emailService.sendEmail).toHaveBeenCalledWith(user.email, user.name);

    console.table(result);
  });
});
