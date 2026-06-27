pub mod bootstrap;
mod web_bootstrap;

pub use bootstrap::{
    build_match_service, build_memory_match_service, build_router, SharedMatchService,
};
pub use route_manifest::{XIANGQI_APP_HTTP_ROUTES, XIANGQI_BACKEND_HTTP_ROUTES};
pub use web_bootstrap::{
    with_xiangqi_app_request_context, with_xiangqi_backend_request_context,
    xiangqi_public_path_prefixes,
};

pub mod route_manifest {
    include!(concat!(env!("OUT_DIR"), "/xiangqi_http_routes.rs"));
}
