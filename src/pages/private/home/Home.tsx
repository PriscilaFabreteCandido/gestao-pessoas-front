import { Card, Row, Col } from 'antd';
import { Users, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleViewUsers = () => {
    navigate('/pessoas');
  };

  const handleCreateUser = () => {
    navigate('/pessoas/adicionar');
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[24, 24]} align="middle">
          {/* Banner */}
          <Col xs={24} lg={12}>
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white h-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Bem-vindo ao Sistema
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-6">
                Gerencie pessoas de forma simples e eficiente. 
                Visualize todos os cadastros ou adicione novas pessoas ao sistema.
              </p>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Interface intuitiva</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base mt-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Gestão completa de pessoas</span>
              </div>
            </div>
          </Col>

          {/* Cards */}
          <Col xs={24} lg={12}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Card
                  className="shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-0 h-full"
                  onClick={handleViewUsers}
                  bodyStyle={{ padding: '2rem' }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                      <Users size={48} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Visualizar Pessoas
                    </h3>
                    <p className="text-gray-600">
                      Veja todos as pessoas cadastrados no sistema, 
                      edite informações ou visualize detalhes.
                    </p>
                  </div>
                </Card>
              </Col>

              <Col xs={24}>
                <Card
                  className="shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-0 h-full"
                  onClick={handleCreateUser}
                  bodyStyle={{ padding: '2rem' }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-4 rounded-full mb-4">
                      <UserPlus size={48} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Cadastrar Pessoa
                    </h3>
                    <p className="text-gray-600">
                      Adicione um novo usuário ao sistema preenchendo 
                      as informações necessárias.
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};