import React from "react";
import { Card, Typography } from "antd";
import { useParams } from "react-router-dom";
import PessoaForm from "../../../../components/pessoa/PessoaForm";

const { Title } = Typography;

const EditarPessoaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>ID inválido</div>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Card>
        <Title level={3} style={{ marginBottom: 24 }}>
          Editar Pessoa 
        </Title>
        <PessoaForm pessoaId={id} />
      </Card>
    </div>
  );
};

export default EditarPessoaPage;