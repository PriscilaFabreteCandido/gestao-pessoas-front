import React, { useEffect } from "react";
import { Form, Input, DatePicker, Select, Row, Col, Button, Spin } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { usePessoaForm } from "../../hooks/usePessoaForm";
import { isValidCPF } from "../../utils/isValidCPF";
import { formatCPF } from "../../utils/formatCPF";

const { Option } = Select;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

interface PessoaFormProps {
    pessoaId?: string;
    onSuccess?: () => void;
}

const PessoaForm: React.FC<PessoaFormProps> = ({ pessoaId, onSuccess }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { initialValues, handleSubmit, isEditMode, loading } = usePessoaForm({ pessoaId, onSuccess });


    useEffect(() => {
        form.setFieldsValue({ ...initialValues, cpf: initialValues.cpfFormatado })
    }, [initialValues])

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => handleSubmit(values, form.resetFields, () => navigate(-1))}
                initialValues={initialValues}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Nome"
                            name="nome"
                            rules={[
                                { required: true, message: "O nome é obrigatório!" },
                                { min: 3, message: "O nome deve ter pelo menos 3 caracteres." },
                            ]}
                        >
                            <Input placeholder="Digite o nome completo" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Sexo" name="sexo">
                            <Select placeholder="Selecione o sexo" allowClear>
                                <Option value="M">Masculino</Option>
                                <Option value="F">Feminino</Option>
                                <Option value="O">Outro</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[{ type: "email", message: "E-mail inválido!" }]}
                        >
                            <Input placeholder="exemplo@email.com" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Data de Nascimento"
                            name="dataNascimento"
                            rules={[
                                { required: true, message: "A data de nascimento é obrigatória!" },
                                {
                                    validator: (_, value) =>
                                        value && dayjs(value).isAfter(dayjs())
                                            ? Promise.reject("A data não pode ser no futuro!")
                                            : Promise.resolve(),
                                },
                            ]}
                        >
                            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Naturalidade" name="naturalidade">
                            <Input placeholder="Cidade de nascimento" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Nacionalidade" name="nacionalidade">
                            <Input placeholder="Ex: Brasileira" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="CPF"
                            name="cpf"
                            rules={[
                                { required: true, message: "O CPF é obrigatório!" },
                                { pattern: cpfRegex, message: "Formato de CPF inválido! Use 000.000.000-00" },
                                {
                                    validator: (_, value) =>
                                        value && !isValidCPF(value)
                                            ? Promise.reject("CPF inválido!")
                                            : Promise.resolve(),
                                },
                            ]}
                            getValueFromEvent={(e) => formatCPF(e.target.value)}
                        >
                            <Input
                                placeholder="000.000.000-00"
                                maxLength={14}
                                onChange={(e) => formatCPF(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 }}>
                    <Button onClick={() => navigate(-1)} style={{ borderColor: "#d9d9d9" }}>
                        Voltar
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {isEditMode ? "Salvar Alterações" : "Cadastrar Pessoa"}
                    </Button>
                </div>
            </Form>
        </Spin>
    );
};

export default PessoaForm;
