//! Gateway assembly for sdkwork-xiangqi.
//! Application bootstrap lives in `bootstrap.rs`; route inventory is in `assembly-manifest.json`.
// SDKWORK-ASSEMBLY-LIB-CUSTOM: preserve application-specific IAM and service-host exports.

mod bootstrap;
mod generated;
mod web_bootstrap;

pub mod route_manifest {
    include!(concat!(env!("OUT_DIR"), "/xiangqi_http_routes.rs"));
}

pub use bootstrap::{
    assemble_api_router, assemble_api_router_with_service, assemble_business_routes, ApiAssembly,
};
pub use sdkwork_xiangqi_service_host::{
    build_match_service, build_memory_match_service, SharedMatchService,
};
pub use web_bootstrap::{
    with_xiangqi_app_request_context, with_xiangqi_backend_request_context,
    xiangqi_public_path_prefixes,
};

pub fn assembly_route_count() -> usize {
    generated::ROUTE_CRATE_COUNT
}
