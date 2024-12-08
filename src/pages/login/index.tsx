import { ACCESS_TOEKN } from '@/constants';
import { login } from '@/services/user';
import { ILogin } from '@/types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Toaster } from 'react-hot-toast';

export default () => {
  const onLogin = async (form: ILogin) => {
    const res = await login(form);
    if (res.success) {
      localStorage.setItem(ACCESS_TOEKN, res.data.accessToken);
      history.push('/');
    }
  };
  return (
    <ProConfigProvider hashed={false}>
      <div className=" flex justify-center items-center">
        <LoginForm<ILogin>
          logo="http://a1ex.vip/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.96443187.png&w=64&q=75"
          title="Blog Management"
          subTitle="Blog Management"
          onFinish={async (values) => {
            console.log('🚀 ~ onFinish={ ~ values:', values);
            onLogin(values);
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </LoginForm>
      </div>
      <Toaster />
    </ProConfigProvider>
  );
};
