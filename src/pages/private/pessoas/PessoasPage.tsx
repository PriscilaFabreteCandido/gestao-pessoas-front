import React, { useEffect } from "react";
import { Table, Space, Button, Popconfirm, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { usePessoas } from "../../../hooks/usePessoas";
import type { PessoaResponse } from "../../../interfaces/Responses/PessoaResponse";
import { useNavigate } from "react-router-dom";


const PessoasPage: React.FC = () => {
    const { pessoas, loading, error } = usePessoas();
    const navigate = useNavigate();
    
    const columns: ColumnsType<PessoaResponse> = [
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
            sorter: (a, b) => a.nome.localeCompare(b.nome),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
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
            sorter: (a, b) => new Date(a.dataNascimento).getTime() - new Date(b.dataNascimento).getTime(),
        },
        {
            title: "Ações",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        type="link"
                        onClick={() => onEdit(record.id)}
                    >
                        Editar
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja excluir esta pessoa?"
                        okText="Sim"
                        cancelText="Não"
                        onConfirm={() => onDelete(record.id)}
                    >
                        <Button danger icon={<DeleteOutlined />} type="link">
                            Excluir
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onDelete = (id: string) => { }

    const onEdit = (id: string) => { }

    useEffect(() => {
    }, [error]);



    const handleAddPessoa = () => {
        navigate("/pessoas/adicionar");
    };

    return (
        <div className="py-4">
            <div className="flex justify-between">
                <div className="text-2xl my-5">
                    Gerenciar <strong className="text-primary">Pessoas</strong>
                </div>

                <Button type="primary" onClick={handleAddPessoa} >
                    Adicionar Pessoa
                </Button>
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={pessoas}
                loading={loading}
                pagination={{ pageSize: 10, showSizeChanger: false }}
            />
        </div>
    );
};

export default PessoasPage;
