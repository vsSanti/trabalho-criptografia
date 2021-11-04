import { Alert, Button, Form, Input } from 'antd';
import classnames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PageTitle } from 'components';
import { useAuth } from 'hooks';

import './styles.scss';

interface HandleSubmitProps {
  email: string;
  password: string;
}

export const SignIn: FC = () => {
  const { t } = useTranslation();

  const { signIn, loadingSignIn, errorSignIn } = useAuth();

  const handleSubmit = ({ email, password }: HandleSubmitProps): void => {
    signIn({ email, password });
  };

  return (
    <div id="signin-page">
      <PageTitle
        title={t('public.signin.title')}
        subtitle={t('public.signin.subtitle')}
      />

      <Form
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          email: 'contato@nutricionista.app',
          password: '123456',
        }}
      >
        <Form.Item
          label={t('form.typeEmailLable')}
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input
            allowClear
            size="large"
            placeholder={t('form.typeEmailPlaceholder')}
            prefix={<i className="caf-ic_mail" />}
          />
        </Form.Item>
        <Form.Item
          label={t('form.typePasswordLabel')}
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password
            size="large"
            placeholder={t('form.typePasswordPlaceholder')}
            prefix={<i className="caf-lock" />}
          />
        </Form.Item>

        <Alert
          message={t(`${errorSignIn}`)}
          showIcon
          type="error"
          className={classnames({
            'alert-visible': errorSignIn,
            'alert-invisible': !errorSignIn,
          })}
        />

        <Form.Item>
          <Button
            id="submit-button"
            block
            size="large"
            type="primary"
            htmlType="submit"
            loading={loadingSignIn}
          >
            {t('public.signin.accessAccount')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
