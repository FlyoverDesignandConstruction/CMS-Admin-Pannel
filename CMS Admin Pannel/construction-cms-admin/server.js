import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "construction_cms",
  waitForConnections: true,
  connectionLimit: 10
});

const resources = {
  banners: {
    table: "home_banners",
    fields: ["title", "subtitle", "button_text", "button_link", "image_url", "sort_order", "status"],
    orderBy: "sort_order ASC, id DESC"
  },
  "company-profile": {
    table: "company_profiles",
    fields: ["headline", "summary", "mission", "vision", "years_experience", "status"],
    orderBy: "id DESC"
  },
  services: {
    table: "services",
    fields: ["name", "summary", "icon_name", "sort_order", "status"],
    orderBy: "sort_order ASC, id DESC"
  },
  projects: {
    table: "projects",
    fields: ["name", "category", "location", "client_name", "completion_year", "image_url", "summary", "status"],
    orderBy: "completion_year DESC, id DESC"
  },
  testimonials: {
    table: "testimonials",
    fields: ["client_name", "client_role", "quote_text", "rating", "status"],
    orderBy: "id DESC"
  },
  posts: {
    table: "blog_posts",
    fields: ["title", "slug", "excerpt", "body", "published_at", "status"],
    orderBy: "published_at DESC, id DESC"
  },
  contacts: {
    table: "contact_information",
    fields: ["office_name", "address", "phone", "email", "map_url", "facebook_url", "linkedin_url", "status"],
    orderBy: "id DESC"
  },
  messages: {
    table: "contact_messages",
    fields: ["sender_name", "sender_email", "phone", "subject", "message", "status"],
    orderBy: "id DESC"
  }
};

function getResourceConfig(resource) {
  const config = resources[resource];
  if (!config) {
    const error = new Error("Unknown CMS resource.");
    error.status = 404;
    throw error;
  }
  return config;
}

function pickAllowedFields(body, allowedFields) {
  return allowedFields.reduce((picked, field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      picked[field] = body[field];
    }
    return picked;
  }, {});
}

function makeInsertSql(table, data) {
  const keys = Object.keys(data);
  const columns = keys.map((key) => `\`${key}\``).join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  return {
    sql: `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`,
    values: keys.map((key) => data[key])
  };
}

function makeUpdateSql(table, id, data) {
  const keys = Object.keys(data);
  const assignments = keys.map((key) => `\`${key}\` = ?`).join(", ");
  return {
    sql: `UPDATE \`${table}\` SET ${assignments} WHERE id = ?`,
    values: [...keys.map((key) => data[key]), id]
  };
}

app.get("/api/health", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, database: "connected" });
  } catch (error) {
    next(error);
  }
});

app.get("/api/dashboard", async (req, res, next) => {
  try {
    const entries = await Promise.all(
      Object.entries(resources).map(async ([name, config]) => {
        const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM \`${config.table}\``);
        return [name, rows[0].total];
      })
    );
    res.json(Object.fromEntries(entries));
  } catch (error) {
    next(error);
  }
});

app.get("/api/:resource", async (req, res, next) => {
  try {
    const config = getResourceConfig(req.params.resource);
    const [rows] = await pool.query(`SELECT * FROM \`${config.table}\` ORDER BY ${config.orderBy}`);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.get("/api/:resource/:id", async (req, res, next) => {
  try {
    const config = getResourceConfig(req.params.resource);
    const [rows] = await pool.query(`SELECT * FROM \`${config.table}\` WHERE id = ?`, [req.params.id]);
    if (!rows.length) {
      res.status(404).json({ message: "Record not found." });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.post("/api/:resource", async (req, res, next) => {
  try {
    const config = getResourceConfig(req.params.resource);
    const data = pickAllowedFields(req.body, config.fields);
    if (!Object.keys(data).length) {
      res.status(400).json({ message: "No valid fields were provided." });
      return;
    }
    const statement = makeInsertSql(config.table, data);
    const [result] = await pool.query(statement.sql, statement.values);
    const [rows] = await pool.query(`SELECT * FROM \`${config.table}\` WHERE id = ?`, [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.put("/api/:resource/:id", async (req, res, next) => {
  try {
    const config = getResourceConfig(req.params.resource);
    const data = pickAllowedFields(req.body, config.fields);
    if (!Object.keys(data).length) {
      res.status(400).json({ message: "No valid fields were provided." });
      return;
    }
    const statement = makeUpdateSql(config.table, req.params.id, data);
    await pool.query(statement.sql, statement.values);
    const [rows] = await pool.query(`SELECT * FROM \`${config.table}\` WHERE id = ?`, [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/:resource/:id", async (req, res, next) => {
  try {
    const config = getResourceConfig(req.params.resource);
    await pool.query(`DELETE FROM \`${config.table}\` WHERE id = ?`, [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.post("/api/contact", async (req, res, next) => {
  try {
    const data = pickAllowedFields(req.body, resources.messages.fields);
    data.status = data.status || "new";
    const statement = makeInsertSql(resources.messages.table, data);
    const [result] = await pool.query(statement.sql, statement.values);
    res.status(201).json({ id: result.insertId, message: "Contact message saved." });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message || "Server error.",
    detail: process.env.NODE_ENV === "production" ? undefined : error.sqlMessage
  });
});

app.listen(port, () => {
  console.log(`Construction CMS admin running at http://localhost:${port}`);
});
