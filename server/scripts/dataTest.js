const users = [
  {
    username: "nestor123",
    password: "0000",
    rol: "proveedor",
    fullName: "Nestor Gonzalez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "pepito123",
    password: "0000",
    rol: "proveedor",
    fullName: "Pepe Hernandez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "pablo123",
    password: "1234",
    rol: "voluntario",
    fullName: "Pablo Hernandez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "pablo01",
    password: "1234",
    rol: "voluntario",
    fullName: "Pablo Perez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "pablo5",
    password: "1234",
    rol: "voluntario",
    fullName: "Pablo Sanchez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "manu123",
    password: "1234",
    rol: "voluntario",
    fullName: "Manuel Hernandez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "carlos01",
    password: "1234",
    rol: "voluntario",
    fullName: "Carlos Perez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "carlos02",
    password: "1234",
    rol: "voluntario",
    fullName: "Carlos Hernandez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "carlos03",
    password: "1234",
    rol: "voluntario",
    fullName: "Carlos Sanchez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "carlos04",
    password: "1234",
    rol: "voluntario",
    fullName: "Carlos Rodriguez",
    birthDate: "2023-06-25",
    institutionalId: "1234",
  },
  {
    username: "juna01",
    password: "1234",
    rol: "voluntario",
    fullName: "Juan Perez",
    birthDate: "2000-01-01",
    institutionalId: "5678",
  },
  {
    username: "juanga",
    password: "1234",
    rol: "voluntario",
    fullName: "Juan Gabriel Perez",
    birthDate: "2000-01-01",
    institutionalId: "5678",
  },
  {
    username: "juan02",
    password: "1234",
    rol: "voluntario",
    fullName: "Juan Guilarte",
    birthDate: "2000-01-01",
    institutionalId: "5678",
  },
  {
    username: "ana01",
    password: "1234",
    rol: "voluntario",
    fullName: "Ana Sanchez",
    birthDate: "1995-07-15",
    institutionalId: "9876",
  },
  {
    username: "anar02",
    password: "1234",
    rol: "voluntario",
    fullName: "Ana Rodriguez",
    birthDate: "1995-07-15",
    institutionalId: "9876",
  },
  {
    username: "maria01",
    password: "1234",
    rol: "voluntario",
    fullName: "Maria Rodriguez",
    birthDate: "1988-03-10",
    institutionalId: "1357",
  },
  {
    username: "maria02",
    password: "1234",
    rol: "voluntario",
    fullName: "Maria Perez",
    birthDate: "1988-03-10",
    institutionalId: "1357",
  },
  {
    username: "jose02",
    password: "1234",
    rol: "voluntario",
    fullName: "Jose Martinez",
    birthDate: "1992-09-20",
    institutionalId: "2468",
  },
  {
    username: "jose01",
    password: "1234",
    rol: "voluntario",
    fullName: "Jose Perez",
    birthDate: "1992-09-20",
    institutionalId: "2468",
  },
  {
    username: "jose03",
    password: "1234",
    rol: "voluntario",
    fullName: "Jose Manuel Guilarte",
    birthDate: "1992-09-20",
    institutionalId: "2468",
  },
];

