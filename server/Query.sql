-- select p.id as Postulation_id, p.works_id as postulation_workID, t.* from postulations p join (SELECT
--   id,
--   title,
--   "dateInit",
--   "dateEnd",
--   description,
--   block->>'day' AS day,
--   block->>'hour' AS hour
-- FROM
--   Works,
--   LATERAL (
--     SELECT jsonb_array_elements(blocks::jsonb) AS block
--   ) AS block_data) as t on p.works_id = t.id;
-- delete from postulations;
-- select
--   p.id,
--   p."dateInit",
--   p."dateEnd",
--   p.works_id,
--   g.*,
--   generate_series (p."dateInit", p."dateEnd", '1 day') as date
--   -- case
--   --   when exists (
--   --     select
--   --       *
--   --     from
--   --       trackings t
--   --     where
--   --       t.postulation_id = p.id
--   --   ) then TRUE
--   --   ELSE FALSE
--   -- END as asistencia
-- from
--   postulations p
--   join  (SELECT
--   id,
--   title,
--   -- block->>'day' AS day,
--   block->>'hour' AS hour
-- FROM
--   Works,
--   LATERAL (
--     SELECT jsonb_array_elements(blocks::jsonb) AS block
--   ) AS block_data) as g on p.works_id = g.id;
-- JOIN trackings a on p.id = a.id
-- select * from works;
-- select
--   *
-- from
--   tags;
-- SELECT
--   t.columna1,
--   t.columna2,
--   CASE
--     WHEN o.otra_columna = 'valor_deseado' THEN TRUE
--     ELSE FALSE
--   END AS resultado
-- FROM
--   tabla_actual t
--   JOIN otra_tabla o ON t.id = o.id;
-- select p.id, p."dateInit", p."dateEnd", p.works_id, w.title, w."dateInit", w."dateEnd", t.date from postulations p join (select p.id, generate_series (p."dateInit", p."dateEnd", '1 day') as date from postulations p ) as t on t.id = p.id  join works w on p.works_id = w.id
-- ;
select
  p.id,
  p."dateInit",
  p."dateEnd",
  t.*
  -- p.confirmed,
  -- w.title,
  -- c.username,
  -- u."fullName",
  -- w.blocks
from
  postulations p
  join works w on p.works_id = w.id
  join users u on u.id = p.users_id
  join credentials c on c.users_id = u.id
  left join trackings t on p.id = t.postulation_id;

-- select
--   *
-- from
--   credentials;
SELECT
  "postulation"."id",
  "postulation"."users_id",
  "postulation"."works_id",
  "postulation"."confirmed",
  "postulation"."dateInit",
  "postulation"."dateEnd",
  "postulation"."createdAt",
  "postulation"."updatedAt",
  "user"."id" AS "user.id",
  "user"."rol" AS "user.rol",
  "user"."fullName" AS "user.fullName",
  "user"."birthDate" AS "user.birthDate",
  "user"."institucionalId" AS "user.institucionalId",
  "user"."createdAt" AS "user.createdAt",
  "user"."updatedAt" AS "user.updatedAt",
  "user->credential"."id" AS "user.credential.id",
  "user->credential"."username" AS "user.credential.username",
  "user->credential"."password" AS "user.credential.password",
  "user->credential"."users_id" AS "user.credential.users_id",
  "user->credential"."createdAt" AS "user.credential.createdAt",
  "user->credential"."updatedAt" AS "user.credential.updatedAt",
  "work"."id" AS "work.id",
  "work"."users_id" AS "work.users_id",
  "work"."title" AS "work.title",
  "work"."status" AS "work.status",
  "work"."description" AS "work.description",
  "work"."type" AS "work.type",
  "work"."volunteerCount" AS "work.volunteerCount",
  "work"."volunteerCountMax" AS "work.volunteerCountMax",
  "work"."blocks" AS "work.blocks",
  "work"."dateInit" AS "work.dateInit",
  "work"."dateEnd" AS "work.dateEnd",
  "work"."createdAt" AS "work.createdAt",
  "work"."updatedAt" AS "work.updatedAt",
  "tracking"."id" AS "tracking.id",
  "tracking"."date" AS "tracking.date",
  "tracking"."hour" AS "tracking.hour",
  "tracking"."attendance" AS "tracking.attendance",
  "tracking"."postulation_id" AS "tracking.postulation_id",
  "tracking"."createdAt" AS "tracking.createdAt",
  "tracking"."updatedAt" AS "tracking.updatedAt"
FROM
  "postulations" AS "postulation"
  LEFT OUTER JOIN "users" AS "user" ON "postulation"."users_id" = "user"."id"
  LEFT OUTER JOIN "credentials" AS "user->credential" ON "user"."id" = "user->credential"."users_id"
  INNER JOIN "works" AS "work" ON "postulation"."works_id" = "work"."id"
  AND "work"."users_id" = 2
  LEFT OUTER JOIN "trackings" AS "tracking" ON "postulation"."id" = "tracking"."postulation_id";