// DB client
const { client, pg, uuid } = require("./common");

// bcrypt for password hash
const bcrypt = require("bcrypt");

// create tables
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS User_Skills CASCADE;
    DROP TABLE IF EXISTS Users CASCADE;
    DROP TABLE IF EXISTS Skills CASCADE;

    CREATE TABLE Users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255)
    );

    CREATE TABLE Skills(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) UNIQUE NOT NULL
    );

    CREATE TABLE User_Skills(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid() ,
        skill_id UUID,
        user_id UUID,
        FOREIGN KEY (skill_id) REFERENCES Skills(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES Users(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        CONSTRAINT unique_skill_user UNIQUE (skill_id, user_id)
    );
    `;
  await client.query(SQL);
};

// create user
const createUser = async ({ username, password }) => {
  const SQL = `
        INSERT INTO Users( username, password ) VALUES ($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [
    username,
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0];
};

// create skill
const createSkill = async (name) => {
  const SQL = `
    INSERT INTO Skills(name) VALUES($1) RETURNING *;
`;
  const response = await client.query(SQL, [name]);
  return response.rows[0];
};

const createUserSkill = async ({skill_id, user_id}) => {
    console.log('******');
    console.log('SKILL', skill_id);
    console.log('USER', user_id);
    console.log('******');
    
  const SQL = `INSERT INTO User_Skills(skill_id, user_id) VALUES($1, $2) RETURNING *;`;
  const response = await client.query(SQL, [skill_id, user_id]);
  return response.rows[0];
};

// delete UserSkill
const deleteUserSkill = async ({id, user_id}) => {
    const SQL =   `DELETE FROM User_Skills WHERE id = $1 AND user_id = $2`;
    await client.query(SQL, [id, user_id]);
    // return response.rows[0];
}

// fetch users
const fetchUsers = async () => {
  const SQL = `SELECT * FROM Users`;
  const response = await client.query(SQL);
  return response.rows;
};
// fetch skills
const fetchSkills = async () => {
  const SQL = `SELECT * FROM Skills`;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchUserSkills = async () => {
    const SQL = `SELECT * FROM User_Skills`;
    const response = await client.query(SQL);
    return response.rows;
}

// export
module.exports = {
  createTables,
  createUser,
  createSkill,
  createUserSkill,
  deleteUserSkill,
  fetchUsers,
  fetchSkills,
  fetchUserSkills,
};
