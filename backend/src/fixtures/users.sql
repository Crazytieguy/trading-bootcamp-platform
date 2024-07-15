INSERT INTO acquire_write_lock (id, lock)
VALUES (1, TRUE) ON CONFLICT DO NOTHING;
INSERT INTO user (id, balance)
VALUES ('a', '100.0'),
  ('b', '100.0'),
  ('c', '100.0');