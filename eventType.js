import avro from 'avsc';

// trip - status obj schema success
export default avro.Type.forSchema({
  type: 'record',
  name: 'Status',
  fields: [
    {
      name: 'statusId',
      type: 'string',
    },
    {
      name: 'tripId',
      type: { type: 'enum', symbols: ['trip1', 'trip2'] },
    },
    {
      name: 'vehicleId',
      type: { type: 'enum', symbols: ['car1', 'car2'] },
    },
    {
      name: 'position',
      type: {
        type: 'record',
        name: 'Position',
        fields: [
          {
            name: 'lat',
            type: 'float',
          },
          {
            name: 'lon',
            type: 'float',
          },
        ],
      },
    },
    {
      name: 'batteryLevel',
      type: 'int',
    },
    {
      name: 'distance',
      type: 'int',
    },
    {
      name: 'timestamp',
      type: 'string',
    },
  ],
});

//trip  distance schema success
// export default avro.Type.forSchema({
//   type: 'record',
//   fields: [
//     {
//       name: 'tripId',
//       type: { type: 'enum', symbols: ['trip1', 'trip2'] },
//     },
//     {
//       name: 'distance',
//       type: 'int',
//     },
//   ],
// });

// quick status schema
// export default avro.Type.forSchema({
//   name: 'status',
//   type: 'record',
//   fields: [
//     {
//       name: 'statusId',
//       type: 'string',
//     },
//     {
//       name: 'tripId',
//       type: 'string',
//     },
//     {
//       name: 'vehicleId',
//       type: 'string',
//     },
//     {
//       name: 'position',
//       type: {
//         type: 'record',
//         name: 'Position',
//         fields: [
//           {
//             name: 'lat',
//             type: 'float',
//           },
//           {
//             name: 'lon',
//             type: 'float',
//           },
//         ],
//       },
//     },
//     {
//       name: 'batteryLevel',
//       type: 'int',
//     },
//     {
//       name: 'distance',
//       type: 'int',
//     },
//     {
//       name: 'timestamp',
//       type: 'int',
//     },
//   ],
// });

// old cat/dog example
// export default avro.Type.forSchema({
//   type: 'record',
//   fields: [
//     {
//       name: 'category',
//       type: { type: 'enum', symbols: ['DOG', 'CAT'] }
//     },
//     {
//       name: 'noise',
//       type: 'string',
//     }
//   ]
// });
