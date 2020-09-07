import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import {
  Container, Content, Background, AnimationContainer,
} from './styles';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/Authentication';
import { useToast } from '../../hooks/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

// images
import logoImg from '../../assets/logo.svg';

interface SignInFormData {
   email: string;
   password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatorio').email('Digite um e-mail valido'),
        password: Yup.string().required('Senha obrigatoria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      await signIn({
        email: data.email,
        password: data.password,
      });

      history.push('/dashboard');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
         formRef.current?.setErrors(errors);

         return;
      }

      // disparar toast
      addToast({
        type: 'error',
        title: 'Erro na Autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
      });
    }
  }, [signIn, addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <Link to="forgot">Esqueci minha Senha</Link>

          </Form>
          <Link to="/siginup">
            <FiLogIn size={20} />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
