use std::sync::Arc;

use sdkwork_database_sqlx::DatabasePool;
use sdkwork_xiangqi_database_host::{
    bootstrap_xiangqi_database, bootstrap_xiangqi_database_from_env, XiangqiDatabaseHost,
};
use sdkwork_xiangqi_match_repository_sqlx::{GameMatchRepositoryKind, SqlxGameMatchRepository};
use sdkwork_xiangqi_match_service::GameMatchService;

pub type SharedMatchService = Arc<GameMatchService<GameMatchRepositoryKind>>;

pub struct XiangqiServiceHost {
    service: SharedMatchService,
    database: XiangqiDatabaseHost,
}

impl XiangqiServiceHost {
    pub async fn from_env() -> Result<Self, String> {
        let database = bootstrap_xiangqi_database_from_env().await?;
        Ok(Self::from_database(database))
    }

    pub async fn from_pool(pool: DatabasePool) -> Result<Self, String> {
        let database = bootstrap_xiangqi_database(pool).await?;
        Ok(Self::from_database(database))
    }

    fn from_database(database: XiangqiDatabaseHost) -> Self {
        let repository = GameMatchRepositoryKind::Sqlx(Box::new(SqlxGameMatchRepository::new(
            database.pool().clone(),
        )));
        Self {
            service: Arc::new(GameMatchService::new(repository)),
            database,
        }
    }

    pub fn service(&self) -> SharedMatchService {
        self.service.clone()
    }

    pub fn database_pool(&self) -> &DatabasePool {
        self.database.pool()
    }
}

pub async fn build_match_service() -> Result<SharedMatchService, String> {
    let host = XiangqiServiceHost::from_env().await?;
    Ok(host.service())
}
