import React from 'react';
import { Card, Row, Col, Typography, Alert } from 'antd';

const { Title, Paragraph } = Typography;

const HuntingJobs: React.FC = () => {

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Hunting Jobs</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Job Title 1" bordered={false}>
            <Paragraph>
              Description of Job Title 1. This is a brief overview of the job responsibilities and requirements.
            </Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Job Title 2" bordered={false}>
            <Paragraph>
              Description of Job Title 2. This is a brief overview of the job responsibilities and requirements.
            </Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Job Title 3" bordered={false}>
            <Paragraph>
              Description of Job Title 3. This is a brief overview of the job responsibilities and requirements.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HuntingJobs;
