import { publishMessage } from './sns-service';
import SNS from 'aws-sdk/clients/sns';

const AWSMock = require('jest-aws-sdk-mock');
AWSMock.mock('SNS', 'publish', 'test-message');

describe('With jest-aws-sdk-mock', () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, { 
      AWS_REGION: 'eu-west-1',
      SNS_TOPIC_ARN: 'arn:sns'
    });
  });

  it('should publish message', async  () => {
    const sns = new SNS();
    const data = { id: '123' };

    await publishMessage('MESSAGE_TEST', data);

    expect(sns.publish).toHaveBeenCalledTimes(1);
    expect(sns.publish).toHaveBeenCalledWith(data);
  });
});