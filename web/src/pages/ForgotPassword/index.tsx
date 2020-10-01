import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import {
  Container, Content, Background, AnimationContainer,
} from './styles';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

// images
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface ForgotPasswordFormData {
   email: string;
   password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatorio').email('Digite um e-mail valido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      // recuperacao de senha
      await api.post('/password/forgot', {
        email: data.email,
      });
      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description: 'Enviamos um e-mail para verificar sua recuperação de senha, cheque sua caixa de entrada',
      });

      // history.push('/dashboard');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
         formRef.current?.setErrors(errors);

         return;
      }

      // disparar toast
      addToast({
        type: 'error',
        title: 'Erro na Recuperação de senha',
        description: 'Ocorreu um erro ao tentar realizar a recuperação de senha.',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">Recuperar</Button>

          </Form>

          <Link to="/">
            <FiLogIn size={20} />
            Voltar ao logon
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
