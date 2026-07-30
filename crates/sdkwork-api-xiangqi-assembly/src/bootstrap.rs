//! Gateway bootstrap for sdkwork-xiangqi.

use axum::Router;
use sdkwork_database_sqlx::DatabasePool;
use sdkwork_web_bootstrap::{
    ApiAssemblyContribution, HttpRouteManifest, PgPoolReadinessCheck, ReadinessCheck,
};
use sdkwork_xiangqi_service_host::{SharedMatchService, XiangqiServiceHost};
use std::sync::Arc;

pub type ApiAssembly = ApiAssemblyContribution;

pub async fn assemble_api_router() -> Result<ApiAssembly, String> {
    assemble_api_router_with_host(XiangqiServiceHost::from_env().await?).await
}

pub async fn assemble_api_router_with_pool(pool: DatabasePool) -> Result<ApiAssembly, String> {
    assemble_api_router_with_host(XiangqiServiceHost::from_pool(pool).await?).await
}

async fn assemble_api_router_with_host(host: XiangqiServiceHost) -> Result<ApiAssembly, String> {
    let readiness_pool = host
        .database_pool()
        .as_postgres()
        .ok_or_else(|| "xiangqi authoritative server requires a PostgreSQL pool".to_owned())?
        .clone();
    assemble_api_router_with_service(
        host.service(),
        Arc::new(PgPoolReadinessCheck::new(readiness_pool)),
    )
    .await
}

pub async fn assemble_api_router_with_service(
    service: SharedMatchService,
    readiness_check: Arc<dyn ReadinessCheck>,
) -> Result<ApiAssembly, String> {
    let router = Router::new()
        .merge(sdkwork_routes_xiangqi_app_api::gateway_mount(service.clone()).await)
        .merge(sdkwork_routes_xiangqi_backend_api::gateway_mount(service).await);
    let mut routes = Vec::new();
    routes.extend_from_slice(sdkwork_routes_xiangqi_app_api::gateway_route_manifest().routes());
    routes.extend_from_slice(sdkwork_routes_xiangqi_backend_api::gateway_route_manifest().routes());
    ApiAssemblyContribution::from_manifest(
        "sdkwork-xiangqi",
        "SDKWork Xiangqi API",
        router,
        HttpRouteManifest::from_owned_routes(routes),
        Vec::new(),
        readiness_check,
    )
}

pub async fn assemble_business_routes() -> Result<ApiAssembly, String> {
    assemble_api_router().await
}