const works = [
  //////////////////// PROVEEDOR 1 (apoyo comunitario)
  // tres por sesion
  {
    work: {
      title: "Soldadura de rejas",
      description:
        "Se necesita soldador para reparacion de rejas del colegio X",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-06-12", hour: "9:00 AM" }],
      tags: ["mantenimiento", "reparacion", "soldadura", "comunidad"],
      dateInit: "2023-06-12",
      dateEnd: "2023-06-12",
    },
    user: {
      id: 1,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Cuidado de animales",
      description: "Brinda apoyo en un refugio de animales",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-06-13", hour: "9:00 AM" }],
      tags: ["animales", "campo", "comunidad"],
      dateInit: "2023-06-13",
      dateEnd: "2023-06-13",
    },
    user: {
      id: 1,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Jardineria",
      description: "Podar plantas en el sector X",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-06-13", hour: "9:00 AM" }],
      tags: ["jardineria", "campo", "comunidad"],
      dateInit: "2023-06-13",
      dateEnd: "2023-06-13",
    },
    user: {
      id: 1,
      rol: "proveedor",
    },
  },
  // tres recurrentes
  {
    work: {
      title: "Asistencia de hospitales",
      description: "Brinda apoyo en un hospital",
      type: "1",
      volunteerCountMax: "3",
      blocks: [
        { day: "Lunes", hour: "9:00 AM" },
        { day: "Viernes", hour: "3:00 PM" },
      ],
      tags: ["comunidad", "hospital"],
      dateInit: "2023-05-01",
      dateEnd: "2023-08-30",
    },
    user: {
      id: 1,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Asistencia en comedores comunitarios",
      description: "Brinda apoyo en comedor comunitario",
      type: "1",
      volunteerCountMax: "3",
      blocks: [{ day: "Miércoles", hour: "9:00 AM" }],
      tags: ["comunidad", "comedor"],
      dateInit: "2023-05-13",
      dateEnd: "2023-08-25",
    },
    user: {
      id: 1,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Apoyo a personas mayores",
      description: "Brinda apoyo en ansianato",
      type: "1",
      volunteerCountMax: "3",
      blocks: [
        { day: "Viernes", hour: "9:00 AM" },
        { day: "Jueves", hour: "9:00 AM" },
      ],
      tags: ["ansianato", "comunidad"],
      dateInit: "2023-05-13",
      dateEnd: "2023-08-29",
    },
    user: {
      id: 1,
      rol: "proveedor",
    },
  },
  //////////////////////// PROVEEDOR 2 (educaion)
  // por sesion
  {
    work: {
      title: "Taller de matematicas",
      description:
        "Dar un taller para mostrarle a los jovenes la importancia de las matematicas",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-06-03", hour: "9:00 AM" }],
      tags: ["educacion", "matematicas"],
      dateInit: "2023-06-03",
      dateEnd: "2023-06-03",
    },
    user: {
      id: 2,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Taller de ingles",
      description:
        "Dar un taller para mostrarle a los jovenes la importancia de aprender ingles",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-07-02", hour: "9:00 AM" }],
      tags: ["educacion", "ingles"],
      dateInit: "2023-07-02",
      dateEnd: "2023-07-02",
    },
    user: {
      id: 2,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Taller de programacion ",
      description:
        "Dar un taller para mostrarle a los jovenes la importancia de la programacion",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-07-02", hour: "9:00 AM" }],
      tags: ["educacion", "programacion", "python"],
      dateInit: "2023-07-02",
      dateEnd: "2023-07-02",
    },
    user: {
      id: 2,
      rol: "proveedor",
    },
  },
  // recurrentes
  {
    work: {
      title: "Profesor de algoritmos",
      description: "Brinda apoyo en una universidad dando clases de algoritmos",
      type: "1",
      volunteerCountMax: "3",
      blocks: [{ day: "Martes", hour: "9:00 AM" }],
      tags: ["educacion", "algoritmos", "python"],
      dateInit: "2023-05-13",
      dateEnd: "2023-08-20",
    },
    user: {
      id: 2,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Profesor de sociales",
      description: "Brinda apoyo en una universidad dando clases de sociales",
      type: "1",
      volunteerCountMax: "3",
      blocks: [{ day: "Martes", hour: "9:00 AM" }],
      tags: ["educacion", "politica"],
      dateInit: "2023-05-11",
      dateEnd: "2023-08-20",
    },
    user: {
      id: 2,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Profesor de economia",
      description: "Brinda apoyo en una universidad dando clases de economia",
      type: "1",
      volunteerCountMax: "3",
      blocks: [{ day: "Jueves", hour: "9:00 AM" }],
      tags: ["educacion", "economia"],
      dateInit: "2023-05-13",
      dateEnd: "2023-08-20",
    },
    user: {
      id: 2,
      rol: "proveedor",
    },
  },
];

