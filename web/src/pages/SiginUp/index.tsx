import React, { useCallback, useRef } from 'react';
import {
  FiLogIn, FiUser, FiMail, FiLock, FiArrowLeft,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';

// images
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';

interface SiginUpFormData{
   name: string;
   email: string;
   password: string;
}

const SiginUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatorio'),
        email: Yup.string().required('Email obrigatorio').email('Digite um e-mail valido'),
        password: Yup.string().min(6, 'No minimo 6 digtos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no GoBarber',
      });

      history.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
      }

      // disparar toast
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
      });
    }
  }, [history, addToast]);

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>

          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SiginUp;
