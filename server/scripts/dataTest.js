// const 1 = 1;
// const 2 = 2;

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
    password: "5678",
    rol: "voluntario",
    fullName: "Juan Perez",
    birthDate: "2000-01-01",
    institutionalId: "5678",
  },
  {
    username: "juanga",
    password: "5678",
    rol: "voluntario",
    fullName: "Juan Gabriel Perez",
    birthDate: "2000-01-01",
    institutionalId: "5678",
  },
  {
    username: "juan02",
    password: "5678",
    rol: "voluntario",
    fullName: "Juan Guilarte",
    birthDate: "2000-01-01",
    institutionalId: "5678",
  },
  {
    username: "ana01",
    password: "abcd",
    rol: "voluntario",
    fullName: "Ana Sanchez",
    birthDate: "1995-07-15",
    institutionalId: "9876",
  },
  {
    username: "anar02",
    password: "abcd",
    rol: "voluntario",
    fullName: "Ana Rodriguez",
    birthDate: "1995-07-15",
    institutionalId: "9876",
  },
  {
    username: "maria01",
    password: "0000",
    rol: "voluntario",
    fullName: "Maria Rodriguez",
    birthDate: "1988-03-10",
    institutionalId: "1357",
  },
  {
    username: "maria02",
    password: "0000",
    rol: "voluntario",
    fullName: "Maria Perez",
    birthDate: "1988-03-10",
    institutionalId: "1357",
  },
  {
    username: "jose02",
    password: "1111",
    rol: "voluntario",
    fullName: "Jose Martinez",
    birthDate: "1992-09-20",
    institutionalId: "2468",
  },
  {
    username: "jose01",
    password: "1111",
    rol: "voluntario",
    fullName: "Jose Perez",
    birthDate: "1992-09-20",
    institutionalId: "2468",
  },
  {
    username: "jose03",
    password: "1111",
    rol: "voluntario",
    fullName: "Jose Manuel Guilarte",
    birthDate: "1992-09-20",
    institutionalId: "2468",
  },
];

works = [
  // dos por sesion
  {
    work: {
      title: "Apoyo en educacion",
      description: "Ayuda a aprender a estudiantes habilidades",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-07-12", hour: "9:00 AM" }],
      tags: ["educaion", "aprendizaje"],
      dateInit: "2023-07-12",
      dateEnd: "2023-07-12",
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
      blocks: [{ day: "2023-07-13", hour: "9:00 AM" }],
      tags: ["animales", "campo"],
      dateInit: "2023-07-13",
      dateEnd: "2023-07-13",
    },
    user: {
      id: 1,
      rol: "proveedor",
    },
  },
  // 3 recurrentes
  {
    work: {
      title: "Asistencia de hospitales",
      description: "Brinda apoyo en un hospital",
      type: "1",
      volunteerCountMax: "3",
      blocks: [{ day: "Lunes", hour: "9:00 AM" }, { day: "Sábado", hour: "3:00 PM" } ],
      tags: ["animales", "campo"],
      dateInit: "2023-06-01",
      dateEnd: "2023-08-01",
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
      tags: ["animales", "campo"],
      dateInit: "2023-06-13",
      dateEnd: "2023-08-13",
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
      blocks: [{ day: "Viernes", hour: "9:00 AM" }, { day: "Jueves", hour: "9:00 AM" }, { day: "Martes", hour: "10:00 AM" }],
      tags: ["animales", "campo"],
      dateInit: "2023-06-13",
      dateEnd: "2023-08-13",
    },
    user: {
      id: 1,
      rol: "proveedor",
    },
  },
  // dos por sesion otro proveedor
  {
    work: {
      title: "Profesor de matematicas",
      description:
        "Brinda apoyo en una universidad dando clases de matematicas",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-07-03", hour: "9:00 AM" }],
      tags: ["educaion", "aprendizaje"],
      dateInit: "2023-07-03",
      dateEnd: "2023-07-03",
    },
    user: {
      id: 2,
      rol: "proveedor",
    },
  },
  {
    work: {
      title: "Profesor de ingles",
      description: "Brinda apoyo en una universidad dando clases de ingles",
      type: "2",
      volunteerCountMax: "3",
      blocks: [{ day: "2023-07-02", hour: "9:00 AM" }],
      tags: ["animales", "campo"],
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
      tags: ["animales", "campo"],
      dateInit: "2023-06-13",
      dateEnd: "2023-08-13",
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
      tags: ["animales", "campo"],
      dateInit: "2023-06-20",
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
      tags: ["animales", "campo"],
      dateInit: "2023-05-13",
      dateEnd: "2023-08-20",
    },
    user: {
      id: 2,
      rol: "proveedor",
    },
  },
];

module.exports = {
  users,
  works,
};
