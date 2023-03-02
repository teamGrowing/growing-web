import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../components/common/Icon/Icon';
import TopBar from '../../components/common/TopBar/TopBar';
import SubMenu from '../../components/pages/chat/SubMenu';

const ChattingPageContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
  height: fit-content;
  padding-bottom: 54px;
`;
const Chats = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 16px;
`;

export default function ChattingPage() {
  const navigation = useNavigate();
  const [openEnvelope, setOpenEnvelope] = useState<boolean>(false);

  return (
    <ChattingPageContainer className="page-container with-topbar">
      <TopBar
        title="growing"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
        rightMainNode={
          <Icon icon={openEnvelope ? 'IconOpenEnvelope' : 'IconEnvelope'} />
        }
        onRightMainClick={() => setOpenEnvelope(!openEnvelope)}
      />
      <Chats>
        <SubMenu open={openEnvelope} />
      </Chats>
    </ChattingPageContainer>
  );
}
