const teams = [
  {
    realm: "FrontEnd",
    participants: [
      {
        id: 1,
        name: "FE_MEMBER_1",
        vacations: [
          {
            duration: "20.12.2020 - 22.02.2021",
            type: "Pd",
          },
        ],
      },
      {
        id: 2,
        name: "FE_MEMBER_2",
        vacations: [
          {
            duration: "08.01.2021 - 11.01.2021",
            type: "UnPd",
          },
        ],
      },
    ],
  },
  {
    realm: "Designers",
    participants: [
      {
        id: 3,
        name: "DS_MEMBER_1",
        vacations: [
          {
            duration: "10.01.2021 - 20.01.2021",
            type: "Pd",
          },
          {
            duration: "23.01.2021 - 29.01.2021",
            type: "UnPd",
          },
        ],
      },
    ],
  },
  {
    realm: "BackEnd",
    participants: [
      {
        id: 4,
        name: "BE_MEMBER_1",
        vacations: [
          {
            duration: "08.01.2021 - 11.01.2021",
            type: "UnPd",
          },
          {
            duration: "29.01.2021 - 20.02.2021",
            type: "UnPd",
          },
        ],
      },
    ],
  },
  {
    realm: "Managers",
    participants: [
      {
        id: 5,
        name: "BE_MEMBER_1",
        vacations: [
          {
            duration: "08.01.2021 - 11.01.2021",
            type: "Pd",
          },
          {
            duration: "29.01.2021 - 20.02.2021",
            type: "UnPd",
          },
        ],
      },
    ],
  },
];

export default teams;
