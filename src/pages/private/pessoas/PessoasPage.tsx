import React, { useEffect } from "react";
import { Table, Space, Button, Popconfirm, Tag, message, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { usePessoas } from "../../../hooks/usePessoas";
import type { PessoaResponse } from "../../../interfaces/Responses/PessoaResponse";
import { useNavigate } from "react-router-dom";
import { PessoaService } from "../../../services/PessoaService";
import { useIsMobile } from "../../../hooks/useIsMobile";

const PessoasPage: React.FC = () => {
  const { pessoas, loading, error, refetch } = usePessoas();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const columns: ColumnsType<PessoaResponse> = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      ellipsis: isMobile,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: isMobile,
    },
    {
      title: "Sexo",
      dataIndex: "sexo",
      key: "sexo",
      render: (sexo: PessoaResponse["sexo"]) => {
        const colors = { M: "blue", F: "magenta", O: "orange" };
        const labels = { M: "Masculino", F: "Feminino", O: "Outro" };
        return <Tag color={colors[sexo]}>{labels[sexo]}</Tag>;
      },
      filters: [
        { text: "Masculino", value: "M" },
        { text: "Feminino", value: "F" },
        { text: "Outro", value: "O" },
      ],
      onFilter: (value, record) => record.sexo === value,
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dataNascimento",
      key: "dataNascimento",
      render: (data) => new Date(data).toLocaleDateString("pt-BR"),
      sorter: (a, b) =>
        new Date(a.dataNascimento).getTime() - new Date(b.dataNascimento).getTime(),
      responsive: ["md"],
    },
    {
      title: "Data de Cadastro",
      dataIndex: "dataCriacao",
      key: "dataCriacao",
      render: (data: any) =>
        data ? new Date(data).toLocaleString("pt-BR") : "-",
      responsive: ["lg"],
    },
    {
      title: "Última Atualização",
      dataIndex: "dataAtualizacao",
      key: "dataAtualizacao",
      render: (data: any) =>
        data ? new Date(data).toLocaleString("pt-BR") : "-",
      responsive: ["lg"],
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="link"
            size={isMobile ? "small" : "middle"}
            onClick={() => onEdit(record.id)}
          >
            {!isMobile && "Editar"}
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir esta pessoa?"
            description="Esta ação não pode ser desfeita."
            okText="Sim"
            cancelText="Não"
            okType="danger"
            onConfirm={() => onDelete(record.id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              type="link"
              size={isMobile ? "small" : "middle"}
            >
              {!isMobile && "Excluir"}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onDelete = async (id: string) => {
    try {
      await PessoaService.excluir(id);
      message.success("Pessoa excluída com sucesso!");
      refetch(); // Recarrega a lista
    } catch (error: any) {
      Modal.error({
        title: "Erro ao excluir pessoa",
        content:
          error?.response?.data?.message ||
          "Erro desconhecido ao excluir pessoa.",
      });
    }
  };

  const onEdit = (id: string) => {
    navigate("/pessoas/editar/" + id);
  };

  useEffect(() => {
    if (error) {
      Modal.error({
        title: "Erro ao carregar pessoas",
        content:
          error || "Erro desconhecido ao carregar a lista de pessoas.",
      });
    }
  }, [error]);

  const handleAddPessoa = () => {
    navigate("/pessoas/adicionar");
  };

  return (
    <div className="py-4 px-2 md:px-4">
      <div
        className={`flex ${
          isMobile
            ? "flex-col items-stretch gap-3 text-center"
            : "flex-row justify-between items-center"
        }`}
      >
        <div className="text-xl md:text-2xl my-2 md:my-5">
          Gerenciar{" "}
          <strong className="text-primary">Pessoas</strong>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddPessoa}
          size={isMobile ? "middle" : "large"}
          className={isMobile ? "w-full" : ""}
        >
          {isMobile ? "Adicionar" : "Adicionar Pessoa"}
        </Button>
      </div>

      <div className="mt-4">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={pessoas}
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default PessoasPage;
