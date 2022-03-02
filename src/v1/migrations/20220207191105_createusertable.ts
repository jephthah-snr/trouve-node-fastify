import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('full_name').notNullable();
    table.string('email', 191).notNullable().unique();
    table.string('password').notNullable();
    table.string('email_notification').defaultTo(true);
    table.string('sms_notification').defaultTo(true);
    table.string('push_notification').defaultTo(true);
    table.boolean('is_phone_verified').defaultTo(false);
    table.boolean('is_banned').defaultTo(false).notNullable();
    table.string('phone', 191).nullable().unique();
    table.enum('user_type', ['DEVELOPER', 'USER']).notNullable();
    table.string('user_code', 191).notNullable().unique();
    table.timestamps(true, true);
    table.dateTime('deleted_at').defaultTo(null);
    table.dateTime('banned_at').defaultTo(null);
    table.integer('attempts').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
