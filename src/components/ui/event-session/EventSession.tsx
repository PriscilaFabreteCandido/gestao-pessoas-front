

import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { CloseCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../../stores/slices/authSlice';


const EventSession: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    // Adicionando um listener de evento quando o componente é montado
    const handleEvent = (e: any) => {
      // Exibir o modal quando o evento ocorrer
      dispatch(logout())
      setShowModal(true);
      setMessage(e.detail)

    };

    // Adicionando o listener de evento ao componente
    document.addEventListener('eventSession', handleEvent);

    // Removendo o listener de evento quando o componente é desmontado
    return () => {
      document.removeEventListener('eventSession', handleEvent);
    };
  }, []); // Executa somente uma vez quando o componente é montado

  const getIcon = () => {
    switch (message.type) {
      case 'info':
        return <InfoCircleOutlined />;
      case 'error':
        return <CloseCircleOutlined />;
      case 'warning':
        return <WarningOutlined />;
      default:
        return <ExclamationCircleOutlined />;
    }
  };

  return (

    <div>

      {showModal && (
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getIcon()} {/* Chama a função getIcon para obter o ícone correspondente */}
              <h5 className='NewJuneBold' style={{ marginLeft: 8 }}>{message.title}</h5>
            </div>
          }
          visible={showModal}
          width={"50%"}
          footer={null}
          onCancel={() => setShowModal(false)}
          onOk={() => setShowModal(false)}
        >
          <h6>{message.message}</h6>
        </Modal>
      )}
    </div>



  );
};

export default EventSession;