const postulations = [
  // userid 3
  {
    volunteer: { id: 3, rol: "voluntario" },
    work: 1,
    dateInit: "2023-06-12",
    dateEnd: "2023-06-12",
  },
  {
    volunteer: { id: 3, rol: "voluntario" },
    work: 4,
    dateInit: "2023-06-04",
    dateEnd: "2023-08-04",
  },
  //userid 4
  {
    volunteer: { id: 4, rol: "voluntario" },
    work: 1,
    dateInit: "2023-06-12",
    dateEnd: "2023-06-12",
  },
  {
    volunteer: { id: 4, rol: "voluntario" },
    work: 4,
    dateInit: "2023-06-04",
    dateEnd: "2023-08-04",
  },
  //userid 5
  {
    volunteer: { id: 5, rol: "voluntario" },
    work: 2,
    dateInit: "2023-06-13",
    dateEnd: "2023-06-13",
  },
  {
    volunteer: { id: 5, rol: "voluntario" },
    work: 5,
    dateInit: "2023-06-01",
    dateEnd: "2023-08-04",
  },
  //userid 6
  {
    volunteer: { id: 6, rol: "voluntario" },
    work: 2,
    dateInit: "2023-06-13",
    dateEnd: "2023-06-13",
  },
  {
    volunteer: { id: 6, rol: "voluntario" },
    work: 5,
    dateInit: "2023-06-01",
    dateEnd: "2023-08-04",
  },
  //userid 7
  {
    volunteer: { id: 7, rol: "voluntario" },
    work: 3,
    dateInit: "2023-06-13",
    dateEnd: "2023-06-13",
  },
  {
    volunteer: { id: 7, rol: "voluntario" },
    work: 6,
    dateInit: "2023-06-01",
    dateEnd: "2023-08-04",
  },
  //userid 8
  {
    volunteer: { id: 8, rol: "voluntario" },
    work: 3,
    dateInit: "2023-06-13",
    dateEnd: "2023-06-13",
  },
  {
    volunteer: { id: 8, rol: "voluntario" },
    work: 6,
    dateInit: "2023-06-01",
    dateEnd: "2023-08-04",
  },
  //userid 12
  {
    volunteer: { id: 12, rol: "voluntario" },
    work: 7,
    dateInit: "2023-06-03",
    dateEnd: "2023-06-03",
  },
  {
    volunteer: { id: 12, rol: "voluntario" },
    work: 10,
    dateInit: "2023-06-01",
    dateEnd: "2023-08-04",
  },
  //userid 13
  {
    volunteer: { id: 13, rol: "voluntario" },
    work: 7,
    dateInit: "2023-06-03",
    dateEnd: "2023-06-03",
  },
  {
    volunteer: { id: 13, rol: "voluntario" },
    work: 10,
    dateInit: "2023-06-01",
    dateEnd: "2023-08-04",
  },
  //userid 14
  {
    volunteer: { id: 14, rol: "voluntario" },
    work: 8,
    dateInit: "2023-07-02",
    dateEnd: "2023-07-02",
  },
  {
    volunteer: { id: 14, rol: "voluntario" },
    work: 11,
    dateInit: "2023-06-01",
    dateEnd: "2023-08-04",
  },
  //userid 15
  {
    volunteer: { id: 15, rol: "voluntario" },
    work: 8,
    dateInit: "2023-07-02",
    dateEnd: "2023-07-02",
  },
  {
    volunteer: { id: 15, rol: "voluntario" },
    work: 11,
    dateInit: "2023-06-01",
    dateEnd: "2023-08-04",
  },
  //userid 16
  {
    volunteer: { id: 16, rol: "voluntario" },
    work: 9,
    dateInit: "2023-07-02",
    dateEnd: "2023-07-02",
  },
  {
    volunteer: { id: 16, rol: "voluntario" },
    work: 12,
    dateInit: "2023-06-13",
    dateEnd: "2023-08-04",
  },
  //userid 17
  {
    volunteer: { id: 17, rol: "voluntario" },
    work: 9,
    dateInit: "2023-07-02",
    dateEnd: "2023-07-02",
  },
  {
    volunteer: { id: 17, rol: "voluntario" },
    work: 12,
    dateInit: "2023-06-13",
    dateEnd: "2023-08-04",
  },
];
module.exports = {
  users,
  works,
  postulations,
};
