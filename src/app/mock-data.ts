// export const MOCK_DATA = [
//     {
//         id: 1,
//         name: 'John Doe',
//         address: '1234 Main Street, Anytown, Anystate, 12345',
//         expanded: false,
//         children: [
//             {
//                 id: 101,
//                 name: 'Child of John Doe',
//                 address: '1234 Main Street, Anytown, Anystate, 12345',
//             },
//         ],
//     },
//     {
//         id: 2,
//         name: 'Jane Smith',
//         address: '5678 Oak Street, Sometown, Somestate, 67890',
//         expanded: false,
//         children: [
//             {
//                 id: 102,
//                 name: 'Child of Jane Smith',
//                 address: '5678 Oak Street, Sometown, Somestate, 67890',
//             },
//         ],
//     },
//     {
//         id: 3,
//         name: 'Bob Johnson',
//         expanded: false,
//         address: '91011 Pine Road, Newtown, Newstate, 111213',
//         children: [
//             {
//                 id: 103,
//                 name: 'Child of Bob Johnson',
//                 address: '91011 Pine Road, Newtown, Newstate, 111213',
//             },
//         ],
//     },
//     {
//         id: 4,
//         name: 'Bob Williams',
//         expanded: false,
//         address: '1122 Maple Avenue, Smalltown, Anycounty, 22334',
//         children: [
//             {
//                 id: 104,
//                 name: 'Child of Bob Williams',
//                 address: '1122 Maple Avenue, Smalltown, Anycounty, 22334',
//             },
//         ],
//     },
//     {
//         id: 5,
//         name: 'Charlie Brown',
//         expanded: false,
//         address: '9988 Birch Lane, Middletown, Bigstate, 33445',
//         children: [
//             {
//                 id: 105,
//                 name: 'Child of Charlie Brown',
//                 address: '9988 Birch Lane, Middletown, Bigstate, 33445',
//             },
//         ],
//     },
//     {
//         id: 6,
//         name: 'Emily Charlie',
//         expanded: false,
//         address: '4455 Cedar Street, Capitalcity, Bigstate, 44556',
//         children: [
//             {
//                 id: 106,
//                 name: 'Child of Emily Charlie',
//                 address: '4455 Cedar Street, Capitalcity, Bigstate, 44556',
//             },
//         ],
//     },
//     {
//         id: 7,
//         name: 'Franklin Adams',
//         expanded: false,
//         address: '2233 Elm Drive, Littletown, Oldstate, 55667',
//         children: [
//             {
//                 id: 107,
//                 name: 'Child of Franklin Adams',
//                 address: '2233 Elm Drive, Littletown, Oldstate, 55667',
//             },
//         ],
//     },
//     {
//         id: 8,
//         name: 'Emily Lee',
//         expanded: false,
//         address: '7766 Pine Boulevard, Upstate, Newregion, 66778',
//         children: [
//             {
//                 id: 108,
//                 name: 'Child of Emily Lee',
//                 address: '7766 Pine Boulevard, Upstate, Newregion, 66778',
//             },
//         ],
//     },
//     {
//         id: 9,
//         name: 'Henry Clark',
//         expanded: false,
//         address: '3344 Oak Avenue, Downtown, Southstate, 77889',
//         children: [
//             {
//                 id: 109,
//                 name: 'Child of Henry Clark',
//                 address: '3344 Oak Avenue, Downtown, Southstate, 77889',
//             },
//         ],
//     },
//     {
//         id: 10,
//         name: 'Isabella Emily',
//         expanded: false,
//         address: '9900 Walnut Street, Northtown, Eaststate, 88990',
//         children: [
//             {
//                 id: 110,
//                 name: 'Child of Isabella Emily',
//                 address: '9900 Walnut Street, Northtown, Eaststate, 88990',
//             },
//         ],
//     },
// ];

export const MOCK_DATA = Array.from({ length: 50 }, (_, i) => {
    const id = i + 1;
    return {
        id,
        name: `Person ${id}`,
        address: `${1000 + id} Random Street, City ${id}, State ${id}, ${id}${id}${id}${id}${id}`,
        expanded: false,
        children: [
            {
                id: 100 + id,
                name: `Child of Person ${id}`,
                address: `${1000 + id} Random Street, City ${id}, State ${id}, ${id}${id}${id}${id}${id}`,
            },
        ],
    };
});