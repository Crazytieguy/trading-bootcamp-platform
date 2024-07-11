use std::io::Result;
fn main() -> Result<()> {
    prost_build::compile_protos(
        &[
            "../schema/server-message.proto",
            "../schema/client-message.proto",
        ],
        &["../schema"],
    )?;
    println!("cargo:rerun-if-changed=migrations");
    Ok(())
}
