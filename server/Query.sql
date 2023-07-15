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
  left join trackings t on p.id = t.postulation_id ;

-- select
--   *
-- from
--   credentials;