pub mod bootstrap;

pub use bootstrap::{
    build_match_service, build_memory_match_service, build_router, build_router_from_business,
    SharedMatchService,
};
pub use sdkwork_api_xiangqi_assembly::route_manifest::{
    XIANGQI_APP_HTTP_ROUTES, XIANGQI_BACKEND_HTTP_ROUTES,
};
pub use sdkwork_api_xiangqi_assembly::{
    with_xiangqi_app_request_context, with_xiangqi_backend_request_context,
    xiangqi_public_path_prefixes,
};
