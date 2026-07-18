use sdkwork_utils_rust::optional::default_if_blank;
use sdkwork_xiangqi_gateway_assembly::assemble_application_router;
use sdkwork_xiangqi_standalone_gateway::build_router_from_business;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("info")),
        )
        .init();

    let bind_address = default_if_blank(
        std::env::var("xiangqi_API_BIND")
            .ok()
            .or_else(|| std::env::var("sdkwork_xiangqi_APPLICATION_PUBLIC_INGRESS_BIND").ok())
            .as_deref(),
        "127.0.0.1:8098",
    );

    let assembly = assemble_application_router()
        .await
        .expect("XIANGQI gateway assembly failed");
    let app = build_router_from_business(assembly.router);
    let listener = tokio::net::TcpListener::bind(&bind_address)
        .await
        .expect("bind XIANGQI standalone-gateway listener failed");
    tracing::info!("sdkwork-xiangqi-standalone-gateway listening on {bind_address}");
    axum::serve(listener, app)
        .await
        .expect("serve XIANGQI standalone-gateway failed");
}
