import generateMsg from '@ovotech/avro-mock-generator';

const schema = {
  type: 'record',
  fields: [{ name: 'nbChickens', type: 'int' }],
};
generateMsg(schema);
