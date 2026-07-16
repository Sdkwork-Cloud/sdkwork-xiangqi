//! Gateway bootstrap for sdkwork-xiangqi.

use axum::Router;
use sdkwork_routes_match_app_api::build_match_app_router;
use sdkwork_routes_match_backend_api::build_match_backend_router;
use sdkwork_xiangqi_standalone_gateway::{
    build_match_service, with_xiangqi_app_request_context, with_xiangqi_backend_request_context,
};

pub struct ApplicationAssembly {
    pub router: Router,
}

pub async fn assemble_application_business_router() -> Result<ApplicationAssembly, String> {
    let service = build_match_service().await?;
    let app = with_xiangqi_app_request_context(build_match_app_router(service.clone()));
    let backend = with_xiangqi_backend_request_context(build_match_backend_router(service));
    Ok(ApplicationAssembly {
        router: Router::new().merge(app).merge(backend),
    })
}

pub async fn assemble_application_router() -> Result<ApplicationAssembly, String> {
    assemble_application_business_router().await
}
