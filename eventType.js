import avro from 'avsc';
//latest trip  distance schema attempt
export default avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'tripId',
      type: { type: 'enum', symbols: ['trip1', 'trip2'] },
    },
    {
      name: 'distance',
      type: 'int',
    },
  ],
});

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
