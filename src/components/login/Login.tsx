import { Form, Input, Button, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import banner from "../../assets/images/banner.webp";
import { useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";

export const LoginComponent = () => {
  const [form] = Form.useForm();
  const { loading, handleLogin, error } = useLogin();

  const onFinish = async () => {
    const values = await form.validateFields();
    await handleLogin({
      email: values.email,
      senha: values.senha,
    });
  };

  useEffect(() => {
    if (error) {
      Modal.warning({
        title: "Atenção",
        content: error,
      });
    }
  }, [error]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 md:px-12 lg:px-20 ">
     
      <div className="hidden lg:flex w-1/2 justify-center">
        <img
          src={banner}
          alt="banner"
          className="w-full max-w-lg h-auto object-contain rounded-2xl"
        />
      </div>

      
      <div className="flex lg:hidden justify-center mb-8">
        <img
          src={banner}
          alt="banner"
          className="w-full max-w-sm h-auto object-contain"
        />
      </div>

      {/* Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
        <div className="text-center lg:text-left mb-10">
          <h1 className="text-4xl md:text-5xl font-medium mb-2">Plataforma</h1>
          <h2 className="text-primary text-5xl md:text-6xl font-bold">
            Gestão de Pessoas
          </h2>
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-sm"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira seu email!" },
              { type: "email", message: "Por favor, insira um email válido!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-300" />}
              placeholder="Seu email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[
              { required: true, message: "Por favor, insira sua senha!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-300" />}
              placeholder="Sua senha"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
