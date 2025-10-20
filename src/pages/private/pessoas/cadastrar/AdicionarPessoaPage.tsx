import React from "react";
import { Card, Typography } from "antd";
import PessoaForm from "../../../../components/pessoa/PessoaForm";

const { Title } = Typography;

const AdicionarPessoaPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Card >
        <Title level={3} style={{ marginBottom: 24 }}>
          Cadastrar Pessoa
        </Title>
        <PessoaForm />
      </Card>
    </div>
  );
};

export default AdicionarPessoaPage;
