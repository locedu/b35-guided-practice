// DB client
const { client, PORT } = require("./common");
// DB calls..
const {
  createTables,
  createUser,
  createSkill,
  createUserSkill,
  deleteUserSkill,
  fetchUsers,
  fetchSkills,
  fetchUserSkills
} = require("./db");

const express = require('express');
const app = express();

const init = async () => {
  // db connect
  await client.connect();
  console.log("connected to database..");

  // create DB tables..
  await createTables();
  console.log("create database tables..");

  const [moe, lucy, ethyl, singing, dancing, juggling, plateSpinning] =
    await Promise.all([
      createUser({ username: "moe", password: "1234" }),
      createUser({ username: "lucy", password: "1234" }),
      createUser({ username: "ethyl", password: "1234" }),
      createSkill({ name: "singing" }),
      createSkill({ name: "dancing" }),
      createSkill({ name: "juggling" }),
    ]);

  console.log("user", moe.id);
  console.log("skill", dancing.id);

  const users = await fetchUsers();
  console.log("users", users);
  const skills = await fetchSkills();
  console.log("skills", skills);

  const userSkills = await Promise.all([
    createUserSkill({ skill_id: dancing.id, user_id: moe.id }),
    createUserSkill({ skill_id: singing.id, user_id: lucy.id }),
  ]);
  console.log('USER_SKILLS CREATED');
  
  console.log("userSkills", userSkills);
  console.log('------------------------');
  
  console.log('USER_SKILL[0] DELETE ', userSkills[0]);
  
  await deleteUserSkill( userSkills[0] );
  console.log('USER_SKILLS DELETED');
  console.log("userSkills", await fetchUserSkills());

  app.listen(PORT, ()=>{
    console.log(`Express listening on port ${PORT}`);
    
  })
  
};

init();
