//! Gateway assembly for sdkwork-xiangqi.
//! Application bootstrap lives in `bootstrap.rs`; route inventory is in `assembly-manifest.json`.
// SDKWORK-ASSEMBLY-LIB-CUSTOM: preserve application-specific IAM and service-host exports.

mod bootstrap;
mod generated;

pub use bootstrap::{
    assemble_api_router, assemble_api_router_with_pool, assemble_api_router_with_service,
    assemble_business_routes, ApiAssembly,
};
pub use sdkwork_xiangqi_service_host::{
    build_match_service, SharedMatchService, XiangqiServiceHost,
};

pub fn assembly_route_count() -> usize {
    generated::ROUTE_CRATE_COUNT
}
