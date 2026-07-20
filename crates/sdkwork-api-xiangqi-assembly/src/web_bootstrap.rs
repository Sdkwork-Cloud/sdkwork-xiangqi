use axum::Router;
use sdkwork_iam_web_adapter::{build_web_framework_layer, IamWebRequestContextResolver};
use sdkwork_web_axum::with_web_request_context;
use sdkwork_web_core::HttpRouteManifest;

use crate::route_manifest::{XIANGQI_APP_HTTP_ROUTES, XIANGQI_BACKEND_HTTP_ROUTES};

pub fn xiangqi_public_path_prefixes() -> Vec<String> {
    vec!["/healthz".to_owned(), "/readyz".to_owned()]
}

fn wrap_router_with_manifest(router: Router, route_manifest: HttpRouteManifest) -> Router {
    with_web_request_context(
        router,
        build_web_framework_layer(
            IamWebRequestContextResolver::new(None),
            route_manifest,
            xiangqi_public_path_prefixes(),
        ),
    )
}

pub fn with_xiangqi_app_request_context(router: Router) -> Router {
    wrap_router_with_manifest(router, HttpRouteManifest::new(XIANGQI_APP_HTTP_ROUTES))
}

pub fn with_xiangqi_backend_request_context(router: Router) -> Router {
    wrap_router_with_manifest(router, HttpRouteManifest::new(XIANGQI_BACKEND_HTTP_ROUTES))
}
