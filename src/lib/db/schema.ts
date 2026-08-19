import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Products & inventory
// ---------------------------------------------------------------------------

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  tagline: varchar("tagline", { length: 200 }).notNull().default(""),
  category: varchar("category", { length: 60 }).notNull().default("Nourishing"),
  description: text("description").notNull().default(""),
  ingredients: text("ingredients").notNull().default(""),
  notes: text("notes").array().notNull().default([]),
  // Primary display image (DigitalOcean Spaces URL once uploaded via the CMS).
  imageUrl: text("image_url").notNull().default(""),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// A product is sold in a few sizes, each with its own price and stock count.
export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  size: varchar("size", { length: 20 }).notNull(), // e.g. "100ml", "250ml", "500ml"
  // Stored in KSh cents (integer) to avoid floating point money bugs.
  priceCents: integer("price_cents").notNull(),
  stockQty: integer("stock_qty").notNull().default(0),
  sku: varchar("sku", { length: 60 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Orders (no customer accounts — every order is a guest order, optionally
// tagged with the channel it came from: the website checkout or WhatsApp)
// ---------------------------------------------------------------------------

export const orderChannelEnum = pgEnum("order_channel", ["web", "whatsapp"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending", // created, payment not yet confirmed
  "paid",
  "fulfilled",
  "cancelled",
]);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  channel: orderChannelEnum("channel").notNull().default("web"),
  status: orderStatusEnum("status").notNull().default("pending"),
  customerName: varchar("customer_name", { length: 160 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 32 }).notNull(),
  customerEmail: varchar("customer_email", { length: 160 }),
  shippingAddress: text("shipping_address"),
  totalCents: integer("total_cents").notNull(),
  // Paystack reference for reconciling the payment webhook to this order.
  paystackReference: varchar("paystack_reference", { length: 120 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productVariantId: integer("product_variant_id")
    .notNull()
    .references(() => productVariants.id),
  // Snapshot of name/size/price at time of purchase, so later edits to the
  // catalog never rewrite historical order data.
  productName: varchar("product_name", { length: 160 }).notNull(),
  size: varchar("size", { length: 20 }).notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
  quantity: integer("quantity").notNull(),
});

// ---------------------------------------------------------------------------
// Admin (single-role CMS login — no customer/user accounts)
// ---------------------------------------------------------------------------

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
}));

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  variant: one(productVariants, {
    fields: [orderItems.productVariantId],
    references: [productVariants.id],
  }),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
