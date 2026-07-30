use sdkwork_web_core::{HttpMethod, HttpRoute, HttpRouteManifest};

const HTTP_ROUTES: &[HttpRoute] = &[
    HttpRoute::dual_token(
        HttpMethod::Get,
        "/app/v3/api/xiangqi/matches",
        "xiangqi",
        "xiangqi.match.list",
    ),
    HttpRoute::dual_token(
        HttpMethod::Get,
        "/app/v3/api/xiangqi/matches/{matchId}",
        "xiangqi",
        "xiangqi.match.retrieve",
    ),
];

pub fn gateway_route_manifest() -> HttpRouteManifest {
    HttpRouteManifest::new(HTTP_ROUTES)
}
