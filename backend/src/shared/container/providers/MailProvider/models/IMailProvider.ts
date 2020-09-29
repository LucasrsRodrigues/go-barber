import ISendProvider from '../dtos/ISendMailDTO';

export default interface IMailProvider{
   sendMail(data: ISendProvider): Promise<void>;
}
