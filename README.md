# B34 Guided Practice: ACME Talent Agency

## Requirements
- data layer for express server.
- data base schema:
-- USER (id, username, password)
-- USER_SKILL (id, skill_id, user_id)
-- SKILL (id, name)
- data layer exports:
-- client = postgres client
-- createTables
-- Bcrypt = hash middleware
-- createSkill
-- fetchUsers
-- fetchSkills
-- createUserSkill
-- deleteUserSkill
-- fetchUserSkill:id


