use axum::Router;
use sdkwork_routes_health_app_api::build_health_router;
use sdkwork_api_xiangqi_assembly::{
    assemble_api_router_with_service, with_xiangqi_app_request_context,
};
pub use sdkwork_api_xiangqi_assembly::{
    build_match_service, build_memory_match_service, SharedMatchService,
};

pub fn build_router(store: SharedMatchService) -> Router {
    let business = assemble_api_router_with_service(store).router;
    build_router_from_business(business)
}

pub fn build_router_from_business(business: Router) -> Router {
    Router::new()
        .merge(with_xiangqi_app_request_context(build_health_router()))
        .merge(business)
        .layer(sdkwork_web_bootstrap::application_cors_layer_from_env(
            &["SDKWORK_XIANGQI_ENVIRONMENT"],
            &[
                "SDKWORK_XIANGQI_CORS_ALLOWED_ORIGINS",
                "SDKWORK_CORS_ALLOWED_ORIGINS",
            ],
        ))
}
