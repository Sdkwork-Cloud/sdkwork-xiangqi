//! Gateway bootstrap for sdkwork-xiangqi.

use axum::Router;
use sdkwork_routes_match_app_api::build_match_app_router;
use sdkwork_routes_match_backend_api::build_match_backend_router;
use sdkwork_xiangqi_service_host::{build_match_service, SharedMatchService};

use crate::web_bootstrap::{
    with_xiangqi_app_request_context, with_xiangqi_backend_request_context,
};

pub struct ApplicationAssembly {
    pub router: Router,
}

pub async fn assemble_application_business_router() -> Result<ApplicationAssembly, String> {
    let service = build_match_service().await?;
    Ok(assemble_application_business_router_with_service(service))
}

pub fn assemble_application_business_router_with_service(
    service: SharedMatchService,
) -> ApplicationAssembly {
    let app = with_xiangqi_app_request_context(build_match_app_router(service.clone()));
    let backend = with_xiangqi_backend_request_context(build_match_backend_router(service));
    ApplicationAssembly {
        router: Router::new().merge(app).merge(backend),
    }
}

pub async fn assemble_application_router() -> Result<ApplicationAssembly, String> {
    assemble_application_business_router().await
}
