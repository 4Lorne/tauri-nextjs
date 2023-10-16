use reqwest;

pub async fn make_api_request(api_url: &str) -> Result<String, reqwest::Error> {
    let response = reqwest::get(api_url).await?.text().await?;
    Ok(response)
}
