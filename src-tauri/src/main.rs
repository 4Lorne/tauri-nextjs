// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod api_request;

//use api_request::make_api_request;
use tokio;

#[tokio::main]
async fn main() {
    // let api_url = "https://jsonplaceholder.typicode.com/posts/1"; // Replace with your API URL.

    // match make_api_request(api_url).await {
    //     Ok(response) => {
    //         println!("API Response: {}", response);
    //     }
    //     Err(err) => {
    //         eprintln!("Error: {}", err);
    //     }
    // }

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
