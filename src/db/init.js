const Database = require('./config');

const initDb = {
  async init() {
    //Initial configuration on RUN project
    const db = await Database();

    await db.exec(`
    CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )
`);

    await db.exec(`
      CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
      )
`);

    await db.run(`
        INSERT INTO profile (
          name,
          avatar,
          monthly_budget,
          days_per_week,
          hours_per_day,
          vacation_per_year,
          value_hour
        ) VALUES (
          "Bruno",
          "https://avatars.githubusercontent.com/u/63132506?s=400&u=202131e917b552a4e8b94fa86c66ffaf8cd924ff&v=4",
          8000,
          6,
          5,
          4,
          75
        );
`);

    await db.run(`
          INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
          ) VALUES (
            "Provedor de Internet",
            2,
            1,
            1617800502926
          );
`);

    await db.run(`
          INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
          ) VALUES (
            "Hotel Fazenda",
            3,
            47,
            1617800502926
          );
`);

    await db.close();
  },
};

initDb.init();
