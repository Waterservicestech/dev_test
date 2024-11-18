import { AppDataSource } from '../../data-source'

export async function resetDatabase(): Promise<void> {
  try {
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0;')

    const entities = AppDataSource.entityMetadatas

    // Limpar cada tabela do banco de dados
    for (const entity of entities) {
      const tableName = entity.tableName
      await AppDataSource.query(`TRUNCATE TABLE \`${tableName}\`;`)
    }

    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1;')

    console.log('[TEST DATABASE]: Reset complete')
  } catch (error) {
    console.error('[TEST DATABASE ERROR]:', error)
    throw new Error(`ERROR: Cleaning test database: ${error}`)
  }
}
